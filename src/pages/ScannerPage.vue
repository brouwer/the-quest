<template>
  <video ref="videoRef" class="w-full max-w-md">test</video>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import QrScanner from "qr-scanner"

const videoRef = ref<HTMLVideoElement | null>()

watch(videoRef, (video) => {
  if (video) {
    const scanner = new QrScanner(
      video,
      (result) => console.log("decoded qr code:", result),
      {},
    )

    scanner.start().then(() => {
      console.log("started")
    })
  }
})
</script>
