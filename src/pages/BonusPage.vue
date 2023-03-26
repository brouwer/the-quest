<template>
  <div class="relative flex w-full grow">
    <div
      v-if="showCorrectAnswer"
      class="absolute top-1/4 left-1/4 flex aspect-square w-1/2 items-center justify-center rounded-3xl bg-lime-700 p-5"
    >
      <CheckIcon class="text-white" />
    </div>
    <div
      v-if="showWrongAnswer"
      class="absolute top-1/4 left-1/4 flex aspect-square w-1/2 items-center justify-center rounded-3xl bg-red-700 p-5"
    >
      <XMarkIcon class="text-white" />
    </div>
    <div
      v-if="processing"
      class="absolute top-1/4 left-1/4 flex aspect-square w-1/2 items-center justify-center rounded-3xl bg-sky-700 p-5"
    >
      <EllipsisHorizontalIcon class="animate-pulse text-white" />
    </div>
    <div
      v-if="bonusQuestion > 0"
      class="flex grow flex-col items-center justify-center p-3 pb-16"
    >
      <h1 class="mb-3 text-2xl font-black">{{ $t("bonus") }}</h1>
      <p class="mb-2 text-base font-bold normal-case">
        {{ $t(`bonus_${bonusQuestion}`) }}
      </p>
      <button
        :disabled="disabled"
        @click="unlock(1)"
        class="mb-2 w-full rounded-lg border-4 border-primary-500 p-2 text-base normal-case active:bg-primary-300 active:text-white disabled:bg-gray-300 disabled:text-black"
      >
        {{ $t(`bonus_${bonusQuestion}_option_1`) }}
      </button>
      <button
        :disabled="disabled"
        @click="unlock(2)"
        class="mb-2 w-full rounded-lg border-4 border-primary-500 p-2 text-base normal-case active:bg-primary-300 active:text-white disabled:bg-gray-300 disabled:text-black"
      >
        {{ $t(`bonus_${bonusQuestion}_option_2`) }}
      </button>
      <button
        :disabled="disabled"
        @click="unlock(3)"
        class="mb-2 w-full rounded-lg border-4 border-primary-500 p-2 text-base normal-case active:bg-primary-300 active:text-white disabled:bg-gray-300 disabled:text-black"
      >
        {{ $t(`bonus_${bonusQuestion}_option_3`) }}
      </button>
      <button
        :disabled="disabled"
        @click="unlock(3)"
        class="mb-2 w-full rounded-lg border-4 border-primary-500 p-2 text-base normal-case active:bg-primary-300 active:text-white disabled:bg-gray-300 disabled:text-black"
      >
        {{ $t(`bonus_${bonusQuestion}_option_4`) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// todo: add bonus tasks
// bonus page is available when gameStatus is Game
// and when the current post the team is on has been finished
import { ref, watchEffect } from "vue"
import { useRouter } from "vue-router"
import { useCurrentUser } from "vuefire"
import { storeToRefs } from "pinia"
import axios from "axios"
import { useTeamStore } from "@/stores/team"
import { GameStatus, useGameStore } from "@/stores/game"
import { apiURL } from "@config/firebase.config"
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid"

const router = useRouter()

const teamStore = useTeamStore()
const gameStore = useGameStore()

const { team } = storeToRefs(teamStore)
const { game, gameStatus } = storeToRefs(gameStore)

const bonusQuestion = ref(0)
const showCorrectAnswer = ref(false)
const showWrongAnswer = ref(false)
const user = useCurrentUser()
const processing = ref(false)
const disabled = ref(false)

const randomBonus = (avoid?: number) => {
  if (team.value) {
    const teamFinished =
      (team.value?.bonus?.map((bo: number) => bo) as number[]) ?? []
    const totalBonus = game.value?.bonus_amount ?? 0

    if (
      teamFinished.length < totalBonus &&
      avoid &&
      !teamFinished.includes(avoid)
    ) {
      teamFinished.push(avoid)
    }

    if (teamFinished.length >= totalBonus) {
      router.push("/")
      return
    }
    let random = Math.floor(Math.random() * totalBonus) + 1
    while (teamFinished.includes(random)) {
      random = Math.floor(Math.random() * totalBonus) + 1
    }
    bonusQuestion.value = random
  }
}

watchEffect(() => {
  if (game.value && gameStatus.value != GameStatus.Game) {
    router.push("/")
  }

  if (team.value && game.value && bonusQuestion.value == 0) {
    randomBonus()
  }
})

const unlock = async (answer: number) => {
  processing.value = true
  disabled.value = true
  axios
    .post(
      `${apiURL}/bonus-unlock`,
      {
        question: bonusQuestion.value,
        answer: answer,
      },
      {
        headers: {
          Authorization: `Bearer ${await user.value?.getIdToken()}`,
        },
      },
    )
    .then((response) => {
      processing.value = false
      if (response.status == 200) {
        showCorrectAnswer.value = true
        setTimeout(() => {
          showCorrectAnswer.value = false
          disabled.value = false
          randomBonus(bonusQuestion.value)
        }, 3000)
      }
    })
    .catch(({ response }) => {
      processing.value = false
      if (response.status == 403) {
        showWrongAnswer.value = true
        setTimeout(() => {
          showWrongAnswer.value = false
          disabled.value = false
          randomBonus(bonusQuestion.value)
        }, 3000)
      }
    })
}
</script>
