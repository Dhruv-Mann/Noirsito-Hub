<template>
  <div 
    class="pink-sweep-sheet" 
    :class="[sweepStage, { 'red-mode': isBloodHovered }]"
    @wheel="handleWheel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
  >
    <!-- Blood Droplets Canvas Layer -->
    <canvas ref="dropletsCanvasRef" class="blood-droplets-canvas" />

    <!-- Dispersal Quote Text Container: Words Fly Out to 4 Screen Corners on Scroll -->
    <div class="quote-editorial-wrapper font-display">
      <!-- Line 1: Giving up (TL) | is not in the BLOOD, sir, (TR) -->
      <div class="quote-line line-1">
        <span 
          class="phrase-medium word-tl"
          :style="{
            transform: `translate(${offsetTL.x}px, ${offsetTL.y}px)`,
            opacity: fragmentOpacity
          }"
        >
          Giving up
        </span>

        <span 
          class="phrase-medium word-tr-phrase"
          :style="{
            transform: `translate(${offsetTR.x}px, ${offsetTR.y}px)`,
            opacity: fragmentOpacity
          }"
        >
          is not in the
        </span>

        <span 
          class="blood-giant word-tr-blood"
          :style="{
            transform: `translate(${offsetTR.x}px, ${offsetTR.y}px)`,
            opacity: fragmentOpacity
          }"
          @mouseenter="isBloodHovered = true"
          @mouseleave="isBloodHovered = false"
        >
          BLOOD
        </span>

        <span 
          class="sir-delicate word-tr-sir"
          :style="{
            transform: `translate(${offsetTR.x}px, ${offsetTR.y}px)`,
            opacity: fragmentOpacity
          }"
        >
          , sir,
        </span>
      </div>
      
      <!-- Line 2: it's not in the (BL) | BLOOD. (BR) -->
      <div class="quote-line line-2">
        <span 
          class="phrase-medium word-bl"
          :style="{
            transform: `translate(${offsetBL.x}px, ${offsetBL.y}px)`,
            opacity: fragmentOpacity
          }"
        >
          it's not in the
        </span>

        <span 
          class="blood-giant word-br"
          :style="{
            transform: `translate(${offsetBR.x}px, ${offsetBR.y}px)`,
            opacity: fragmentOpacity
          }"
          @mouseenter="isBloodHovered = true"
          @mouseleave="isBloodHovered = false"
        >
          BLOOD.
        </span>
      </div>
    </div>

    <!-- Secondary Exit Curtain Sheet Layer with Lissajous Ribbon Bow & Collision Physics -->
    <div class="exit-curtain-sheet" :class="{ active: isExitSweeping }">
      <div v-if="isExitSweeping" class="curtain-stage">
        
        <!-- Top Half: 2D Collision Physics Floating Skill Badges (No red dots, 40% slower physics) -->
        <FloatingSkillsPhysics />

        <!-- Center Lissajous Ribbon Bow Canvas & Scissor Knot -->
        <RibbonCutCanvas @ribbon-cut="handleRibbonCut" />

        <!-- Bottom Half: Tech Stack Philosophy Section -->
        <div class="bottom-philosophy-container font-body">
          <h2 class="tech-stack-heading font-display">
            <span>TECH STACK — </span>
            <span class="highlight-text-red">You name it.</span>
          </h2>
          <p class="philosophy-para">
            Tools and frameworks evolve rapidly, but architectural rigor, first-principles problem solving, 
            and zero-compromise engineering remain timeless. From high-performance browser shaders to 
            scalable distributed backend systems—if it can be conceptualized, it can be built with perfection.
          </p>
        </div>

      </div>
    </div>

    <!-- Scroll Progress Indicator Bar -->
    <div v-if="sweepStage === 'full' && scrollProgress < 0.8 && !isExitSweeping" class="scroll-prompt font-mono">
      <span>SCROLL DOWN TO ENTER HUB</span>
      <div class="scroll-track">
        <div class="scroll-thumb" :style="{ width: `${scrollProgress * 100}%` }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Lenis from 'lenis'
import RibbonCutCanvas from './RibbonCutCanvas.vue'
import FloatingSkillsPhysics from './FloatingSkillsPhysics.vue'
import { usePageTransition } from '~/composables/usePageTransition'

const router = useRouter()
const { sweepStage } = usePageTransition()

const isBloodHovered = ref(false)
const isExitSweeping = ref(false)
const dropletsCanvasRef = ref<HTMLCanvasElement | null>(null)
let dropletRafId: number | null = null

// Lenis Scroll Physics State
const scrollProgress = ref(0)
const hasNavigated = ref(false)
let accumScroll = 0
const maxScroll = 700
let lenis: Lenis | null = null

// 4 Corner Dispersal Position Calculations
const fragmentOpacity = computed(() => {
  if (scrollProgress.value <= 0.0) return 1.0
  if (scrollProgress.value >= 0.75) return 0.0
  return 1.0 - scrollProgress.value / 0.75
})

// Top-Left (TL): Moves UP & LEFT
const offsetTL = computed(() => {
  const p = Math.pow(scrollProgress.value, 1.4)
  return {
    x: -p * 600,
    y: -p * 450
  }
})

// Top-Right (TR): Moves UP & RIGHT
const offsetTR = computed(() => {
  const p = Math.pow(scrollProgress.value, 1.4)
  return {
    x: p * 600,
    y: -p * 450
  }
})

// Bottom-Left (BL): Moves DOWN & LEFT
const offsetBL = computed(() => {
  const p = Math.pow(scrollProgress.value, 1.4)
  return {
    x: -p * 600,
    y: p * 450
  }
})

// Bottom-Right (BR): Moves DOWN & RIGHT
const offsetBR = computed(() => {
  const p = Math.pow(scrollProgress.value, 1.4)
  return {
    x: p * 600,
    y: p * 450
  }
})

function handleWheel(e: WheelEvent) {
  if (sweepStage.value !== 'full' || hasNavigated.value) return
  accumScroll += e.deltaY * 0.9
  accumScroll = Math.max(0, Math.min(maxScroll, accumScroll))
  scrollProgress.value = accumScroll / maxScroll

  // When scroll reaches 85%, activate Secondary Exit Curtain Sweep
  if (scrollProgress.value >= 0.85 && !isExitSweeping.value && !hasNavigated.value) {
    isExitSweeping.value = true
  }
}

// When Ribbon Cutting action occurs
function handleRibbonCut() {
  if (hasNavigated.value) return
  hasNavigated.value = true

  router.push('/hub').then(() => {
    // Uncover curtain sheet upwards to reveal the new /hub page cleanly!
    setTimeout(() => {
      sweepStage.value = 'uncover'
      setTimeout(() => {
        sweepStage.value = 'idle'
        isExitSweeping.value = false
        hasNavigated.value = false
        scrollProgress.value = 0
        accumScroll = 0
      }, 500)
    }, 150)
  })
}

let touchStartY = 0
function handleTouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    touchStartY = e.touches[0].clientY
  }
}

function handleTouchMove(e: TouchEvent) {
  if (sweepStage.value !== 'full' || hasNavigated.value || e.touches.length === 0) return
  const currentY = e.touches[0].clientY
  const deltaY = (touchStartY - currentY) * 1.5
  touchStartY = currentY

  accumScroll += deltaY
  accumScroll = Math.max(0, Math.min(maxScroll, accumScroll))
  scrollProgress.value = accumScroll / maxScroll

  if (scrollProgress.value >= 0.85 && !isExitSweeping.value && !hasNavigated.value) {
    isExitSweeping.value = true
  }
}

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
  const count = 42
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

      ctx.beginPath()
      ctx.arc(d.x, d.y, d.radius, 0, Math.PI)
      ctx.lineTo(d.x, d.y - d.length)
      ctx.closePath()
      ctx.fill()

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

  // Initialize Lenis smooth scroll engine
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  })
})

onBeforeUnmount(() => {
  if (dropletRafId) cancelAnimationFrame(dropletRafId)
  if (lenis) lenis.destroy()
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
  flex-direction: column;
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

.pink-sweep-sheet.red-mode {
  background: radial-gradient(circle at 50% 50%, #FF2A5F 0%, #B30030 55%, #5E0018 100%);
  border-top-color: #ffffff;
  box-shadow: 0 0 140px rgba(255, 42, 95, 0.85), inset 0 0 160px rgba(255, 255, 255, 0.25);
}

.pink-sweep-sheet.halfway {
  transform: translateY(46%);
  transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}

.pink-sweep-sheet.recoil {
  transform: translateY(52%);
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pink-sweep-sheet.full {
  transform: translateY(0%);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.pink-sweep-sheet.uncover {
  transform: translateY(-100%);
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
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
}

.quote-line {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: clamp(12px, 2.2vw, 24px);
  flex-wrap: wrap;
  line-height: 1.05;
}

.phrase-medium,
.blood-giant,
.sir-delicate {
  will-change: transform, opacity;
  transition: transform 0.1s linear, opacity 0.1s linear, color 0.4s ease;
}

.phrase-medium {
  font-size: clamp(1.85rem, 4.4vw, 3.35rem);
  font-weight: 600;
  color: #FAFAFA;
  letter-spacing: -0.02em;
  opacity: 0.94;
}

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
}

.blood-giant:hover {
  transform: scale(1.06) translateY(2px);
}

.pink-sweep-sheet.red-mode .blood-giant {
  color: #000000;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.5);
}

.sir-delicate {
  font-size: clamp(1.35rem, 2.8vw, 2.25rem);
  font-weight: 400;
  font-style: italic;
  color: #E17888;
  letter-spacing: 0.04em;
}

.pink-sweep-sheet.red-mode .sir-delicate {
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
}

/* Secondary Exit Curtain Sheet Stage Container */
.exit-curtain-sheet {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #8A0E2B 0%, #4A0515 50%, #200208 100%);
  border-top: 2px solid #FF2A5F;
  box-shadow: 0 -20px 80px rgba(138, 14, 43, 0.6);
  z-index: 100;
  pointer-events: auto;
  transform: translateY(100%);
  transition: transform 0.48s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.exit-curtain-sheet.active {
  transform: translateY(0%);
}

.curtain-stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Bottom Half: Tech Stack Philosophy Section */
.bottom-philosophy-container {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 860px;
  z-index: 120;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  animation: philosophy-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

@keyframes philosophy-entrance {
  0% {
    opacity: 0;
    transform: translate(-50%, 25px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.tech-stack-heading {
  font-size: clamp(1.85rem, 4.2vw, 3.25rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin: 0;
}

/* Clean Solid Red Text for 'You name it.' with zero glow */
.highlight-text-red {
  color: #FF2A5F;
  text-shadow: none;
}

.philosophy-para {
  font-size: clamp(0.875rem, 1.3vw, 1.0625rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  max-width: 720px;
  margin: 0;
  font-weight: 400;
  letter-spacing: -0.01em;
}

/* Scroll Progress Indicator Bar */
.scroll-prompt {
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 20;
  color: #E17888;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
}

.scroll-track {
  width: 140px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.scroll-thumb {
  height: 100%;
  background: #FF2A5F;
  box-shadow: 0 0 10px #FF2A5F;
  transition: width 0.1s linear;
}
</style>
