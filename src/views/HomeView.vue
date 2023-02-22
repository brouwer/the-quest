<template>
  <div class="text-2xl font-black">
    Team: {{ team?.color }} {{ team?.number }}
  </div>
  <QuestButton @click="logout">
    <template #default> {{ $t("logout") }} </template>
  </QuestButton>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useFirebaseAuth } from "vuefire"
import { storeToRefs } from "pinia"

import QuestButton from "@/components/QuestButton.vue"
import { useTeamStore } from "@/stores/team"

const router = useRouter()
const auth = useFirebaseAuth()
const store = useTeamStore()
const { team } = storeToRefs(store)

const logout = () => {
  auth?.signOut().then(() => {
    router.push("/login")
  })
}
</script>
