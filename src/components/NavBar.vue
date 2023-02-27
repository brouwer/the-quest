<template>
  <nav
    class="relative flex h-20 items-center justify-center bg-primary-700 text-white"
  >
    <RouterLink
      to="/"
      class="mx-3 flex w-32 flex-col items-center rounded-full border border-primary-300 py-1 font-black active:border-2"
      :class="{ 'bg-primary-300': !activeScore }"
    >
      <PuzzlePieceIcon class="h-5 w-5" />
      <span class="text-sm">{{ $t("posts") }}</span>
    </RouterLink>
    <div class="grow"></div>
    <RouterLink
      to="/score"
      class="mx-3 flex w-32 flex-col items-center rounded-full border border-primary-300 py-1 font-black active:border-2"
      :class="{ 'bg-primary-300': activeScore }"
    >
      <ChartBarIcon class="h-5 w-5" />
      <span class="text-sm">{{ $t("scores") }}</span>
    </RouterLink>
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
import {
  ChartBarIcon,
  PuzzlePieceIcon,
  QrCodeIcon,
} from "@heroicons/vue/24/solid"

const router = useRouter()
const route = useRoute()

const activeScore = computed(() => {
  return route.path === "/score"
})

const navScan = () => {
  router.push("/scan")
}
</script>
