<template>
  PLACEHOLDER FOR POSTS
  <QRCodeVue3
    :width="800"
    :height="800"
    value="Aqua cola is the best"
    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' }"
    image="/qr-breaker.png"
    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 15 }"
    :dotsOptions="{
      type: 'dots',
      color: '#000000',
    }"
    :backgroundOptions="{ color: '#ffffff' }"
    :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
    :cornersDotOptions="{ type: 'dots', color: '#000000' }"
    imgclass="bg-white p-40"
  />
</template>
<script setup lang="ts">
import QRCodeVue3 from "qrcode-vue3"
</script>
