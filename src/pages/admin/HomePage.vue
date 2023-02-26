<template>
  <FirestoreInput
    type="number"
    field="amount"
    label="Number of games (posts)"
    :modelValue="gameDoc?.amount"
    @update:modelValue="updateModelValue"
  />
  <FirestoreInput
    type="number"
    field="before_minutes"
    label="Minutes for teams to get first post before game start"
    :modelValue="gameDoc?.before_minutes"
    @update:modelValue="updateModelValue"
  />
  <FirestoreInput
    type="number"
    field="between_minutes"
    label="Minutes between games"
    :modelValue="gameDoc?.between_minutes"
    @update:modelValue="updateModelValue"
  />
  <FirestoreInput
    type="number"
    field="game_minutes"
    label="Minutes for each game"
    :modelValue="gameDoc?.game_minutes"
    @update:modelValue="updateModelValue"
  />
  <FirestoreInput
    type="checkbox"
    field="ongoing"
    label="Game active?"
    :modelValue="gameDoc?.ongoing"
    @update:modelValue="updateModelValue"
  />
  <FirestoreInput
    type="datetime-local"
    field="start"
    label="Game start time"
    :modelValue="
      dateForDateTimeInputValue(gameDoc?.start.toDate() ?? new Date())
    "
    @update:modelValue="updateDatetime"
  />
</template>

<script setup lang="ts">
import { useDocument, useFirestore } from "vuefire"
import { doc, FieldValue, updateDoc } from "firebase/firestore"
import FirestoreInput from "@/components/FirestoreInput.vue"

const db = useFirestore()

const docRef = doc(db, "config", "game")
const gameDoc = useDocument(docRef, {
  reset: true,
})

const updateModelValue = (field: string, value: FieldValue) => {
  updateDoc(docRef, {
    [field]: value,
  })
}

const updateDatetime = (field: string, value: FieldValue) => {
  updateDoc(docRef, {
    [field]: new Date(value.toString()),
  })
}

const dateForDateTimeInputValue = (date: Date) =>
  new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
    .toISOString()
    .slice(0, 19)
</script>
