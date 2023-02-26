import { createRouter, createWebHistory } from "vue-router"
import PageWrapper from "../pages/PageWrapper.vue"
import HomePage from "../pages/HomePage.vue"
import ScannerPage from "../pages/ScannerPage.vue"
import PostPage from "../pages/PostPage.vue"
import LoginPage from "../pages/LoginPage.vue"

import AdminPageWrapper from "../pages/admin/PageWrapper.vue"
import AdminHomePage from "../pages/admin/HomePage.vue"
import AdminTeamsPage from "../pages/admin/TeamsPage.vue"
import AdminGamesPage from "../pages/admin/GamesPage.vue"
import AdminPostsPage from "../pages/admin/PostsPage.vue"
import AdminLoginPage from "../pages/admin/LoginPage.vue"
import { getCurrentUser } from "vuefire"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: PageWrapper,
      meta: {
        requiresAuth: true,
      },
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
        {
          path: "post/:id",
          name: "post",
          component: PostPage,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/admin",
      component: AdminPageWrapper,
      meta: {
        requiresAdmin: true,
      },
      children: [
        {
          path: "",
          name: "admin",
          component: AdminHomePage,
        },
        {
          path: "teams",
          name: "admin-teams",
          component: AdminTeamsPage,
        },
        {
          path: "games",
          name: "admin-games",
          component: AdminGamesPage,
        },
        {
          path: "posts",
          name: "admin-posts",
          component: AdminPostsPage,
        },
      ],
    },
    {
      path: "/admin-login",
      name: "admin-login",
      component: AdminLoginPage,
    },
    // Redirect all unmatched routes to home
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    const isTeam = currentUser?.email == null
    if (!currentUser || !isTeam) {
      return {
        path: "/login",
        ...(to.fullPath !== "/" && {
          query: {
            redirect: to.fullPath,
          },
        }),
      }
    }
  }

  if (to.meta.requiresAdmin) {
    const currentUser = await getCurrentUser()
    const admin =
      (await currentUser?.getIdTokenResult())?.claims?.admin ?? false
    if (!currentUser || !admin) {
      return {
        path: "/admin-login",
        ...(to.fullPath !== "/admin" && {
          query: {
            redirect: to.fullPath,
          },
        }),
      }
    }
  }
})

export default router
