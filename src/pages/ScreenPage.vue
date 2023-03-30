<template>
  <AutoScroll>
    <div
      class="relative flex w-full grow flex-col items-center justify-center py-20"
    >
      <ol class="w-full max-w-6xl list-decimal text-3xl">
        <li :key="team.id" v-for="team in teams" class="my-8">
          <div
            class="float-left mr-4 h-10 w-10 rounded-full border-2 border-white"
            :class="teamClass(team.color)"
          ></div>
          {{ team.color }} {{ team.number }}
          <div class="float-right">{{ team.points }} points</div>
        </li>
      </ol>
    </div>
  </AutoScroll>
</template>

<script setup lang="ts">
import { useFirestore, useCollection } from "vuefire"
import { collection, query, orderBy } from "@firebase/firestore"
import AutoScroll from "@/components/AutoScroll.vue"

const db = useFirestore()

const teamsRef = collection(db, "teams")
const teamsQuery = query(teamsRef, orderBy("points", "desc"))

const teams = useCollection(teamsQuery)

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
