<template>
  <div class="relative flex w-full grow">
    <div class="flex grow flex-col items-center p-3 pb-16">
      <!-- <WrongPostView /> -->
      <PostView v-if="post" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { useDocument, useFirestore } from "vuefire"
// import { storeToRefs } from "pinia"
import { doc } from "firebase/firestore"
// import { useTeamStore } from "@/stores/team"

import PostView from "@/views/PostView.vue"
/* import PointsView from "@/views/PointsView.vue"
import WrongPostView from "@/views/WrongPostView.vue" */

const { id } = useRoute().params

const db = useFirestore()
/* const store = useTeamStore()
const { team } = storeToRefs(store) */

const docRef = doc(db, "posts", id as string)
const { data: post } = useDocument(docRef, {
  reset: true,
})
</script>
