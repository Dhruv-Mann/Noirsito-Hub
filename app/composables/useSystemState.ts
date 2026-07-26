import { ref } from 'vue'

const isStarted = ref(false)
const isAssembled = ref(false)

export function useSystemState() {
  function triggerInitialization() {
    if (isStarted.value) return
    isStarted.value = true
    
    // Freeze Lissajous curve immediately, wait 1920ms (+60% increase) for smooth cinematic expansion across screen, then assemble hero text
    setTimeout(() => {
      isAssembled.value = true
    }, 1920)
  }

  return {
    isStarted,
    isAssembled,
    triggerInitialization
  }
}
