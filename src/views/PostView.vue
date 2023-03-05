<template>
  <h1 class="mb-2 text-xl font-black">
    {{ $t(`post_${post?.post}`) }}
  </h1>
  <p class="grow whitespace-pre-line normal-case leading-tight">
    {{ $t(`post_${post?.post}_desc`) }}
  </p>
  <div class="relative mt-2 w-full max-w-md">
    <div
      v-if="showWrongCode"
      class="absolute z-50 flex h-full w-full animate-pulse flex-col items-center justify-center rounded-2xl bg-red-500"
    >
      <span class="font-mono text-xl text-white">{{ $t("denied") }}</span>
      <span class="font-mono text-xl text-white">-100 {{ $t("points") }}</span>
    </div>
    <div
      class="top-0 left-0 h-24 w-full rounded-2xl border-2 border-black bg-white"
    >
      <!--background-->
    </div>
    <div class="absolute top-0 left-1/3 h-full w-0.5 bg-black"></div>
    <div class="absolute top-0 left-2/3 h-full w-0.5 bg-black"></div>
    <span
      class="absolute top-5 left-0 h-20 w-1/3 text-center font-mono text-6xl"
      >{{ char1 }}</span
    >
    <span
      class="absolute top-5 left-1/3 h-20 w-1/3 text-center font-mono text-6xl"
      >{{ char2 }}</span
    >
    <span
      class="absolute left-2/3 top-5 h-20 w-1/3 text-center font-mono text-6xl"
      >{{ char3 }}</span
    >
    <input
      ref="codeInput"
      v-model="code"
      type="number"
      @keypress="limitToNumbers"
      @touchstart="selectField"
      class="absolute inset-0 h-24 w-full select-none appearance-none rounded-2xl bg-transparent text-transparent focus:outline-primary-300"
    />
  </div>
  <QuestButton
    @click="unlock"
    :disabled="disabled || processing"
    class="mt-3 max-w-md"
  >
    <template #default>{{ $t("unlock") }}</template>
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
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"
import { useCurrentUser } from "vuefire"
import axios from "axios"
import type { DocumentData } from "@firebase/firestore"
import QuestButton from "@/components/QuestButton.vue"
import { apiURL } from "@config/firebase.config"

const props = defineProps<{
  post: DocumentData
}>()

const showWrongCode = ref(false)

const user = useCurrentUser()

const codeInput = ref()
const code = ref()
const char1 = computed(() =>
  code.value?.toString()[0] !== "0" ? code.value?.toString()[0] : "",
)
const char2 = computed(() => code.value?.toString()[1])
const char3 = computed(() => code.value?.toString()[2])

const limitToNumbers = (event: KeyboardEvent) => {
  codeInput.value.setCustomValidity("")
  if (!/^\d$/.test(event.key) || code.value?.toString().length >= 3)
    event.preventDefault()
}

const selectField = (event: TouchEvent) => {
  // prevent everything but focusing on the code field
  event.preventDefault()
  codeInput.value.focus()
}

const disabled = ref(true)
const processing = ref(false)

watchEffect(async () => {
  disabled.value = code.value?.toString().length !== 3
})

const unlock = async () => {
  processing.value = true
  axios
    .post(
      `${apiURL}/unlock`,
      {
        post: props.post.post,
        code: code.value.toString(),
      },
      {
        headers: {
          Authorization: `Bearer ${await user.value?.getIdToken()}`,
        },
      },
    )
    .then(() => {
      processing.value = false
    })
    .catch(({ response }) => {
      processing.value = false
      if (response.status == 403) {
        showWrongCode.value = true
        code.value = ""
        setTimeout(() => {
          showWrongCode.value = false
        }, 4000)
      }
    })
}
</script>
