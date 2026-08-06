<template>
  <section
    ref="sectionEl"
    class="scroll-inception"
    :style="sectionStyle"
  >
    <div class="scroll-inception__viewport" :style="viewportBgStyle">
      <!-- Cover-fit wrapper -->
      <div
        ref="fitEl"
        class="scroll-inception__fit"
        :style="{ visibility: ready ? 'visible' : 'hidden', width: `${W}px`, height: `${H}px` }"
      >
        <!-- Camera transform container -->
        <div ref="cameraEl" class="scroll-inception__camera" :style="{ width: '100%', height: '100%' }">
          <InceptionScreen
            :key="`dive-${depth}`"
            :level="0"
            :depth="depth"
            :screens="screens"
            :url="url"
            :button-label="buttonLabel"
            :accent-color="accentColor"
            :surface-bg="surfaceBg"
            :action-links="actionLinks"
          />
        </div>
      </div>

      <!-- Dive meter -->
      <span
        ref="counterEl"
        class="scroll-inception__counter"
      >
        0:00 / {{ DIVES }}
      </span>

      <!-- Scroll hint -->
      <div
        ref="hintEl"
        class="scroll-inception__hint"
      >
        scroll to dive
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ScrollInception — The scroll-driven Droste zoom engine.
 *
 * Uses GSAP ScrollTrigger inside gsap.context() to sync perfectly with Lenis.
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InceptionScreen from './InceptionScreen.vue'
import type { InceptionScreenData, ActionLink } from './InceptionScreen.vue'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Props {
  screens: InceptionScreenData[]
  url?: string
  buttonLabel?: string
  accentColor?: string
  surfaceBg?: string
  actionLinks?: ActionLink[]
  revealChrome?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  url: 'hub.dhruvmann.com',
  buttonLabel: 'Explore Project',
  accentColor: '#00A19B',
  surfaceBg: '#031413',
  actionLinks: () => [],
  revealChrome: true,
})

// ─── Layout constants ───
const W = 1200
const H = 760
const K = 2.8
const D_Y = 180
const DIVES = 3

// ─── Template refs ───
const sectionEl = ref<HTMLElement | null>(null)
const fitEl = ref<HTMLDivElement | null>(null)
const cameraEl = ref<HTMLDivElement | null>(null)
const hintEl = ref<HTMLDivElement | null>(null)
const counterEl = ref<HTMLSpanElement | null>(null)

// ─── Reactive state ───
const depth = ref(0)
const ready = ref(false)
let depthLocal = 0

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

const sectionStyle = computed(() => ({
  '--ek-bar': props.revealChrome ? '0' : '1',
}))

const viewportBgStyle = computed(() => {
  const c = props.accentColor
  return {
    background: `radial-gradient(120% 100% at 50% 0%, ${props.surfaceBg} 0%, color-mix(in srgb, ${props.surfaceBg} 85%, ${c} 15%) 55%, color-mix(in srgb, ${props.surfaceBg} 70%, ${c} 30%) 100%)`,
  }
})

// ─── Scroll/resize handler (GSAP) ───
let ctx: gsap.Context

onMounted(() => {
  const section = sectionEl.value
  if (!section) return

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: '.scroll-inception__viewport',
      pinSpacing: false,
      onUpdate: (self) => {
        const p = reducedMotion ? 0 : self.progress
        const vw = window.innerWidth
        const vh = window.innerHeight
        
        // Cover-fit
        const fit = Math.max(vw / W, vh / H)
        if (fitEl.value) fitEl.value.style.transform = `scale(${fit})`

        // Dive logic
        const ft = Math.min(p * DIVES, DIVES - 0.0001)
        const d = Math.floor(ft)
        const f = ft - d

        // Camera zoom — origin is top left, translateY compensates
        const sigma = Math.pow(K, f)
        const cy = D_Y * ((sigma - 1) / (K - 1))
        if (cameraEl.value) {
          cameraEl.value.style.transform = `translateY(${-cy * sigma}px) scale(${sigma})`
        }

        // Chrome reveal
        section.style.setProperty(
          '--ek-bar',
          props.revealChrome ? clamp(p / 0.08, 0, 1).toFixed(3) : '1'
        )

        if (d !== depthLocal) {
          depthLocal = d
          depth.value = d
        }

        if (hintEl.value) {
          hintEl.value.style.opacity = String(clamp(1 - p * 14, 0, 1))
        }

        if (counterEl.value) {
          counterEl.value.textContent = `${ft.toFixed(2).replace('.', ':')} / ${DIVES}`
        }
      }
    })

    // Force an initial update for scale
    ScrollTrigger.refresh()
  }, section)

  ready.value = true
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<style scoped>
.scroll-inception {
  position: relative;
  /* 3 dives × ~127vh per dive = 380vh */
  height: 380vh;
}

.scroll-inception__viewport {
  /* Pinning is handled by GSAP ScrollTrigger (pin: true) so Lenis doesn't break it */
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.scroll-inception__fit {
  flex-shrink: 0;
  transform-origin: center center;
}

.scroll-inception__camera {
  will-change: transform;
  transform-origin: center center;
}

.scroll-inception__counter {
  position: absolute;
  bottom: 24px;
  right: 24px;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  user-select: none;
}

.scroll-inception__hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  user-select: none;
  transition: opacity 0.15s ease;
}

/* Mobile: simplified (no inception zoom, just stacked content) */
@media (max-width: 767px) {
  .scroll-inception {
    height: auto;
  }

  .scroll-inception__viewport {
    position: relative;
    height: auto;
    min-height: 100vh;
  }

  .scroll-inception__fit {
    transform: none !important;
  }

  .scroll-inception__camera {
    transform: none !important;
  }

  .scroll-inception__counter,
  .scroll-inception__hint {
    display: none;
  }
}
</style>
