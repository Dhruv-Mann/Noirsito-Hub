<template>
  <div 
    class="pink-sweep-sheet" 
    :class="[sweepStage, { 'red-mode': isBloodHovered }]"
    aria-hidden="true"
  >
    <!-- Blood Droplets Canvas Layer -->
    <canvas ref="dropletsCanvasRef" class="blood-droplets-canvas" />

    <div class="quote-editorial-wrapper font-display">
      <!-- Line 1: Giving up is not in the BLOOD, sir, -->
      <div class="quote-line line-1">
        <span class="phrase-medium">Giving up is not in the</span>
        <span 
          class="blood-giant"
          @mouseenter="isBloodHovered = true"
          @mouseleave="isBloodHovered = false"
        >
          BLOOD
        </span>
        <span class="sir-delicate">, sir,</span>
      </div>
      
      <!-- Line 2: it's not in the BLOOD. -->
      <div class="quote-line line-2">
        <span class="phrase-medium">it's not in the</span>
        <span 
          class="blood-giant"
          @mouseenter="isBloodHovered = true"
          @mouseleave="isBloodHovered = false"
        >
          BLOOD.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePageTransition } from '~/composables/usePageTransition'

const { sweepStage } = usePageTransition()
const isBloodHovered = ref(false)

const dropletsCanvasRef = ref<HTMLCanvasElement | null>(null)
let dropletRafId: number | null = null

interface BloodDroplet {
  x: number
  y: number
  radius: number
  length: number
  speed: number
  opacity: number
  color: string
}

let droplets: BloodDroplet[] = []

function initDroplets() {
  const canvas = dropletsCanvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  droplets = []
  const count = 42 // 42 organic dark crimson blood droplets
  const darkRedShades = ['#800014', '#5A000D', '#9A0019', '#3D0008', '#6B0010']

  for (let i = 0; i < count; i++) {
    droplets.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 3 + Math.random() * 9,
      length: 10 + Math.random() * 26,
      speed: 1.2 + Math.random() * 2.8,
      opacity: 0.75 + Math.random() * 0.25,
      color: darkRedShades[Math.floor(Math.random() * darkRedShades.length)]
    })
  }
}

function renderDroplets() {
  const canvas = dropletsCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (isBloodHovered.value) {
    droplets.forEach(d => {
      // Drip physics downward
      d.y += d.speed

      if (d.y > canvas.height + 40) {
        d.y = -30
        d.x = Math.random() * canvas.width
      }

      ctx.save()
      ctx.globalAlpha = d.opacity
      ctx.fillStyle = d.color
      ctx.shadowColor = '#240005'
      ctx.shadowBlur = 10

      // Draw teardrop / organic blood droplet shape
      ctx.beginPath()
      ctx.arc(d.x, d.y, d.radius, 0, Math.PI) // Bottom curve
      ctx.lineTo(d.x, d.y - d.length) // Top pointed tail
      ctx.closePath()
      ctx.fill()

      // Glossy highlight reflection on top edge of droplet
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.beginPath()
      ctx.arc(d.x - d.radius * 0.3, d.y - d.radius * 0.15, d.radius * 0.32, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    })
  }

  dropletRafId = requestAnimationFrame(renderDroplets)
}

function handleResize() {
  initDroplets()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  initDroplets()
  dropletRafId = requestAnimationFrame(renderDroplets)
})

onBeforeUnmount(() => {
  if (dropletRafId) cancelAnimationFrame(dropletRafId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.pink-sweep-sheet {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  background: radial-gradient(circle at 50% 50%, #240b12 0%, #0d0506 65%, #000000 100%);
  border-top: 3px solid #AE3B8B;
  box-shadow: 0 -20px 90px rgba(0, 0, 0, 0.95), inset 0 0 140px rgba(174, 59, 139, 0.3);
  pointer-events: auto;
  transform: translateY(100%);
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, background;
  transition: background 0.42s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.42s ease, 
              box-shadow 0.42s ease;
}

.blood-droplets-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Hover on BLOOD: Entire background transitions to Vibrant Signature Neon Red (#FF2A5F)! */
.pink-sweep-sheet.red-mode {
  background: radial-gradient(circle at 50% 50%, #FF2A5F 0%, #B30030 55%, #5E0018 100%);
  border-top-color: #ffffff;
  box-shadow: 0 0 140px rgba(255, 42, 95, 0.85), inset 0 0 160px rgba(255, 255, 255, 0.25);
}

/* Phase 1: Sweeps halfway up */
.pink-sweep-sheet.halfway {
  transform: translateY(46%);
  transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Phase 2: Elastic recoil slightly back */
.pink-sweep-sheet.recoil {
  transform: translateY(52%);
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Phase 3: Accelerates and completely covers the screen & locks */
.pink-sweep-sheet.full {
  transform: translateY(0%);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.quote-editorial-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(16px, 3vw, 32px);
  text-align: center;
  max-width: 1200px;
  padding: 0 var(--space-phi-lg);
  opacity: 0;
  transform: translateY(30px) scale(0.98);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
}

.pink-sweep-sheet.full .quote-editorial-wrapper {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.quote-line {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: clamp(12px, 2.2vw, 24px);
  flex-wrap: wrap;
  line-height: 1.05;
}

/* Base phrase text: sleek elegant soft champagne white */
.phrase-medium {
  font-size: clamp(1.85rem, 4.4vw, 3.35rem);
  font-weight: 600;
  color: #FAFAFA;
  letter-spacing: -0.02em;
  opacity: 0.94;
  transition: color 0.4s ease;
}

/* HUGE GIANT BLOOD TEXT: Vibrant Neon Red (#FF2A5F) with massive glow */
.blood-giant {
  font-size: clamp(3.85rem, 9.5vw, 7.25rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #FF2A5F;
  text-shadow: 0 0 32px rgba(255, 42, 95, 0.95),
               0 0 70px rgba(255, 42, 95, 0.55),
               0 0 110px rgba(174, 59, 139, 0.45);
  text-transform: uppercase;
  transform: translateY(4px);
  cursor: pointer;
  transition: transform 0.3s var(--ease-out), color 0.4s ease, text-shadow 0.4s ease;
}

.blood-giant:hover {
  transform: scale(1.06) translateY(2px);
}

/* In Red Mode, BLOOD text switches to Obsidian Black with White Glow for high contrast! */
.pink-sweep-sheet.red-mode .blood-giant {
  color: #000000;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.5);
}

/* Delicate italic 'sir,' text — Switches from dusty pink to Pure White in Red Mode */
.sir-delicate {
  font-size: clamp(1.35rem, 2.8vw, 2.25rem);
  font-weight: 400;
  font-style: italic;
  color: #E17888;
  letter-spacing: 0.04em;
  transition: color 0.4s ease, text-shadow 0.4s ease;
}

.pink-sweep-sheet.red-mode .sir-delicate {
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
}
</style>
