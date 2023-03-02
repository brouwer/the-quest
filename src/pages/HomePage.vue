<template>
  <div class="relative h-full w-full">
    <div
      class="flex h-full flex-col justify-center p-3 pb-16 text-2xl font-black"
    >
      <GameInactiveView v-if="gameStatus == GameStatus.Inactive" />
      <WaitView v-if="gameStatus == GameStatus.PleaseWait" />
      <NextPostView
        v-if="
          gameStatus == GameStatus.GotoStart || gameStatus == GameStatus.Between
        "
      />
      <ScanCodeView v-if="gameStatus == GameStatus.Game" />
      <GameOverView v-if="gameStatus == GameStatus.Over" />
      <DebugView v-if="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { GameStatus, useGameStore } from "@/stores/game"
import DebugView from "@/views/DebugView.vue"
import GameInactiveView from "@/views/GameInactiveView.vue"
import WaitView from "@/views/WaitView.vue"
import GameOverView from "@/views/GameOverView.vue"
import ScanCodeView from "@/views/ScanCodeView.vue"
import NextPostView from "@/views/NextPostView.vue"

const gameStore = useGameStore()
const { gameStatus } = storeToRefs(gameStore)
</script>
