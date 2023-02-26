<template>
  <div class="flex h-full flex-col items-center">
    <div class="flex w-full flex-col">
      <TopBar />
    </div>
    <div
      class="flex w-full grow flex-col items-center justify-start overflow-y-auto"
    >
      <RouterView />
    </div>
    <div class="flex w-full flex-col">
      <NavBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue"
import NavBar from "@/components/NavBar.vue"
</script>
