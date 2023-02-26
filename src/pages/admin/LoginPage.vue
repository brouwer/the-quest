<template>
  <div class="flex h-full w-full items-center justify-center text-center">
    <div class="rounded-lg bg-white p-8 shadow-lg">
      <h1 class="mb-4 text-2xl font-bold">Admin Panel</h1>
      <QuestButton @click="startSignInAdmin">Sign in to Admin</QuestButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFirebaseAuth } from "vuefire"
import { useRoute, useRouter } from "vue-router"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import QuestButton from "@/components/QuestButton.vue"

const auth = useFirebaseAuth()
const route = useRoute()
const router = useRouter()

const startSignInAdmin = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth!, provider).then(() => {
    redirectAfterLogin()
  })
}

const redirectAfterLogin = () => {
  const to =
    route.query.redirect && typeof route.query.redirect === "string"
      ? route.query.redirect
      : "/admin"
  router.push(to)
}
</script>
