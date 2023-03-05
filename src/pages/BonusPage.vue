<template>
  <div class="flex h-full w-full flex-col p-3">
    <h1 class="mb-3 text-2xl font-black">{{ $t("bonus") }}</h1>
    <div v-if="bonusQuestion > 0" class="flex h-full w-full flex-col">
      <p class="mb-2 text-base font-bold normal-case">
        {{ $t(`bonus_${bonusQuestion}`) }}
      </p>
      <button
        @click="unlock(1)"
        class="mb-2 w-full rounded-lg border-4 border-primary-500 p-2 text-base normal-case active:bg-primary-300 active:text-white"
      >
        {{ $t(`bonus_${bonusQuestion}_option_1`) }}
      </button>
      <button
        @click="unlock(2)"
        class="mb-2 w-full rounded-lg border-4 border-primary-500 p-2 text-base normal-case active:bg-primary-300 active:text-white"
      >
        {{ $t(`bonus_${bonusQuestion}_option_2`) }}
      </button>
      <button
        @click="unlock(3)"
        class="mb-2 w-full rounded-lg border-4 border-primary-500 p-2 text-base normal-case active:bg-primary-300 active:text-white"
      >
        {{ $t(`bonus_${bonusQuestion}_option_3`) }}
      </button>
      <button
        @click="unlock(3)"
        class="mb-2 w-full rounded-lg border-4 border-primary-500 p-2 text-base normal-case active:bg-primary-300 active:text-white"
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
// import { useRouter } from "vue-router"
import { useCurrentUser } from "vuefire"
import { storeToRefs } from "pinia"
import axios from "axios"
import { useTeamStore } from "@/stores/team"
import { GameStatus, useGameStore } from "@/stores/game"
import { apiURL } from "@config/firebase.config"

// const router = useRouter()

const teamStore = useTeamStore()
const gameStore = useGameStore()

const { team } = storeToRefs(teamStore)
const { game, gameStatus } = storeToRefs(gameStore)

const bonusQuestion = ref(0)
const showCorrectAnswer = ref(false)
const showWrongAnswer = ref(false)
const user = useCurrentUser()

const randomBonus = () => {
  if (team.value) {
    const teamFinished =
      (team.value?.bonus?.map((bo: number) => bo) as number[]) ?? []
    const totalBonus = game.value?.bonus_amount ?? 0

    let random = Math.floor(Math.random() * totalBonus) + 1
    while (teamFinished.includes(random)) {
      random = Math.floor(Math.random() * totalBonus) + 1
    }
    bonusQuestion.value = random
  }
}

watchEffect(() => {
  if (gameStatus.value != GameStatus.Game) {
    //router.push("/")
  }

  if (team.value && game.value && bonusQuestion.value == 0) {
    randomBonus()
  }
})

/*watch(team, () => {
  if (team.value?.bonus && bonusQuestion.value > 0) {
    randomBonus()
  }
}) */

const processing = ref(false)
const unlock = async (answer: number) => {
  processing.value = true
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
        }, 4000)
      }
    })
    .catch(({ response }) => {
      processing.value = false
      if (response.status == 403) {
        showWrongAnswer.value = true
        setTimeout(() => {
          showWrongAnswer.value = false
        }, 4000)
      }
    })
}
</script>
