<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isStarted: boolean
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null

// Mouse tracking & shockwave ripple
let mouseX = -1000
let mouseY = -1000

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  speed: number
}
let shockwaves: Shockwave[] = []

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}
let particles: Particle[] = []

interface PixelBlock {
  col: number
  row: number
  x: number
  y: number
  size: number
  alpha: number
  targetAlpha: number
  emergeDelay: number
  cornerType: 'bottom-right' | 'top-left' | 'bottom-left'
}

let pixelGrid: PixelBlock[] = []
let cols = 0
let rows = 0
let width = 0
let height = 0
const pixelSize = 20 // 20px solid square blocks (zero gap)

// Seeded math for 100% deterministic pattern every reload
function seededRandom(x: number, y: number) {
  const sinVal = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return sinVal - Math.floor(sinVal)
}

function handleResize() {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  initDeterministicGrid()
}

function handleMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function handleCanvasClick(e: MouseEvent) {
  // Add a expanding pixel shockwave on click
  shockwaves.push({
    x: e.clientX,
    y: e.clientY,
    radius: 0,
    maxRadius: Math.max(width, height) * 0.75,
    speed: 18
  })

  // Spawn explosive micro spark particles on click
  const colors = ['#AE3B8B', '#E17888', '#ffffff', '#F5B8D1']
  for (let i = 0; i < 22; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 2.5 + Math.random() * 6.5
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2 + Math.random() * 3,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }
}

// Initialize Grid with Smooth Elliptical Falloff (NO BBOX / NO SQUARE CUTOUT BOX)
function initDeterministicGrid() {
  pixelGrid = []
  if (width === 0 || height === 0) return

  cols = Math.ceil(width / pixelSize)
  rows = Math.ceil(height / pixelSize)

  // Text focal point (Center of text block region: ~28% width, ~48% height)
  const textFocusX = width * 0.28
  const textFocusY = height * 0.48

  // Elliptical exclusion radiuses (no sharp box edges)
  const radiusX = Math.max(300, width * 0.38)
  const radiusY = Math.max(260, height * 0.38)

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * pixelSize
      const y = r * pixelSize

      // Smooth Elliptical Radial Distance (NO rectangular bbox)
      const dx = (x - textFocusX) / radiusX
      const dy = (y - textFocusY) / radiusY
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Smooth density probability (0 near text center, ramping up softly outward)
      const seed = seededRandom(c, r)
      let densityProb = 1

      if (dist < 0.65) {
        densityProb = 0 // Keep text core completely clear
      } else if (dist < 1.15) {
        // Smooth radial fade out from text (no sharp box line)
        const t = (dist - 0.65) / 0.5
        densityProb = t * t // Smooth quadratic curve
      }

      if (densityProb <= 0 || seed > densityProb) {
        continue // Skip smoothly without creating a square box outline
      }

      // 1. BOTTOM-RIGHT CORNER PATTERN (Dense Stepped Wave — 100 Ratio Weight + 10% Boost)
      const distBR = Math.sqrt(Math.pow(cols - 1 - c, 2) + Math.pow(rows - 1 - r, 2))
      const isBRZone = (c / cols > 0.35 || r / rows > 0.45)

      if (isBRZone && seed < 0.825 * densityProb) {
        const delayBR = distBR * 0.045
        pixelGrid.push({
          col: c,
          row: r,
          x,
          y,
          size: pixelSize,
          alpha: 0,
          targetAlpha: 0.4 + seed * 0.6,
          emergeDelay: delayBR,
          cornerType: 'bottom-right'
        })
        continue
      }

      // 2. TOP-LEFT CORNER PATTERN (Sparse Cluster — 15 Ratio Weight + 10% Boost)
      const distTL = Math.sqrt(Math.pow(c, 2) + Math.pow(r, 2))
      const isTLZone = (c / cols < 0.35 && r / rows < 0.35)

      if (isTLZone && seed < 0.22 * densityProb) {
        const delayTL = 0.9 + distTL * 0.063
        pixelGrid.push({
          col: c,
          row: r,
          x,
          y,
          size: pixelSize,
          alpha: 0,
          targetAlpha: 0.3 + seed * 0.5,
          emergeDelay: delayTL,
          cornerType: 'top-left'
        })
        continue
      }

      // 3. BOTTOM-LEFT CORNER PATTERN (Horizontal Band — 15 Ratio Weight + 10% Boost)
      const distBL = Math.sqrt(Math.pow(c, 2) + Math.pow(rows - 1 - r, 2))
      const isBLZone = (c / cols < 0.4 && r / rows > 0.7)

      if (isBLZone && seed < 0.264 * densityProb) {
        const delayBL = 0.9 + distBL * 0.054
        pixelGrid.push({
          col: c,
          row: r,
          x,
          y,
          size: pixelSize,
          alpha: 0,
          targetAlpha: 0.35 + seed * 0.55,
          emergeDelay: delayBL,
          cornerType: 'bottom-left'
        })
      }
    }
  }
}

let startTime: number | null = null

function render(time: number) {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 1. Entire screen starts with #341514
  ctx.fillStyle = '#341514'
  ctx.fillRect(0, 0, width, height)

  // Update expanding shockwaves
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const sw = shockwaves[i]
    sw.radius += sw.speed
    if (sw.radius > sw.maxRadius) {
      shockwaves.splice(i, 1)
    }
  }

  // Render & update micro spark particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i]
    pt.x += pt.vx
    pt.y += pt.vy
    pt.vx *= 0.94
    pt.vy *= 0.94
    pt.alpha -= 0.024

    if (pt.alpha <= 0) {
      particles.splice(i, 1)
    } else {
      ctx.fillStyle = pt.color
      ctx.globalAlpha = Math.max(0, pt.alpha)
      ctx.fillRect(pt.x, pt.y, pt.size, pt.size)
    }
  }

  // 2. Render solid contiguous pixels (ZERO GAP) after user single click
  if (props.isStarted) {
    if (!startTime) startTime = time
    const elapsed = (time - startTime) / 1000

    pixelGrid.forEach(p => {
      if (elapsed > p.emergeDelay) {
        const easeProgress = Math.min(1, (elapsed - p.emergeDelay) * 2.42)
        p.alpha += (p.targetAlpha * easeProgress - p.alpha) * 0.088

        // Proximity reaction & shockwave boosting
        const dx = mouseX - (p.x + p.size / 2)
        const dy = mouseY - (p.y + p.size / 2)
        const dist = Math.sqrt(dx * dx + dy * dy)
        let opacityMultiplier = 1

        if (dist < 140) {
          opacityMultiplier = 1.3 - (dist / 140) * 0.3
        }

        // Apply click shockwave ripple intensity
        shockwaves.forEach(sw => {
          const swDx = (p.x + p.size / 2) - sw.x
          const swDy = (p.y + p.size / 2) - sw.y
          const swDist = Math.sqrt(swDx * swDx + swDy * swDy)
          const ringWidth = 60
          if (Math.abs(swDist - sw.radius) < ringWidth) {
            const waveIntensity = 1 - Math.abs(swDist - sw.radius) / ringWidth
            opacityMultiplier += waveIntensity * 0.65
          }
        })

        ctx.fillStyle = '#AE3B8B'
        ctx.globalAlpha = Math.min(1, p.alpha * opacityMultiplier)
        
        // ZERO GAP: Exact solid pixelSize x pixelSize tile fill
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }
    })
  }

  ctx.globalAlpha = 1
  animationFrameId = requestAnimationFrame(render)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight

  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('click', handleCanvasClick)

  initDeterministicGrid()
  setTimeout(initDeterministicGrid, 50)

  animationFrameId = requestAnimationFrame(render)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('click', handleCanvasClick)
})
</script>

<template>
  <div class="pixel-canvas-wrapper">
    <canvas ref="canvasRef" class="pixel-canvas" />

    <!-- Click-to-Start Prompt Overlay with Jumping Cursor -->
    <Transition name="fade">
      <div v-if="!isStarted" class="click-prompt-overlay">
        <div class="prompt-content">
          <div class="jumping-cursor">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#AE3B8B">
              <path d="M13.64 21.97l-3.22-6.66-3.83 3.83V2.5l14.7 11.47-5.4 1.13 3.22 6.66-5.47 2.21z" />
            </svg>
          </div>
          <span class="prompt-text font-mono">CLICK ANYWHERE TO INITIALIZE SYSTEM</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.pixel-canvas-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.pixel-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Jumping Cursor Prompt Overlay — Centered in the middle of the screen */
.click-prompt-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: rgba(52, 21, 20, 0.4);
  backdrop-filter: blur(4px);
  pointer-events: none;
}

.prompt-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-phi-md);
  color: #ffffff;
}

.jumping-cursor {
  animation: jump 1.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  filter: drop-shadow(0 4px 12px rgba(174, 59, 139, 0.6));
}

.prompt-text {
  font-size: 0.875rem;
  letter-spacing: 0.18em;
  color: #E17888;
  background: rgba(52, 21, 20, 0.85);
  padding: 8px 18px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(174, 59, 139, 0.4);
}

@keyframes jump {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-16px) scale(1.08);
  }
}

.fade-leave-active {
  transition: opacity 0.5s var(--ease-out);
}
.fade-leave-to {
  opacity: 0;
}
</style>
