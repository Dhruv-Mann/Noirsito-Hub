import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollReveal(options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
  const isRevealed = ref(false)
  const elementRef = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      isRevealed.value = true
      return
    }

    if (elementRef.value) {
      observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
        if (entry?.isIntersecting) {
          isRevealed.value = true
          if (elementRef.value && observer) {
            observer.unobserve(elementRef.value)
          }
        }
      }, options)

      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
      observer.disconnect()
    }
  })

  return {
    isRevealed,
    elementRef
  }
}
