<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled"
    :tabindex="tabIndex"
    class="pixel-fire-btn"
    :class="{ 'pixel-fire-btn--disabled': disabled }"
    :style="buttonStyle"
    @mouseenter="hoverRef = true"
    @mouseleave="hoverRef = false; pressedRef = false"
    @pointerdown="pressedRef = true"
    @pointerup="pressedRef = false"
    @click="$emit('click', $event)"
  >
    <canvas
      ref="canvasEl"
      aria-hidden="true"
      class="pixel-fire-btn__canvas"
    />
    <span class="pixel-fire-btn__label"><slot /></span>
  </button>
</template>

<script setup lang="ts">
/**
 * PixelFireButton — A doom-fire canvas button.
 *
 * A dark #2a2a2a base whose face holds a 3px-cell doom-fire simulation:
 * when `lit`, molten fire fills the button from the bottom like a liquid gauge
 * (exponential ease, churning waterline). Hovering bends the flames toward the
 * cursor, pressing fires a burst pulse. The label dims to 40% white while
 * the fire is out.
 *
 * Performance: The entire fire simulation runs on a 30fps canvas tick via
 * requestAnimationFrame, fully outside Vue's reactivity. Only the lit/hover/pressed
 * booleans bridge the gap, and they are read (not watched) inside the rAF loop.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  lit?: boolean
  accentColor?: string
  disabled?: boolean
  tabIndex?: number
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  lit: true,
  accentColor: '#00A19B',
  disabled: false,
  tabIndex: 0,
  type: 'button',
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// ─── Mutable refs read inside rAF (bypassing reactivity for perf) ───
const hoverRef = ref(false)
const pressedRef = ref(false)
const canvasEl = ref<HTMLCanvasElement | null>(null)

const buttonStyle = computed(() => ({
  color: props.lit ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
}))

// ─── Fire palette (38 steps, accent-tinted) ───
const STEPS = 38
const CELL = 3

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ]
}

function buildPalette(alpha: number, accent: string): Uint8Array {
  const [ar, ag, ab] = hexToRgb(accent)
  const p = new Uint8Array(STEPS * 4)

  for (let s = 0; s < STEPS; s++) {
    const t = s / (STEPS - 1)
    let r: number, g: number, b: number

    if (t < 0.4) {
      const e = t / 0.4
      r = lerp(ar * 0.5, ar, e)
      g = lerp(ag * 0.3, ag, e)
      b = lerp(ab * 0.2, ab * 0.6, e)
    } else if (t < 0.75) {
      const e = (t - 0.4) / 0.35
      r = lerp(ar, Math.min(255, ar * 1.3), e)
      g = lerp(ag, Math.min(255, ag * 1.5), e)
      b = lerp(ab * 0.6, Math.min(255, ab * 1.2), e)
    } else {
      const e = (t - 0.75) / 0.25
      r = lerp(Math.min(255, ar * 1.3), 255, e)
      g = lerp(Math.min(255, ag * 1.5), Math.min(255, ag * 2.2), e)
      b = lerp(Math.min(255, ab * 1.2), Math.min(255, ab * 1.8), e)
    }

    p[s * 4] = Math.round(r)
    p[s * 4 + 1] = Math.round(g)
    p[s * 4 + 2] = Math.round(b)
    p[s * 4 + 3] = Math.round(t ** 1.2 * alpha)
  }
  return p
}

// ─── Animation loop (runs entirely outside Vue reactivity) ───
let alive = false
let rafId = 0

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cols = Math.max(8, Math.ceil((canvas.offsetWidth || 160) / CELL))
  const rows = Math.max(8, Math.ceil((canvas.offsetHeight || 38) / CELL))
  canvas.width = cols
  canvas.height = rows

  const palette = buildPalette(180, props.accentColor)
  const heat = new Uint8Array(cols * rows)
  const waterline = new Float32Array(cols)
  let maxHeat = 0
  let pointerX = cols / 2
  let level = props.lit ? 1 : 0
  let lastT = 0
  let acc = 0
  let burst = 0
  let wasPressed = false
  alive = true

  const TICK = 1000 / 30

  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    if (rect.width > 0) {
      pointerX = ((e.clientX - rect.left) / rect.width) * cols
    }
  }
  const parent = canvas.parentElement
  parent?.addEventListener('pointermove', onMove)

  // First paint: if lit from the start, fill with accent base color
  if (level === 1) {
    const img = ctx.createImageData(cols, rows)
    const [br, bg, bb] = hexToRgb(props.accentColor)
    const d = img.data
    for (let o = 0; o < d.length; o += 4) {
      d[o] = br
      d[o + 1] = bg
      d[o + 2] = bb
      d[o + 3] = 255
    }
    ctx.putImageData(img, 0, 0)
  }

  const img = ctx.createImageData(cols, rows)

  const step = (t: number) => {
    if (!alive) return
    rafId = requestAnimationFrame(step)
    lastT ||= t
    const dt = Math.min(64, t - lastT)
    lastT = t

    // Fill level eases toward the lit state
    if (props.lit) {
      level += (1 - level) * (1 - Math.exp(-dt / 240))
    } else if (level > 0) {
      level += (0 - level) * (1 - Math.exp(-dt / 320))
      if (level < 0.02) level = 0
    }

    acc += dt
    if (acc >= TICK) {
      acc %= TICK

      // Churning waterline: random walk per column, smoothed 1-2-1
      for (let x = 0; x < cols; x++) {
        waterline[x] = Math.max(
          -4,
          Math.min(4, (waterline[x] ?? 0) + (Math.random() - 0.5) * 1.6)
        )
      }
      for (let x = 1; x < cols - 1; x++) {
        waterline[x] =
          ((waterline[x - 1] ?? 0) + (waterline[x] ?? 0) * 2 + (waterline[x + 1] ?? 0)) / 4
      }

      // Propagate upward; cooling is harsher while unlit
      const cool = props.lit ? 0 : 1
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols; x++) {
          const src = (y + 1) * cols + x
          const dst =
            y * cols +
            Math.min(cols - 1, Math.max(0, x + ((Math.random() * 3) | 0) - 1))
          const v = (heat[src] ?? 0) - (1 + cool + ((Math.random() * 2.4) | 0))
          heat[dst] = v > 0 ? v : 0
        }
      }

      const churn = level * (1 - level) * 4
      const fill = level * (rows + 6)

      // Press pulse
      if (pressedRef.value && !wasPressed) burst = 1
      wasPressed = pressedRef.value
      burst = pressedRef.value ? Math.max(burst * 0.86, 0.45) : burst * 0.8

      if (props.lit) {
        for (let x = 0; x < cols; x++) {
          const h = fill + (waterline[x] ?? 0) * (0.4 + churn)
          const surface = rows - 1 - Math.floor(h)
          if (level > 0.02 && surface >= 0 && surface < rows) {
            heat[surface * cols + x] = STEPS - 1
            if (surface + 1 < rows) heat[(surface + 1) * cols + x] = STEPS - 1
          }
          if (level > 0.97) {
            if (burst > 0.05) {
              heat[(rows - 1) * cols + x] = STEPS - 1
              heat[(rows - 2) * cols + x] = STEPS - 1
              if (rows > 2 && Math.random() < burst)
                heat[(rows - 3) * cols + x] = STEPS - 1
              if (Math.random() < burst * 0.3)
                heat[((Math.random() * rows) | 0) * cols + x] = STEPS - 1
            } else if (hoverRef.value) {
              heat[(rows - 1) * cols + x] = STEPS - 1
              if (Math.random() < 0.7) heat[(rows - 2) * cols + x] = STEPS - 2
              const d = x - pointerX
              const near = Math.exp(-(d * d) / 18)
              if (near > 0.35 && rows > 2) heat[(rows - 3) * cols + x] = STEPS - 1
              if (near > 0.7 && rows > 3) heat[(rows - 4) * cols + x] = STEPS - 3
            } else if (Math.random() < 0.55) {
              heat[(rows - 1) * cols + x] =
                Math.random() < 0.5 ? STEPS - 11 : STEPS - 17
            }
          }
        }
      }
    }

    if (level === 0 && maxHeat === 0) {
      ctx.clearRect(0, 0, cols, rows)
      return
    }

    // Render: solid molten body below fill line, translucent flames above
    maxHeat = 0
    const d = img.data
    const [baseR, baseG, baseB] = hexToRgb(props.accentColor)
    const churn = level * (1 - level) * 4
    const fill = level * (rows + 6)

    for (let x = 0; x < cols; x++) {
      const h = fill + (waterline[x] ?? 0) * (0.4 + churn)
      for (let y = 0; y < rows; y++) {
        const idx = y * cols + x
        const o = idx * 4
        const v = heat[idx] ?? 0
        if (v > maxHeat) maxHeat = v
        const pi = v * 4
        const a = palette[pi + 3]!

        if (rows - y <= h) {
          d[o] = baseR + (((palette[pi]! - baseR) * a) >> 8)
          d[o + 1] = baseG + (((palette[pi + 1]! - baseG) * a) >> 8)
          d[o + 2] = baseB + (((palette[pi + 2]! - baseB) * a) >> 8)
          d[o + 3] = 255
        } else {
          d[o] = palette[pi]!
          d[o + 1] = palette[pi + 1]!
          d[o + 2] = palette[pi + 2]!
          d[o + 3] = a
        }
      }
    }
    ctx.putImageData(img, 0, 0)
  }

  rafId = requestAnimationFrame(step)

  // Cleanup stored for onBeforeUnmount
  const cleanup = () => {
    alive = false
    cancelAnimationFrame(rafId)
    parent?.removeEventListener('pointermove', onMove)
  }
  cleanupFn = cleanup
})

let cleanupFn: (() => void) | null = null

onBeforeUnmount(() => {
  alive = false
  if (cleanupFn) cleanupFn()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap');

.pixel-fire-btn {
  position: relative;
  display: inline-flex;
  height: 38px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 6px;
  border: none;
  background: #2a2a2a;
  padding: 0 16px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: color 400ms ease, transform 120ms ease-out;
}

.pixel-fire-btn:active {
  transform: scale(0.985);
}

.pixel-fire-btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.pixel-fire-btn--disabled {
  pointer-events: none;
  opacity: 0.5;
}

.pixel-fire-btn__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  image-rendering: pixelated;
}

.pixel-fire-btn__label {
  position: relative;
  z-index: 1;
}
</style>
