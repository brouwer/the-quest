<template>
  <header
    class="flex h-20 items-center justify-center bg-primary-700 px-3 text-white"
  >
    <LocaleChanger :button="true" />
    <div class="grow"></div>
    <div class="flex items-center">
      <i
        class="block h-5 w-5 rounded-full border-2 border-white"
        :class="teamClass"
      ></i>
      <span class="ml-2 font-black"
        >{{ team?.color && $t(team?.color) }} {{ team?.number }}</span
      >
    </div>
    <div class="grow"></div>
    <div class="flex flex-col text-right">
      <strong>{{ team?.points }}</strong>
      <span>{{ team?.points && $t("points") }}</span>
    </div>
    <!--points-->
  </header>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useTeamStore } from "@/stores/team"

import LocaleChanger from "@/components/LocaleChanger.vue"

const store = useTeamStore()
const { team } = storeToRefs(store)

const teamClass = computed(() => {
  /* use this to get the team color */
  /* string interpolation on classes is not working due to tailwind */
  switch (team?.value?.color) {
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
