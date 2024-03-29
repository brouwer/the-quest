<template>
  <div class="relative flex w-full grow">
    <div class="flex grow flex-col items-center justify-center p-3 pb-16">
      <WrongPostView
        v-if="
          gameStatus != GameStatus.Inactive &&
          post?.post != postNumber?.toString()
        "
      />
      <WaitPostView
        v-if="
          (gameStatus != GameStatus.Game &&
            post?.post == postNumber?.toString()) ||
          gameStatus == GameStatus.PleaseWait
        "
      />
      <PostView
        v-if="
          gameStatus == GameStatus.Game &&
          post &&
          post?.post == postNumber?.toString() &&
          team &&
          !team[`post_${postNumber}_points`]
        "
        :post="post"
      />
      <PointsView
        v-if="
          gameStatus == GameStatus.Game &&
          post &&
          post?.post == postNumber?.toString() &&
          team &&
          team[`post_${postNumber}_points`] &&
          !showNext
        "
        :post="post"
        @next-post="goNext"
      />
      <NextPostView
        v-if="
          (gameStatus == GameStatus.Between ||
            (gameStatus == GameStatus.Game && showNext)) &&
          post == null
        "
        :extra="showNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useDocument, useFirestore } from "vuefire"
import { storeToRefs } from "pinia"
import { doc } from "firebase/firestore"
import { GameStatus, useGameStore } from "@/stores/game"
import { useTeamStore } from "@/stores/team"

import PostView from "@/views/PostView.vue"
import WaitPostView from "@/views/WaitPostView.vue"
import PointsView from "@/views/PointsView.vue"
import NextPostView from "@/views/NextPostView.vue"
import WrongPostView from "@/views/WrongPostView.vue"

const { id } = useRoute().params
const router = useRouter()

const showNext = ref(false)

const db = useFirestore()
const gameStore = useGameStore()
const teamStore = useTeamStore()

const { game, gameStatus, elapsedCurrentCycle } = storeToRefs(gameStore)
const { team } = storeToRefs(teamStore)

const docRef = doc(db, "posts", id as string)
const { data: post } = useDocument(docRef, {
  reset: true,
})

const { nextPost } = teamStore
const { currentGame } = storeToRefs(gameStore)

const postNumber = computed(() => {
  let gameIndex = currentGame.value
  if (!gameIndex) gameIndex = 1
  return nextPost(gameIndex)
})

const goNext = () => {
  showNext.value = true
}

watchEffect(() => {
  if (gameStatus.value != GameStatus.Game) {
    showNext.value = false
  }

  if (gameStatus.value == GameStatus.Over) {
    router.push("/")
  }

  if (
    elapsedCurrentCycle.value >
    (game?.value?.between_minutes * 60 ?? 0) - 10
  ) {
    if (
      gameStatus.value == GameStatus.Between &&
      postNumber.value?.toString() != post?.value?.post
    ) {
      router.push("/")
    }
  }
})
</script>
