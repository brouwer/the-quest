<template>
  <div class="flex h-full w-full flex-col items-center p-5">
    <h1 class="mt-20 text-5xl font-black">The Quest</h1>
    <div class="flex w-full grow flex-col items-center justify-center">
      <h3 class="mb-5 text-2xl font-bold">{{ $t("language") }}</h3>
      <LocaleChanger />
    </div>
    <h3 class="mb-5 text-2xl font-bold">{{ $t("enter_code") }}</h3>
    <input
      ref="codeInput"
      type="number"
      v-model="code"
      @keypress="limitToNumbers"
      class="mb-5 h-14 w-full max-w-xs appearance-none rounded-lg border-2 border-primary-500 bg-white text-center font-mono text-4xl uppercase tracking-widest text-primary-500 invalid:animate-shake invalid:border-2 invalid:border-red-500 invalid:bg-red-100 focus:outline-none"
    />
    <QuestButton @click="authenticate" :disabled="disabled || processing">
      <template #default>{{ $t("login") }}</template>
      <template #icon>
        <svg
          class="w-6 animate-spin text-white"
          :class="{ hidden: !processing }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="m1,12C1,5.92,5.92,1,12,1"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </template>
    </QuestButton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getCurrentUser, useFirebaseAuth } from "vuefire"
import { signInWithCustomToken } from "firebase/auth"
import axios from "axios"
import { apiURL } from "@config/firebase.config"
import LocaleChanger from "@/components/LocaleChanger.vue"
import QuestButton from "@/components/QuestButton.vue"

const auth = useFirebaseAuth()
const route = useRoute()
const router = useRouter()

const codeInput = ref()
const code = ref()
const disabled = ref(true)
const processing = ref(false)

watchEffect(async () => {
  disabled.value = code.value?.toString().length !== 6
})

const authenticate = async () => {
  processing.value = true
  axios
    .post(`${apiURL}/authenticate`, {
      code: code.value.toString(),
    })
    .then(({ data }) => {
      processing.value = false
      signInWithCustomToken(auth!, data.token).then(() => {
        redirectAfterLogin()
      })
    })
    .catch(() => {
      processing.value = false
      codeInput.value.setCustomValidity("Team code not valid")
    })
}

const limitToNumbers = (event: KeyboardEvent) => {
  codeInput.value.setCustomValidity("")
  if (!/^\d$/.test(event.key) || code.value?.toString().length >= 6)
    event.preventDefault()
}

const redirectAfterLogin = () => {
  const to =
    route.query.redirect && typeof route.query.redirect === "string"
      ? route.query.redirect
      : "/"
  router.push(to)
}

onMounted(async () => {
  const currentUser = await getCurrentUser()
  if (currentUser) redirectAfterLogin()
})
</script>
