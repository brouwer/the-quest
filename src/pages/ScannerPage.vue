<template>
  <video ref="videoRef" class="w-full max-w-md">test</video>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue"
import QrScanner from "qr-scanner"

const videoRef = ref<HTMLVideoElement | null>()
const scanner = ref()

watch(videoRef, (video) => {
  if (video) {
    scanner.value = new QrScanner(
      video,
      (result) => console.log("decoded qr code:", result),
      {},
    )

    scanner.value.start().then(() => {
      console.log("started")
    })
  }
})

onUnmounted(() => {
  scanner.value?.stop()
})
</script>
