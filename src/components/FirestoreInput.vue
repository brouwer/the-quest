<template>
  <label class="mb-5 flex items-center">
    <span class="w-80">{{ label }}</span>
    <input class="h-8 grow px-2" :type="type" v-model="value" />
  </label>
</template>
<script setup lang="ts">
import { computed } from "vue"

const props = defineProps(["field", "label", "type", "modelValue"])
const emit = defineEmits(["update:modelValue"])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", props.field, value)
  },
})
</script>
