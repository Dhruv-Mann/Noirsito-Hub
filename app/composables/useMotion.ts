import { ref, onMounted } from 'vue'

export function useMotionPreference() {
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion.value = mediaQuery.matches

      const onChange = (event: MediaQueryListEvent) => {
        prefersReducedMotion.value = event.matches
      }

      mediaQuery.addEventListener('change', onChange)
    }
  })

  return {
    prefersReducedMotion
  }
}
