<template>
  <div class="relative overflow-x-auto">
    <div v-if="false" class="flex flex-row justify-end">
      <QuestButton @click="resetPoints" class="mb-5 !w-40 !text-sm normal-case"
        >Reset Points</QuestButton
      >
    </div>
    <table class="w-full text-left text-sm">
      <thead class="bg-primary-500 text-xs uppercase text-white">
        <tr>
          <th scope="col" class="px-6 py-3">Group / Team</th>
          <th scope="col" class="px-6 py-3">Seconds offset</th>
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
            {{ team.color }} {{ team.number }}
          </th>
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
import { collection, doc, deleteField, updateDoc } from "firebase/firestore"
import QuestButton from "@/components/QuestButton.vue"

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

const resetPoints = async () => {
  teams.value.forEach(async (team) => {
    const docRef = doc(db, "teams", `${team.id}`)
    await updateDoc(docRef, {
      points: 0,
      penalty: 0,
      post_1_points: deleteField(),
      post_2_points: deleteField(),
      post_3_points: deleteField(),
      post_4_points: deleteField(),
      post_5_points: deleteField(),
      post_6_points: deleteField(),
      post_7_points: deleteField(),
      post_8_points: deleteField(),
      post_9_points: deleteField(),
      post_10_points: deleteField(),
    })
  })
}
</script>
