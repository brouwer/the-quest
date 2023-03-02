<template>
  <div class="font-mono normal-case">
    <nav
      class="flex h-16 w-full items-center bg-primary-500 px-5 text-white"
      id="topnav"
    >
      <div>Admin Panel</div>
      <div class="grow"></div>
      <div>
        {{ user?.displayName }} | <button @click="signOut">Sign Out</button>
      </div>
    </nav>
    <div class="flex flex-row">
      <nav id="sidenav" class="flex w-96 flex-col p-10">
        <RouterLink
          class="mb-5 w-full rounded-lg bg-primary-300 py-3 px-5 text-white"
          exact-active-class="!bg-primary-700"
          to="/admin"
          >Settings</RouterLink
        >
        <RouterLink
          class="mb-5 w-full rounded-lg bg-primary-300 py-3 px-5 text-white"
          exact-active-class="!bg-primary-700"
          to="/admin/teams"
          >Teams</RouterLink
        >
      </nav>
      <main class="w-full p-10">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useCurrentUser, useFirebaseAuth } from "vuefire"

const auth = useFirebaseAuth()
const router = useRouter()
const user = useCurrentUser()

const signOut = () => {
  auth?.signOut().then(() => {
    router.push("/admin-login")
  })
}
</script>
