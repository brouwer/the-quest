<template>
  <div class="text-2xl font-black">
    Team: {{ team?.data.color }} {{ team?.data.number }}
  </div>
  <QuestButton @click="logout">
    <template #default> {{ $t("logout") }} </template>
  </QuestButton>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import {
  useFirebaseAuth,
  useDocument,
  useFirestore,
  getCurrentUser,
} from "vuefire"
import { doc } from "firebase/firestore"

import QuestButton from "@/components/QuestButton.vue"

const router = useRouter()
const db = useFirestore()
const auth = useFirebaseAuth()
const team = ref()

getCurrentUser().then((user) => {
  if (user) {
    team.value = useDocument(doc(db, "teams", user.uid))
    console.log(team.value)
  }
})

const logout = () => {
  auth?.signOut().then(() => {
    router.push("/login")
  })
}
</script>
