import { createApp } from "vue"
import { VueFire, VueFireAuth } from "vuefire"
import { createPinia } from "pinia"
import { i18n } from "./i18n"

import App from "./App.vue"
import router from "./router"
import { firebaseApp } from "./firebase"

import "./assets/main.postcss"

const app = createApp(App)

app.use(createPinia())
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
app.use(i18n)
app.use(router)

app.mount("#app")
