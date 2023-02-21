<template>
  <div class="flex h-full flex-col items-center p-5">
    <div>The Quest</div>
    <div class="flex grow flex-col justify-center">
      <h3>{{ $t("language") }}</h3>
      <LocaleChanger />
    </div>
    <h2>{{ $t("enter_code") }}</h2>
    <input
      type="number"
      v-model="code"
      @keypress="limitToNumbers"
      class="h-10 w-40 text-center font-mono"
    />
    <QuestButton @click="authenticate" :disabled="disabled">{{
      $t("login")
    }}</QuestButton>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { apiURL } from "@config/firebase.config"
import { ref, watchEffect } from "vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
import QuestButton from "@/components/QuestButton.vue"

const code = ref()
const disabled = ref(true)

watchEffect(async () => {
  disabled.value = code.value.toString().length !== 6
})

const authenticate = async () => {
  const { data } = await axios.post(`${apiURL}/authenticate`, {
    code: code.value.toString(),
  })

  console.log(data.token)
}

const limitToNumbers = (event: KeyboardEvent) => {
  if (!/^\d$/.test(event.key) || code.value.toString().length >= 6)
    event.preventDefault()
}
</script>
