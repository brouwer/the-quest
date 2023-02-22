<template>
  <header
    class="flex h-20 items-center justify-center bg-primary-700 text-white"
  >
    <!--language button-->
    <div class="flex items-center">
      <i
        class="mt-1 block h-4 w-4 rounded-full border-2 border-white"
        :class="teamClass"
      ></i>
      <span class="ml-4 text-xl font-black"
        >{{ team?.color && $t(team?.color) }} {{ team?.number }}</span
      >
    </div>
    <!--points-->
  </header>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useTeamStore } from "@/stores/team"

const store = useTeamStore()
const { team } = storeToRefs(store)

const teamClass = computed(() => {
  /* use this to get the team color */
  /* string interpolation on classes is not working due to tailwind */
  switch (team?.value?.color) {
    case "red":
      return "bg-team-red"
    case "blue":
      return "bg-team-blue"
    default:
      return "bg-white"
  }
})
</script>
