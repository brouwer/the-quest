<template>
  <div class="relative h-10 w-full bg-black" :hidden="!timerVisible">
    <div
      class="h-full transition-time duration-1000 ease-linear"
      :style="{ width: `${timerWidth}%`, backgroundColor: timerColor }"
    ></div>
    <span class="absolute left-5 top-1 h-8 text-xl font-black text-white">
      {{ timerStatusText }}
    </span>
    <span class="absolute right-5 top-1 h-8 text-xl font-black text-white">
      {{ timerText }}
    </span>
  </div>
  <div class="h-10" :hidden="timerVisible"><!--placeholder for timer--></div>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { storeToRefs } from "pinia"
import { useTeamStore } from "@/stores/team"
import { GameStatus, useGameStore } from "@/stores/game"

const { t } = useI18n()
const gameStore = useGameStore()
const teamStore = useTeamStore()

const { team } = storeToRefs(teamStore)
const { game, gameStatus, elapsedCurrentCycle } = storeToRefs(gameStore)

const timerVisible = computed(() => {
  return (
    gameStatus.value != GameStatus.Over &&
    gameStatus.value != GameStatus.PleaseWait
  )
})

const timerWidth = computed(() => {
  let full =
    ((game.value?.before_minutes ?? 2) - (team.value?.before_offset ?? 1)) * 60
  switch (gameStatus.value) {
    case GameStatus.Between:
      full = (game.value?.between_minutes ?? 1) * 60
      break
    case GameStatus.Game:
      full = (game.value?.game_minutes ?? 1) * 60
      break
  }

  const elapsed = elapsedCurrentCycle.value ?? 0
  const percent = elapsed / full
  return Math.round(percent * 1000) / 10
})

const timerText = computed(() => {
  const elapsed = elapsedCurrentCycle.value ?? 0
  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
})

const timerStatusText = computed(() => {
  switch (gameStatus.value) {
    case GameStatus.GotoStart:
      return t("gotoStart")
    case GameStatus.Between:
      return t("timeBetween")
    case GameStatus.Game:
      return t("timeLeft")
    default:
      return ""
  }
})

const timerColor = computed(() => {
  const colors = [
    "#b91c1c",
    "#af3601",
    "#a24800",
    "#935500",
    "#836100",
    "#726a00",
    "#607100",
    "#4d770a",
    "#377c26",
    "#15803d",
  ]
  const index = Math.floor(timerWidth.value / 10)
  return colors[index]
})
</script>
