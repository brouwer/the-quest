import { createRouter, createWebHistory } from "vue-router"
import PageWrapper from "../pages/PageWrapper.vue"
import HomePage from "../pages/HomePage.vue"
import LoginPage from "../pages/LoginPage.vue"

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
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
  ],
})

export default router
