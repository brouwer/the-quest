import { onRequest } from "firebase-functions/v2/https"
import * as admin from "firebase-admin"
import * as express from "express"
import { gameSetup, GameStatus } from "./utils"

admin.initializeApp()
const db = admin.firestore()

const app = express()
app.use(express.json())

app.post("/authenticate", async (req, res) => {
  const { code } = req.body
  if (!code) {
    res.status(400).send({ error: "code parameter is required" })
    return
  }

  try {
    const teamDoc = await db.collection("teams").where("code", "==", code).get()

    if (teamDoc.empty) {
      res.status(404).send({ error: "Team not found" })
      return
    }

    const team = teamDoc.docs[0].data()
    const token = await admin.auth().createCustomToken(teamDoc.docs[0].id)
    res.status(200).send({ token: token, team: team.number, color: team.color })
    return
  } catch (_) {
    res.status(500).send({ error: "Internal server error" })
    return
  }
})

app.post("/unlock", async (req, res) => {
  // get the current time before doing anything
  const now = new Date()

  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    res.status(401).send({ error: "Unauthorized" })
    return
  }

  const { code, post }: { code: number; post: number } = req.body

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    const gameConfigData = (
      await db.collection("config").doc("game").get()
    ).data()
    const gameStart = gameConfigData?.start?.toDate()
    const gameOngoing = gameConfigData?.ongoing as boolean
    const gameMinBefore = gameConfigData?.before_minutes as number
    const gameMinGame = gameConfigData?.game_minutes as number
    const gameMinBetween = gameConfigData?.between_minutes as number
    const gameTotal = gameConfigData?.amount as number
    const teamData = (
      await db.collection("teams").doc(decodedToken.uid).get()
    ).data()
    const teamSecBefore = (teamData?.before_offset ?? 0) as number
    let penalty = (teamData?.penalty ?? 0) as number
    const points = (teamData?.points ?? 0) as number
    const codeData = (
      await db.collection("codes").doc(post.toString()).get()
    ).data()

    const gameSetupData = gameSetup(
      gameOngoing,
      gameStart,
      now,
      gameMinBefore,
      teamSecBefore,
      gameMinBetween,
      gameMinGame,
      gameTotal,
      post,
    )

    if (!gameSetupData.isSubmittable) {
      res.status(401).send({ error: "Not submittable" })
      return
    }

    if (codeData?.code !== code) {
      penalty += 100
      await db.collection("teams").doc(decodedToken.uid).update({
        penalty,
      })
      // todo award penalty points
      res.status(403).send({ error: "Wrong code" })
      return
    }

    if (teamData?.[`post_${post}_points`]) {
      res.status(200).send({
        pointsAwarded: teamData?.[`post_${post}_points`],
      })
      return
    }

    let pointsAwarded = Math.floor(gameSetupData.msElapsedCurrentCycle / 100)
    if (gameSetupData.gameStatus == GameStatus.Between || pointsAwarded < 100) {
      // submittable but a bit late, so fix to 100 points
      pointsAwarded = 100
    }
    pointsAwarded -= penalty
    await db
      .collection("teams")
      .doc(decodedToken.uid)
      .update({
        penalty: 0,
        points: points + pointsAwarded,
        [`post_${post}_points`]: pointsAwarded,
      })

    res.status(200).send({
      pointsAwarded,
    })
    return
  } catch (_) {
    // we just assume that the token is invalid
    console.log(_)
    res.status(401).send({ error: "Unauthorized" })
    return
  }
})

// Expose Express API as a single Cloud Function:
exports.api = onRequest(
  { timeoutSeconds: 60, region: ["europe-north1"], cors: true },
  app,
)
