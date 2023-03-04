<template>
  <h1 class="text-3xl font-black">{{ $t("post_next") }}</h1>
  <h4 class="font-mono">{{ $t(`post_${nextPostNumber}_coords`) }}</h4>
  <h2 class="my-4 text-xl font-black">
    {{ $t(`post_${nextPostNumber}_location`) }}
  </h2>
  <QuestButton @click="openGoogleMaps" class="mb-2">{{
    $t("open_google_maps")
  }}</QuestButton>
  <QuestButton @click="openAppleMaps" v-if="isIOS()">{{
    $t("open_apple_maps")
  }}</QuestButton>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { storeToRefs } from "pinia"
import { useGameStore } from "@/stores/game"
import { useTeamStore } from "@/stores/team"
import QuestButton from "@/components/QuestButton.vue"

const props = defineProps<{
  extra: boolean
}>()

const { t } = useI18n()

const gameStore = useGameStore()
const teamStore = useTeamStore()
const { nextPost } = teamStore
const { currentGame } = storeToRefs(gameStore)

const nextPostNumber = computed(() => {
  let nextGame = currentGame.value
  if (nextGame == 0 || !nextGame) nextGame = 1
  return nextPost(nextGame + (props.extra ? 1 : 0))
})

const isIOS = () => {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

const openGoogleMaps = () => {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${t(
      `post_${nextPostNumber.value}_coords`,
    )}`,
    "_blank",
  )
}

const openAppleMaps = () => {
  window.open(
    `https://maps.apple.com/?q=${t(`post_${nextPostNumber.value}_coords`)}`,
    "_blank",
  )
}
</script>
