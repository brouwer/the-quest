<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ $t("locale", "", { locale }) }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { i18n } from "@/i18n"
import { ref, watch } from "vue"

const locale = ref(i18n.global.locale)

watch(locale, () => {
  window.localStorage.setItem("app-language", locale.value)
})
</script>
