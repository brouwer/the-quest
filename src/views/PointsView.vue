<template>
  <div class="grow"></div>
  <h1 class="text-center text-3xl font-black">
    {{ points }}
    <br />
    {{ $t("points") }}
  </h1>
  <div class="grow"></div>
  <QuestButton v-if="elapsedCurrentCycle > 10" @click="goBonus" class="mb-2">{{
    $t("goBonus")
  }}</QuestButton>
  <!-- <QuestButton @click="$emit('nextPost')" class="!bg-primary-300">{{
    $t("post_next")
  }}</QuestButton> -->
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useTeamStore } from "@/stores/team"
import { useGameStore } from "@/stores/game"
import type { DocumentData } from "@firebase/firestore"
import { storeToRefs } from "pinia"
import QuestButton from "@/components/QuestButton.vue"

const props = defineProps<{
  post: DocumentData
}>()
defineEmits(["nextPost"])

const router = useRouter()

const teamStore = useTeamStore()
const gameStore = useGameStore()
const { team } = storeToRefs(teamStore)
const { elapsedCurrentCycle } = storeToRefs(gameStore)

const postNumber = computed(() => {
  return props.post.post
})

const points = computed(() => {
  return team.value?.[`post_${postNumber.value}_points`] ?? 0
})

const goBonus = () => {
  router.push(`/bonus`)
}
</script>
