import { createRouter, createWebHistory } from "vue-router"
import PageWrapper from "../pages/PageWrapper.vue"
import HomePage from "../pages/HomePage.vue"
import ScannerPage from "../pages/ScannerPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import { getCurrentUser } from "vuefire"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: PageWrapper,
      children: [
        {
          path: "",
          name: "home",
          component: HomePage,
        },
        {
          path: "scan",
          name: "scanner",
          component: ScannerPage,
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        path: "/login",
      }
    }
  }
})

export default router
