<template>
  <TimerView />
  <div class="relative flex w-full grow">
    <div class="flex grow flex-col items-center justify-center p-3 pb-16">
      <h1 class="text-3xl font-black">Round: {{ currentGame }}</h1>
      <h2 class="text-4xl font-black">Next Team Color: TODO</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useGameStore } from "@/stores/game"
import TimerView from "@/views/TimerView.vue"

const gameStore = useGameStore()

const { game, currentGame, gameStatus, elapsedCurrentCycle } =
  storeToRefs(gameStore)
</script>
