import { onRequest } from "firebase-functions/v2/https"
import * as admin from "firebase-admin"
import * as express from "express"

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

// Expose Express API as a single Cloud Function:
exports.api = onRequest(
  { timeoutSeconds: 60, region: ["europe-north1"], cors: true },
  app,
)
