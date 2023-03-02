import { createRouter, createWebHistory } from "vue-router"
import { getCurrentUser, useFirebaseAuth } from "vuefire"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../pages/PageWrapper.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../pages/HomePage.vue"),
        },
        {
          path: "scan",
          name: "scanner",
          component: () => import("../pages/ScannerPage.vue"),
        },
        {
          path: "post/:id",
          name: "post",
          component: () => import("../pages/PostPage.vue"),
        },
        {
          path: "score",
          name: "score",
          component: () => import("../pages/ScorePage.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/LoginPage.vue"),
    },
    {
      path: "/admin",
      component: () => import("../pages/admin/PageWrapper.vue"),
      meta: {
        requiresAdmin: true,
      },
      children: [
        {
          path: "",
          name: "admin",
          component: () => import("../pages/admin/HomePage.vue"),
        },
        {
          path: "teams",
          name: "admin-teams",
          component: () => import("../pages/admin/TeamsPage.vue"),
        },
      ],
    },
    {
      path: "/admin-login",
      name: "admin-login",
      component: () => import("../pages/admin/LoginPage.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      component: () => null,
    },
    // Redirect all unmatched routes to home
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.path === "/logout") {
    const auth = useFirebaseAuth()
    await auth?.signOut()
    return {
      path: "/login",
    }
  }
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
