<template>
  <div
    class="relative"
    :class="[!props.button ? ['h-14', 'w-80'] : ['h-10', 'w-10']]"
  >
    <select :class="css" v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ $t("locale", "", { locale }) }}
      </option>
    </select>
    <GlobeAltIcon
      v-if="props.button"
      class="pointer-events-none absolute absolute inset-0 h-10 bg-primary-700 text-white"
    />
    <ChevronDownIcon
      v-if="!props.button"
      class="pointer-events-none absolute right-3 top-3 h-9 text-primary-500"
    />
  </div>
</template>
<script setup lang="ts">
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/vue/24/solid"
import { i18n } from "@/i18n"
import { ref, watch, computed } from "vue"

const props = defineProps<{
  button: boolean
}>()

const locale = ref(i18n.global.locale)

const css = computed(() => {
  if (props.button) {
    return "absolute h-full w-full appearance-none rounded-full bg-primary-700 focus:outline-none"
  } else {
    return "absolute h-full w-full max-w-xs appearance-none rounded-lg border-2 border-primary-500 bg-secondary px-5 text-2xl font-black uppercase text-primary-500 focus:outline-none"
  }
})

watch(locale, () => {
  window.localStorage.setItem("app-language", locale.value)
})
</script>
