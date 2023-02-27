<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead class="bg-primary-500 text-xs uppercase text-white">
        <tr>
          <th scope="col" class="px-6 py-3">Group</th>
          <th scope="col" class="px-6 py-3">Team</th>
          <th scope="col" class="px-6 py-3">Minutes offset</th>
          <th scope="col" class="px-6 py-3">Code</th>
          <th scope="col" class="px-6 py-3">Points</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teamsSorted"
          :key="team.id"
          class="border-b bg-white"
        >
          <th scope="row" class="whitespace-nowrap px-6 py-4">
            {{ team.color }}
          </th>
          <td class="px-6 py-4">{{ team.number }}</td>
          <td class="px-6 py-4">{{ team.before_offset }}</td>
          <td class="px-6 py-4">{{ team.code }}</td>
          <td class="px-6 py-4">{{ team.points }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useCollection, useFirestore } from "vuefire"
import { collection } from "firebase/firestore"

const db = useFirestore()

const teams = useCollection(collection(db, "teams"))

const teamsSorted = computed(() => {
  return [...teams.value].sort((a, b) => {
    if (a.color < b.color) return -1
    if (a.color > b.color) return 1
    if (a.number < b.number) return -1
    if (a.number > b.number) return 1
    return 0
  })
})
</script>
