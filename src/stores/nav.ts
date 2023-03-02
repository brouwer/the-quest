import { defineStore } from "pinia"
import { ref } from "vue"

export const useNavStore = defineStore("nav", () => {
  const returnRoute = ref("/")

  const save = (route: string) => {
    returnRoute.value = route
  }

  return { returnRoute, save }
})
