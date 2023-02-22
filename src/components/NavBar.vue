<template>
  <nav
    class="relative flex h-20 items-center justify-center bg-primary-700 text-white"
  >
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
import { QrCodeIcon } from "@heroicons/vue/24/solid"
import { useRouter } from "vue-router"

const router = useRouter()

const navScan = () => {
  router.push("/scan")
}
</script>
