<template>
  <TimerView />
  <div class="relative flex w-full grow">
    <div
      v-if="gameStatus != GameStatus.Over"
      class="flex grow flex-col items-center justify-center p-3 pb-16 text-center"
    >
      <h1 class="my-5 text-3xl font-black">Post: {{ $t(`post_${id}`) }}</h1>
      <h1 class="my-5 text-3xl font-black">Runde: {{ currentGameNormal }}</h1>
      <h2 class="mb-3 text-4xl font-black">
        Forventet lagfarge <br /><br />
        {{ nextTeamColor }}
      </h2>
      <div
        class="h-24 w-24 rounded-full border-2 border-white"
        :class="teamClass"
      ></div>
    </div>
    <div
      v-if="gameStatus == GameStatus.Over"
      class="flex grow flex-col items-center justify-center p-3 pb-16"
    >
      <h1 class="text-3xl font-black">Spill Ferdig!</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { GameStatus, useGameStore } from "@/stores/game"
import TimerView from "@/views/TimerView.vue"

interface Order {
  [key: string]: string[]
}

const order: Order = {
  "1": [
    "red",
    "brown",
    "white",
    "dark-blue",
    "light-blue",
    "purple",
    "green",
    "grey",
    "pink",
    "black",
  ],
  "2": [
    "white",
    "dark-blue",
    "light-blue",
    "purple",
    "green",
    "grey",
    "pink",
    "black",
    "red",
    "brown",
  ],
}

const { id } = useRoute().params
const gameStore = useGameStore()
const { currentGame, gameStatus } = storeToRefs(gameStore)

const currentGameNormal = computed(() => {
  if (currentGame.value == 0) {
    return 1
  } else {
    return currentGame.value ?? 1
  }
})

const nextTeamColor = computed(() => {
  if (currentGameNormal.value) {
    const post = id as string
    return order[post][currentGameNormal.value - 1]
  }
  return ""
})

const teamClass = computed(() => {
  /* use this to get the team color */
  /* string interpolation on classes is not working due to tailwind */
  switch (nextTeamColor?.value) {
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
})
</script>
