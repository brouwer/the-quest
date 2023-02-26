<template>
  <div class="h-full">
    <div class="mb-10 text-2xl font-black">
      Team: {{ team?.color }} {{ team?.number }} <br />
      Game Start: {{ game?.start.toDate() }} <br />
      Game Start Real: {{ gameRealStart && new Date(gameRealStart) }} <br />
      Team Start Offset: {{ team?.before_offset }} <br />
      Game Minutes Between: {{ game?.between_minutes }} <br />
      Game Minutes: {{ game?.game_minutes }} <br />
      Number of Games: {{ game?.amount }} <br />
      <br />
      Current Time: {{ currentTime }} <br />
      Elapsed Minutes Since Start: {{ elapsed }} <br />
      Elapsed Current Cycle: {{ elapsedCurrentCycle }} <br />
      Cycle Time: {{ cycleTime }} <br />
      Current Game: {{ currentGame }} <br />
      Game Status: {{ GameStatus[gameStatus] }}
      <br />
    </div>
    <QuestButton @click="logout">
      <template #default> {{ $t("logout") }} </template>
    </QuestButton>
    <div class="h-20"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useFirebaseAuth } from "vuefire"
import { storeToRefs } from "pinia"

import QuestButton from "@/components/QuestButton.vue"
import { useTeamStore } from "@/stores/team"
import { GameStatus, useGameStore } from "@/stores/game"

const router = useRouter()
const auth = useFirebaseAuth()
const gameStore = useGameStore()
const teamStore = useTeamStore()

const { team } = storeToRefs(teamStore)
const {
  gameRealStart,
  currentTime,
  game,
  currentGame,
  gameStatus,
  cycleTime,
  elapsed,
  elapsedCurrentCycle,
} = storeToRefs(gameStore)

const logout = () => {
  auth?.signOut().then(() => {
    router.push("/login")
  })
}
</script>
