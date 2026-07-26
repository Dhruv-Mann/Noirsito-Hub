import { ref } from 'vue'

const isStarted = ref(false)
const isAssembled = ref(false)

export function useSystemState() {
  function triggerInitialization() {
    if (isStarted.value) return
    isStarted.value = true
    isAssembled.value = true
  }

  return {
    isStarted,
    isAssembled,
    triggerInitialization
  }
}
