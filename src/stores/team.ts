import { defineStore } from "pinia"
import { computed } from "vue"
import { useDocument, useFirestore, useCurrentUser } from "vuefire"
import { doc } from "firebase/firestore"

export const useTeamStore = defineStore("team", () => {
  const user = useCurrentUser()
  const db = useFirestore()

  const docRef = computed(() => {
    if (user.value) return doc(db, "teams", user.value?.uid)
    return null
  })
  const { data: team } = useDocument(docRef, {
    reset: true,
  })

  return { team }
})
