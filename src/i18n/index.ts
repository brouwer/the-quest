import { createI18n } from "vue-i18n"

import en from "./en.json"
import nb from "./nb.json"
import da from "./da.json"
import de from "./de.json"
import nl from "./nl.json"
import fr from "./fr.json"
import fi from "./fi.json"
import it from "./it.json"
import pt from "./pt.json"
import tr from "./tr.json"
import es from "./es.json"
import ro from "./ro.json"

type MessageSchema = typeof en

const messages = { en, nb, da, de, nl, fr, fi, it, pt, tr, es, ro }

export const i18n = createI18n<[MessageSchema], "en">({
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
