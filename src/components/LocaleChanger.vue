<template>
  <div class="relative h-14 w-80">
    <select
      class="absolute h-full w-full max-w-xs appearance-none rounded-lg border-2 border-primary-500 bg-secondary px-5 text-2xl font-black uppercase text-primary-500 focus:outline-none"
      v-model="$i18n.locale"
    >
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ $t("locale", "", { locale }) }}
      </option>
    </select>
    <ChevronDownIcon
      class="pointer-events-none absolute right-3 top-3 h-9 text-primary-500"
    />
  </div>
</template>
<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/solid"
import { i18n } from "@/i18n"
import { ref, watch } from "vue"

const locale = ref(i18n.global.locale)

watch(locale, () => {
  window.localStorage.setItem("app-language", locale.value)
})
</script>
