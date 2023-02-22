<template>
  <video ref="videoRef" class="w-full max-w-md">test</video>
  <h1>{{ scanResult }}</h1>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue"
import QrScanner from "qr-scanner"

const videoRef = ref<HTMLVideoElement | null>()
const scanner = ref()
const scanResult = ref()

watch(videoRef, (video) => {
  if (video) {
    scanner.value = new QrScanner(
      video,
      (result) => {
        scanResult.value = result.data
      },
      {},
    )

    scanner.value.start()
  }
})

onUnmounted(() => {
  scanner.value?.stop()
})
</script>
