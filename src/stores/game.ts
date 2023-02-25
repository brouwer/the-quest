import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { useDocument, useFirestore, useCurrentUser } from "vuefire"
import { doc } from "firebase/firestore"

export const useGameStore = defineStore("game", () => {
  const user = useCurrentUser()
  const db = useFirestore()

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

  const elapsedMs = computed(() => {
    if (game.value) {
      const flatCurrent = Math.ceil(currentTime.value.getTime() / 1000)
      return Math.floor(
        flatCurrent * 1000 - game.value?.start.toDate().getTime(),
      )
    }
    return 0
  })

  const elapsed = computed(() => {
    return Math.floor(elapsedMs.value / 60000)
  })

  const cycleTime = computed(
    () => (game.value?.between_minutes ?? 0) + (game.value?.game_minutes ?? 0),
  )

  const cycleTimeMs = computed(() => cycleTime.value * 60000)

  const currentGame = computed(() => {
    return Math.floor((elapsed.value ?? 1) / (cycleTime.value ?? 1)) + 1
  })

  const elapsedCurrentGame = computed(() => {
    return Math.floor(
      (elapsedMs.value - (currentGame.value - 1) * cycleTimeMs.value) / 1000 -
        (game.value?.between_minutes ?? 0) * 60,
    )
  })

  const gameStatus = computed(() => {
    if (!game.value || (currentGame?.value ?? 0) > game.value.amount)
      return GameStatus.Over
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
    currentTime,
    game,
    elapsed,
    cycleTime,
    currentGame,
    gameStatus,
    elapsedCurrentGame,
  }
})

export enum GameStatus {
  PleaseWait,
  GotoStart,
  Game,
  Between,
  Over,
}
