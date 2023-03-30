<template>
  <div
    class="relative flex w-full grow flex-col items-center justify-center py-20"
  >
    <template v-if="currentTeamToLeave">
      <h1 class="mb-5 text-5xl font-black">
        Teams with this color can leave the hall
      </h1>
      <div
        class="m-24 aspect-square w-2/5 rounded-full border-2 border-white"
        :class="teamClass(currentTeamToLeave)"
      ></div>
      <h1 class="mb-5 text-5xl font-black">{{ currentTeamToLeave }}</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useGameStore } from "@/stores/game"

const gameStore = useGameStore()
const { currentGame, elapsedCurrentCycle } = storeToRefs(gameStore)

const currentTeamToLeave = computed(() => {
  if (currentGame.value < 2) {
    if (elapsedCurrentCycle.value <= 900 && elapsedCurrentCycle.value > 870) {
      return "red"
    } else if (
      elapsedCurrentCycle.value <= 870 &&
      elapsedCurrentCycle.value > 840
    ) {
      return "green"
    } else if (
      elapsedCurrentCycle.value <= 840 &&
      elapsedCurrentCycle.value > 810
    ) {
      return "grey"
    } else if (
      elapsedCurrentCycle.value <= 810 &&
      elapsedCurrentCycle.value > 780
    ) {
      return "purple"
    } else if (
      elapsedCurrentCycle.value <= 780 &&
      elapsedCurrentCycle.value > 750
    ) {
      return "pink"
    } else if (
      elapsedCurrentCycle.value <= 750 &&
      elapsedCurrentCycle.value > 720
    ) {
      return "light-blue"
    } else if (
      elapsedCurrentCycle.value <= 720 &&
      elapsedCurrentCycle.value > 690
    ) {
      return "white"
    } else if (
      elapsedCurrentCycle.value <= 690 &&
      elapsedCurrentCycle.value > 660
    ) {
      return "black"
    } else if (
      elapsedCurrentCycle.value <= 660 &&
      elapsedCurrentCycle.value > 630
    ) {
      return "dark-blue"
    } else if (
      elapsedCurrentCycle.value <= 630 &&
      elapsedCurrentCycle.value > 600
    ) {
      return "brown"
    }
  }
  return null
})

const teamClass = (color: String) => {
  /* use this to get the team color */
  /* string interpolation on classes is not working due to tailwind */
  switch (color) {
    case "red":
      return "bg-team-red"
    case "white":
      return "bg-team-white"
    case "black":
      return "bg-team-black"
    case "brown":
      return "bg-team-brown"
    case "purple":
      return "bg-team-purple"
    case "pink":
      return "bg-team-pink"
    case "dark-blue":
      return "bg-team-dark-blue"
    case "light-blue":
      return "bg-team-light-blue"
    case "green":
      return "bg-team-green"
    case "grey":
      return "bg-team-grey"
    default:
      return ""
  }
}
</script>
