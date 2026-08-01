import { ref } from 'vue'

const sweepStage = ref<'idle' | 'halfway' | 'recoil' | 'full'>('idle')
const isSweeping = ref(false)

export function usePageTransition() {
  function startPinkSweep() {
    if (isSweeping.value) return
    isSweeping.value = true

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }

    // Phase 1: Sweep halfway up
    sweepStage.value = 'halfway'

    // Phase 2: Elastic recoil
    setTimeout(() => {
      sweepStage.value = 'recoil'

      // Phase 3: Accelerate to 100% full screen coverage and LOCK THERE
      setTimeout(() => {
        sweepStage.value = 'full'
      }, 220)
    }, 400)
  }

  function resetPinkSweep() {
    isSweeping.value = false
    sweepStage.value = 'idle'
  }

  return {
    sweepStage,
    isSweeping,
    startPinkSweep,
    resetPinkSweep
  }
}
