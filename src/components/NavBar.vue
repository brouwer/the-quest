<template>
  <nav
    class="relative flex h-20 items-center justify-center bg-primary-700 text-white"
  >
    <button
      @click="navHome"
      class="mx-3 flex w-28 flex-col items-center rounded-full border border-primary-300 py-1 font-black active:border-2"
      :class="{ 'bg-primary-300': !activeScore }"
    >
      <PuzzlePieceIcon class="h-5 w-5" />
      <span class="text-sm">{{ $t("posts") }}</span>
    </button>
    <div class="grow"></div>
    <button
      @click="navScore"
      class="mx-3 flex w-28 flex-col items-center rounded-full border border-primary-300 py-1 font-black active:border-2"
      :class="{ 'bg-primary-300': activeScore }"
    >
      <ChartBarIcon class="h-5 w-5" />
      <span class="text-sm">{{ $t("scores") }}</span>
    </button>
    <button
      @click="navScan"
      class="group absolute inset-x-auto -top-[48px] flex h-[96px] w-[96px] items-center justify-center rounded-full border-[4px] border-secondary bg-secondary"
    >
      <div
        class="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-black group-active:h-[84px] group-active:w-[84px]"
      >
        <QrCodeIcon class="h-12 w-12 text-white" />
      </div>
    </button>
  </nav>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useNavStore } from "@/stores/nav"
import {
  ChartBarIcon,
  PuzzlePieceIcon,
  QrCodeIcon,
} from "@heroicons/vue/24/solid"

const router = useRouter()
const route = useRoute()
const navStore = useNavStore()

const { returnRoute } = storeToRefs(navStore)
const { save } = navStore

const activeScore = computed(() => {
  return route.path === "/score"
})

const navHome = () => {
  router.push(returnRoute.value)
}

const navScore = () => {
  if (route.path !== "/scan") save(route.path)
  router.push("/score")
}

const navScan = () => {
  if (route.path !== "/score") save(route.path)
  router.push("/scan")
}
</script>
