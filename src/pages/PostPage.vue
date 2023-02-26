<template>
  <div class="p-5">
    <WrongPostView v-if="post?.color != team?.color" />
    <template v-if="post?.color == team?.color">
      <h1 class="text-3xl font-black">Post {{ post?.game }}</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { useDocument, useFirestore } from "vuefire"
import { storeToRefs } from "pinia"
import { doc } from "firebase/firestore"
import { useTeamStore } from "@/stores/team"

import WrongPostView from "@/views/WrongPostView.vue"

const { id } = useRoute().params

const db = useFirestore()
const store = useTeamStore()
const { team } = storeToRefs(store)

const docRef = doc(db, "posts", id as string)
const { data: post } = useDocument(docRef, {
  reset: true,
})
</script>
