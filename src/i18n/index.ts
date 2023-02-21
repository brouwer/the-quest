import { createI18n } from "vue-i18n"

import en from "./en.json"
import nb from "./nb.json"

type MessageSchema = typeof en

const messages = { en, nb }

export const i18n = createI18n<[MessageSchema], "en" | "nb">({
  locale:
    window.localStorage.getItem("app-language") ||
    navigator.language?.split("-")[0] ||
    "en",
  legacy: false,
  globalInjection: true,
  fallbackLocale: "en",
  silentFallbackWarn: true,
  messages: messages,
})
