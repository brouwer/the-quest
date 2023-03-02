<template>
  <div class="p-3 pb-16">
    <h1 class="h-6 text-xl font-black">Scan a QR code</h1>
    <h2 class="h-8 text-lg font-black text-red-700">
      {{
        (scanError && scanError) ||
        (scanResult && "That's not a valid Code Breaker QR Code")
      }}
    </h2>
    <div class="h-80 overflow-hidden">
      <video ref="videoRef"></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import QrScanner from "qr-scanner"

const router = useRouter()
const { t } = useI18n()

const videoRef = ref<HTMLVideoElement | null>()
const scanner = ref()
const scanError = ref()
const scanResult = ref()

watch(videoRef, (video) => {
  if (video) {
    scanner.value = new QrScanner(
      video,
      (result) => {
        if (result.data.includes("https://pc23.app")) {
          try {
            const url = new URL(result.data)
            const route = router.resolve(url.pathname)
            if (route.name == "post") {
              router.push(url.pathname)
            }
          } catch (_) {
            console.error(_)
            scanError.value = t("errorQR")
          }
        }
        scanResult.value = result.data
      },
      {
        highlightScanRegion: true,
      },
    )

    scanner.value.start()
  }
})

onUnmounted(() => {
  scanner.value?.stop()
})
</script>
