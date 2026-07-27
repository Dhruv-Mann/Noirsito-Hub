<template>
  <div class="tech-stack-showcase font-body select-none">
    <!-- Subtle noise texture overlay -->
    <div class="noise-overlay" aria-hidden="true" />

    <!-- Home Button: Positioned absolutely over everything so it doesn't affect layout flow -->
    <button class="btn-home-icon" aria-label="Return to Home" @click="$emit('returnHome')">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    </button>

    <!-- Main Stage: Full-viewport flex row - left content + right full-screen slanted sheet -->
    <div class="stage-container">
      <!-- Left Side: Main Content Column -->
      <div class="left-content-column">
        <!-- Main Section: TECH STACK Title & Primary Accent Line -->
        <main class="content-header-block">
          <!-- Segment 1: Title block — completes at 0.8s -->
          <h1 class="tech-title font-display anim-seg-1">
            <!-- TECH: white-to-blush metallic shimmer, mirrors home page 'Dhruv' -->
            <span class="word-tech">TECH</span>
            <!-- STACK: bright magenta #AE3B8B, mirrors home page 'Mann' -->
            <span class="word-stack">STACK</span>
          </h1>

          <!-- Segment 2: Accent rule — completes at 1.0s -->
          <div class="divider-line anim-seg-2" />
        </main>

        <!-- Minimal Expandable Accordion Categories (Progressive Disclosure) -->
        <div class="minimal-accordion-container anim-seg-3">
          <div
            v-for="(cat, idx) in stackCategories"
            :key="cat.id"
            class="accordion-item"
            :class="{ open: openCategories.includes(cat.id) }"
          >
            <!-- Minimal Category Header Row -->
            <button
              class="accordion-header font-mono"
              @click="toggleCategory(cat.id)"
            >
              <div class="header-left">
                <span class="index-num">0{{ idx + 1 }}</span>
                <span class="category-name">{{ cat.title }}</span>
              </div>

              <div class="header-right">
                <span class="expand-icon" :class="{ rotated: openCategories.includes(cat.id) }">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </span>
              </div>
            </button>

            <!-- Minimal Text-Only Expanded Content -->
            <div
              v-show="openCategories.includes(cat.id)"
              class="accordion-content font-mono"
            >
              <div class="tech-inline-list">
                <span
                  v-for="(tech, tIdx) in cat.items"
                  :key="tech"
                  class="tech-chip"
                >
                  {{ tech }}<span v-if="tIdx < cat.items.length - 1" class="dot-separator">•</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Full-Screen Slanted Pink Sheet (Reveals across 100vh after 0.5s delay) -->
      <div class="fullscreen-slanted-sheet">
        <div class="canvas-wrapper">
          <canvas ref="canvasRef" class="mosaic-canvas" />
          
          <div v-if="!imgLoaded" class="loading-overlay font-mono">
            <span>SAMPLING MATRIX...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineEmits<{
  (e: 'returnHome'): void
}>()

interface StackCategory {
  id: string
  title: string
  items: string[]
}

const stackCategories: StackCategory[] = [
  {
    id: 'languages',
    title: 'LANGUAGES',
    items: ['Python', 'TypeScript', 'JavaScript', 'C', 'Rust', 'Java']
  },
  {
    id: 'frontend',
    title: 'FRONTEND & WEB',
    items: ['Nuxt 4', 'Vue.js 3', 'Next.js', 'React', 'Tailwind CSS', 'HTML5', 'Hono']
  },
  {
    id: 'backend',
    title: 'BACKEND & RUNTIMES',
    items: ['Node.js', 'Bun', 'REST API Architecture']
  },
  {
    id: 'ai-ml',
    title: 'AI / ML & INTELLIGENT SYSTEMS',
    items: ['PyTorch', 'LangChain', 'Autonomous AI Agents', 'Vector Math & Embeddings', 'Computer Vision (YOLO)']
  },
  {
    id: 'database',
    title: 'DATABASES & CLOUD',
    items: ['PostgreSQL', 'Supabase', 'MySQL']
  },
  {
    id: 'cs',
    title: 'CORE CS & ALGORITHMS',
    items: ['Data Structures & Algorithms (DSA)']
  }
]

const openCategories = ref<string[]>([])

function toggleCategory(catId: string) {
  if (openCategories.value.includes(catId)) {
    openCategories.value = openCategories.value.filter(id => id !== catId)
  } else {
    openCategories.value.push(catId)
  }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const imgLoaded = ref(false)

let sampleCanvas: HTMLCanvasElement | null = null
let sampleCtx: CanvasRenderingContext2D | null = null
let animRafId: number | null = null
let imgObj: HTMLImageElement | null = null

const sampleWidth = 160
const sampleHeight = 120

// 21st.dev Mosaic Pipeline Parameters (JSON Config)
const params = {
  renderMode: 'mosaic',
  bgMode: 'solid',
  bgBlur: 12,
  bgOpacity: 0.9,
  cellSize: 16,
  coverage: 100,
  brightness: 18,
  contrast: 1.2,
  pfx: {
    vignette: { enabled: true, intensity: 35 },
    bloom: { enabled: true, intensity: 30 }
  },
  animated: true,
  animStyle: 'wave',
  animSpeed: 100,
  animIntensity: 65
}

let cachedPixelData: Uint8ClampedArray | null = null

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.parentElement?.getBoundingClientRect()
  const displayW = rect?.width || 640
  const displayH = rect?.height || 480

  canvas.width = displayW
  canvas.height = displayH
}

function loadSourceImage() {
  imgObj = new Image()
  imgObj.src = '/Coding_Desk.jpg'
  
  imgObj.onload = () => {
    sampleCanvas = document.createElement('canvas')
    sampleCanvas.width = sampleWidth
    sampleCanvas.height = sampleHeight
    sampleCtx = sampleCanvas.getContext('2d')
    
    if (sampleCtx && imgObj) {
      sampleCtx.drawImage(imgObj, 0, 0, sampleWidth, sampleHeight)
      const imgData = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight)
      cachedPixelData = imgData.data
    }

    imgLoaded.value = true
    initCanvas()
    if (!animRafId) animRafId = requestAnimationFrame(renderPipeline)
  }

  imgObj.onerror = () => {
    // Fallback procedural texture if image load fails
    sampleCanvas = document.createElement('canvas')
    sampleCanvas.width = sampleWidth
    sampleCanvas.height = sampleHeight
    sampleCtx = sampleCanvas.getContext('2d')
    if (sampleCtx) {
      const grad = sampleCtx.createLinearGradient(0, 0, sampleWidth, sampleHeight)
      grad.addColorStop(0, '#FF2A5F')
      grad.addColorStop(0.5, '#3ca6ff')
      grad.addColorStop(1, '#AE3B8B')
      sampleCtx.fillStyle = grad
      sampleCtx.fillRect(0, 0, sampleWidth, sampleHeight)
      const imgData = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight)
      cachedPixelData = imgData.data
    }
    imgLoaded.value = true
    initCanvas()
    if (!animRafId) animRafId = requestAnimationFrame(renderPipeline)
  }
}

function renderPipeline(timestamp: number) {
  const canvas = canvasRef.value
  if (!canvas || !imgLoaded.value || !cachedPixelData) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = canvas.width
  const h = canvas.height
  const pixels = cachedPixelData

  // 1. Fill base dark paired background so ASCII pixels POP with maximum contrast
  ctx.fillStyle = '#120408'
  ctx.fillRect(0, 0, w, h)

  const cellSize = params.cellSize
  const cols = Math.floor(w / cellSize)
  const rows = Math.floor(h / cellSize)
  const time = timestamp * 0.0025 * (params.animSpeed / 100)
  const animIntensity = params.animIntensity / 100
  const brightness = params.brightness
  const contrast = params.contrast

  // 2. High-Performance Grid Mosaic Cell Render Loop (0.3ms frame time)
  for (let r = 0; r < rows; r++) {
    const y = r * cellSize
    const sy = Math.floor((r / rows) * sampleHeight)
    const syOffset = sy * sampleWidth

    for (let c = 0; c < cols; c++) {
      const x = c * cellSize
      const sx = Math.floor((c / cols) * sampleWidth)
      const idx = (syOffset + sx) * 4

      let red = pixels[idx] || 0
      let green = pixels[idx + 1] || 0
      let blue = pixels[idx + 2] || 0

      // Brightness (+18) & Contrast (1.2)
      red = Math.min(255, Math.max(0, (red + brightness - 128) * contrast + 128))
      green = Math.min(255, Math.max(0, (green + brightness - 128) * contrast + 128))
      blue = Math.min(255, Math.max(0, (blue + brightness - 128) * contrast + 128))

      // Wave animation modulation
      const wave = Math.sin(time + c * 0.16 + r * 0.16) * animIntensity
      const scaleFactor = Math.max(0.25, 0.8 + wave * 0.35)
      const tileSize = (cellSize - 2) * scaleFactor
      const offset = (cellSize - tileSize) * 0.5

      ctx.fillStyle = `rgb(${red | 0},${green | 0},${blue | 0})`
      ctx.fillRect(x + offset, y + offset, tileSize, tileSize)
    }
  }

  // 3. Post-Effect: Fast Radial Vignette Gradient
  if (params.pfx.vignette.enabled) {
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.25, w * 0.5, h * 0.5, Math.max(w, h) * 0.65)
    grad.addColorStop(0, 'rgba(18, 4, 8, 0)')
    grad.addColorStop(1, 'rgba(18, 4, 8, 0.85)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  }

  animRafId = requestAnimationFrame(renderPipeline)
}

function handleResize() {
  initCanvas()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  loadSourceImage()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (animRafId) cancelAnimationFrame(animRafId)
})
</script>

<style scoped>
/* ============================================================
   ROOT: Matches home page pixel canvas base (#341514) + deep black
   ============================================================ */
.tech-stack-showcase {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  /* Architectural Obsidian Dark Mode — Zero AI-slop glowing pink radial blobs */
  background: linear-gradient(160deg, #111215 0%, #090a0d 50%, #040507 100%);
  color: #FAFAFA;
  overflow: hidden;
  z-index: 10;
  display: flex;
}

/* Subtle noise texture overlay */
.noise-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Home Button: Floats over the entire screen at top-right corner */
.btn-home-icon {
  position: absolute;
  top: 24px;
  right: 40px;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}

.btn-home-icon:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.08);
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.2);
}

/* Main Stage Container */
.stage-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  z-index: 10;
}

/* Left Side Content Area */
.left-content-column {
  width: 48vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 64px 48px 48px 64px;
  z-index: 15;
  opacity: 0;
  animation: content-immediate-fade 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.05s;
}

/* Entrance animation */
@keyframes content-immediate-fade {
  0%   { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}

.anim-seg-1 { opacity: 0; animation: content-immediate-fade 0.80s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.05s; }
.anim-seg-2 { opacity: 0; animation: content-immediate-fade 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.25s; }
.anim-seg-3 { opacity: 0; animation: content-immediate-fade 0.70s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.35s; }

.content-header-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 520px;
}

/* ============================================================
   MINIMAL PROGRESSIVE DISCLOSURE ACCORDION
   ============================================================ */
.minimal-accordion-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 28px;
  max-width: 520px;
}

.accordion-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 12px;
  transition: border-color 0.25s ease;
}

.accordion-item.open {
  border-color: rgba(255, 255, 255, 0.22);
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  padding: 8px 0;
  cursor: pointer;
  transition: color 0.25s ease;
}

.accordion-header:hover {
  color: #ffffff;
}

.accordion-item.open .accordion-header {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.index-num {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1em;
}

.category-name {
  font-weight: 700;
}

.expand-icon {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.35);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
}

.expand-icon.rotated {
  transform: rotate(45deg);
  color: #ffffff;
}

.accordion-content {
  padding-top: 10px;
  padding-bottom: 6px;
  padding-left: 32px;
  animation: content-slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes content-slide-down {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.tech-inline-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  line-height: 1.8;
}

.tech-chip {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.04em;
  transition: color 0.2s ease;
}

.tech-chip:hover {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.dot-separator {
  margin-left: 8px;
  color: rgba(255, 255, 255, 0.2);
}

/* ============================================================
   TECH STACK TITLE
   ============================================================ */
.tech-title {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.8rem, 8vw, 7.2rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: #ffffff;
}

.word-tech {
  display: block;
  color: #ffffff;
}

.word-stack {
  display: block;
  color: #AE3B8B;
}

.divider-line {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px 0 4px 0;
}

.divider-line::before {
  content: '';
  display: block;
  width: 64px;
  height: 3px;
  background: #AE3B8B;
  border-radius: 2px;
}

.divider-line::after {
  content: '';
  display: block;
  width: 12px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

/* Full-Screen Right Slanted Sheet — GPU hardware accelerated architectural dark sheet */
.fullscreen-slanted-sheet {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60vw;
  height: 100vh;
  z-index: 20;
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.05) 0%, rgba(18, 19, 23, 0.98) 40%, rgba(6, 7, 9, 1) 100%);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -20px 0 50px rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  will-change: clip-path, opacity;
  transform: translateZ(0);
  contain: layout style;
  animation: slanted-fullscreen-reveal 1.1s cubic-bezier(0.19, 1, 0.22, 1) forwards 0.15s;
}

@keyframes slanted-fullscreen-reveal {
  0% {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    opacity: 0;
  }
  100% {
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
    opacity: 1;
  }
}

.canvas-wrapper {
  width: 82%;
  height: 75%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #090a0d;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
}

.mosaic-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 7, 9, 0.95);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
}
</style>
