<template>
  <div>
    <h1 class="text-3xl font-black">Post {{ post?.post }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { DocumentData } from "@firebase/firestore"

defineProps<{
  post?: DocumentData
}>()
</script>
