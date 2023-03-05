<template>
  <div class="mb-5 flex h-full w-full flex-col items-center justify-start">
    <h1 class="text-xl font-black">{{ $t("scores") }}</h1>
    <div
      v-for="(n, index) in game?.amount"
      :key="index"
      class="mb-1 flex w-full flex-row justify-between px-3"
    >
      <span class="font-bold">
        {{ $t("post") }}
        {{ n }}
      </span>
      <span>
        {{ team?.[`post_${n}_points`] ?? 0 }}
        {{ $t("points") }}
      </span>
    </div>
    <div class="mt-3 flex w-full flex-row justify-between px-3">
      <span class="font-bold">
        {{ $t("penalty_points") }}
      </span>
      <span> {{ team?.penalty ?? 0 }} {{ $t("points") }} </span>
    </div>
    <div class="flex w-full flex-row justify-between px-3">
      <span class="font-bold">
        {{ $t("bonus") }}
      </span>
      <span>
        {{ team?.bonus_points ?? 0 }}
        {{ $t("points") }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useGameStore } from "@/stores/game"
import { useTeamStore } from "@/stores/team"

const gameStore = useGameStore()
const teamStore = useTeamStore()

const { game } = storeToRefs(gameStore)
const { team } = storeToRefs(teamStore)
</script>
