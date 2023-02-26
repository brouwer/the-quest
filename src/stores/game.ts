import { computed, ref } from "vue"
import { defineStore, storeToRefs } from "pinia"
import { useDocument, useFirestore, useCurrentUser } from "vuefire"
import { doc } from "firebase/firestore"
import { useTeamStore } from "@/stores/team"

export const useGameStore = defineStore("game", () => {
  const user = useCurrentUser()
  const db = useFirestore()
  const teamStore = useTeamStore()

  const { team } = storeToRefs(teamStore)

  const docRef = computed(() => {
    if (user.value) return doc(db, "config", "game")
    return null
  })
  const { data: game } = useDocument(docRef, {
    reset: true,
  })

  const currentTime = ref(new Date())

  setInterval(() => {
    currentTime.value = new Date()
  }, 1000)

  const gameRealStart = computed(() => {
    if (!game.value?.start || !game.value?.before_minutes) return null
    return (
      game.value?.start?.toDate().getTime() +
      game.value?.before_minutes * 60000 -
      game.value?.between_minutes * 60000
    )
  })

  const elapsedMs = computed(() => {
    if (game.value) {
      const flatCurrent = Math.ceil(currentTime.value.getTime() / 1000)
      return Math.floor(flatCurrent * 1000 - (gameRealStart.value ?? 0))
    }
    return 1
  })

  const elapsed = computed(() => {
    return Math.floor(elapsedMs.value / 60000)
  })

  const cycleTime = computed(
    () => (game.value?.between_minutes ?? 1) + (game.value?.game_minutes ?? 1),
  )

  const cycleTimeMs = computed(() => cycleTime.value * 60000)

  const currentGame = computed(() => {
    return Math.floor((elapsed.value ?? 1) / (cycleTime.value ?? 1)) + 1
  })

  const elapsedCurrentCycle = computed(() => {
    // always returns a positive countdown (Abs)
    // if we have a negative elapsed, it means the game hasn't started yet, and the cycle time is the time until the game starts
    if (elapsedMs.value < 0)
      return Math.abs(
        Math.floor(
          (elapsedMs.value - (game.value?.between_minutes * 60000 ?? 0)) / 1000,
        ),
      )

    const currentCycle = Math.floor(
      (elapsedMs.value - (currentGame.value - 1) * cycleTimeMs.value) / 1000 -
        (game.value?.between_minutes ?? 0) * 60,
    )

    // if we're in the between time, the current cycle is negative, so we need to return the absolute value of the current cycle
    if (currentCycle < 0) return Math.abs(currentCycle)

    // if we're in the game time, we need to return the time left in the game
    return (game.value?.game_minutes ?? 1) * 60 - currentCycle
  })

  const gameStatus = computed(() => {
    if ((currentGame?.value ?? 0) > game.value?.amount) return GameStatus.Over
    if (
      !game.value ||
      game.value?.start?.toDate().getTime() +
        ((team.value?.before_offset ?? 0) * 60000 ?? 0) >
        currentTime.value.getTime()
    )
      return GameStatus.PleaseWait
    if (elapsed.value < game.value?.between_minutes) return GameStatus.GotoStart
    const timeInCycle =
      elapsed.value - (currentGame.value - 1) * cycleTime.value
    if (timeInCycle < game.value?.between_minutes) {
      return GameStatus.Between
    } else {
      const gameEndTime =
        (currentGame.value - 1) * cycleTime.value +
        game.value?.between_minutes +
        game.value?.game_minutes
      if (elapsed.value < gameEndTime) {
        return GameStatus.Game
      } else if (currentGame.value < game.value?.amount) {
        return GameStatus.Between
      } else {
        return GameStatus.Game
      }
    }
  })

  return {
    gameRealStart,
    currentTime,
    game,
    elapsed,
    cycleTime,
    currentGame,
    gameStatus,
    elapsedCurrentCycle,
  }
})

export enum GameStatus {
  PleaseWait,
  GotoStart,
  Game,
  Between,
  Over,
}
