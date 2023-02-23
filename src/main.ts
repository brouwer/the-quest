import { createApp } from "vue"
import { VueFire, VueFireAuth, VueFireAppCheck } from "vuefire"
import { ReCaptchaV3Provider } from "firebase/app-check"
import { createPinia } from "pinia"
import { i18n } from "./i18n"

import App from "./App.vue"
import router from "./router"
import { firebaseApp } from "./firebase"
import { appCheckSiteKey, appCheckDebug } from "@config/firebase.config"

import "./assets/main.postcss"

const app = createApp(App)

app.use(createPinia())
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
    VueFireAppCheck({
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      debug: appCheckDebug,
    }),
  ],
})
app.use(i18n)
app.use(router)

app.mount("#app")
