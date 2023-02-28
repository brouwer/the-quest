<template>
  <div class="p-5">
    <!-- <WrongPostView /> -->
    <PostView :post="post" />
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
