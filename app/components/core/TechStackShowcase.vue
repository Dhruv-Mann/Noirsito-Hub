<template>
  <div class="tech-stack-showcase font-body select-none">
    <!-- Ambient Background Lighting Glows -->
    <div class="ambient-glow glow-pink" />
    <div class="ambient-glow glow-cyan" />

    <!-- Home Button: Positioned absolutely over everything so it doesn't affect layout flow -->
    <button class="btn-home-icon" aria-label="Return to Home" @click="$emit('returnHome')">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    </button>

    <!-- Main Stage: Full-viewport flex row - left content + right full-screen slanted sheet -->
    <div class="stage-container">
      <!-- Left Side: Main Content Column (Animates immediately on page load) -->
      <div class="left-content-column">
        <!-- Top Section: Header Brand -->
        <header class="content-header font-mono">
          <div class="logo-wrapper">
            <span class="logo-dot" />
            <div>
              <p class="logo-title">DHRUV MANN</p>
              <p class="logo-slogan">aka Noirsito • OS Architecture</p>
            </div>
          </div>
        </header>

        <!-- Main Section: TECH STACK Title, Primary Accent Line, Subtitle, CTA -->
        <main class="content-main">
          <h1 class="tech-title font-display">
            <span class="word-tech">TECH</span>
            <span class="word-stack gradient-pink">STACK</span>
          </h1>

          <div class="divider-line" />

          <p class="tech-subtitle">
            First-principles problem solving, high-throughput backend architecture, 
            and desktop-grade 60fps web graphics.
          </p>

          <a 
            href="https://github.com/Dhruv-Mann/Noir-Hub" 
            target="_blank" 
            rel="noopener" 
            class="cta-link font-mono"
          >
            <span>EXPLORE FULL REPOSITORY</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </main>

        <!-- Bottom Section: Footer Contact/System Info Grid -->
        <footer class="content-footer font-mono">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" x2="22" y1="12" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/>
                </svg>
              </div>
              <span>dhruvmann.dev</span>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <span>AI & ML Systems</span>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span>New Delhi, IN</span>
            </div>
          </div>
        </footer>
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
    }

    imgLoaded.value = true
    initCanvas()
    animRafId = requestAnimationFrame(renderPipeline)
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
    }
    imgLoaded.value = true
    initCanvas()
    animRafId = requestAnimationFrame(renderPipeline)
  }
}

function renderPipeline(timestamp: number) {
  const canvas = canvasRef.value
  if (!canvas || !imgLoaded.value || !sampleCtx) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = canvas.width
  const h = canvas.height

  // 1. Fill base dark paired background so ASCII pixels POP with maximum contrast
  ctx.fillStyle = '#120408'
  ctx.fillRect(0, 0, w, h)

  // 2. Sample pixel data from offscreen image canvas
  const imgData = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight)
  const pixels = imgData.data

  const cols = Math.floor(w / params.cellSize)
  const rows = Math.floor(h / params.cellSize)

  const time = timestamp * 0.0025 * (params.animSpeed / 100)

  // 3. Grid Mosaic Cell Render Loop
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * params.cellSize
      const y = r * params.cellSize

      // Map grid cell to sampled source image coordinates
      const sx = Math.floor((c / cols) * sampleWidth)
      const sy = Math.floor((r / rows) * sampleHeight)
      const idx = (sy * sampleWidth + sx) * 4

      let red = pixels[idx] || 0
      let green = pixels[idx + 1] || 0
      let blue = pixels[idx + 2] || 0

      // Brightness (+18)
      red = Math.min(255, Math.max(0, red + params.brightness))
      green = Math.min(255, Math.max(0, green + params.brightness))
      blue = Math.min(255, Math.max(0, blue + params.brightness))

      // Contrast (1.2 multiplier around midpoint 128)
      red = Math.min(255, Math.max(0, (red - 128) * params.contrast + 128))
      green = Math.min(255, Math.max(0, (green - 128) * params.contrast + 128))
      blue = Math.min(255, Math.max(0, (blue - 128) * params.contrast + 128))

      // Wave animation modulation
      const wave = Math.sin(time + c * 0.16 + r * 0.16) * (params.animIntensity / 100)
      const scaleFactor = Math.max(0.25, 0.8 + wave * 0.35)
      const tileSize = (params.cellSize - 2) * scaleFactor
      const offset = (params.cellSize - tileSize) / 2

      // Draw Feathered Mosaic Primitive Tile
      ctx.save()
      ctx.fillStyle = `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`
      ctx.shadowColor = `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, 0.45)`
      ctx.shadowBlur = 4

      ctx.beginPath()
      ctx.roundRect(x + offset, y + offset, tileSize, tileSize, 3)
      ctx.fill()
      ctx.restore()
    }
  }

  // 4. Post-Effect: Vignette (intensity: 35)
  if (params.pfx.vignette.enabled) {
    ctx.save()
    const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.65)
    const opacity = (params.pfx.vignette.intensity / 100) * 0.95
    grad.addColorStop(0, 'rgba(18, 4, 8, 0)')
    grad.addColorStop(1, `rgba(18, 4, 8, ${opacity})`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
    ctx.restore()
  }

  // 5. Post-Effect: Bloom (intensity: 30)
  if (params.pfx.bloom.enabled) {
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = (params.pfx.bloom.intensity / 100) * 0.35
    ctx.filter = 'blur(12px)'
    ctx.drawImage(canvas, 0, 0)
    ctx.restore()
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
.tech-stack-showcase {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  /* Pink-and-black left-side palette: deep crimson-black base with magenta ink bloom */
  background:
    radial-gradient(ellipse 60% 70% at 15% 50%, rgba(255, 10, 80, 0.18) 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 30% 20%, rgba(174, 0, 60, 0.12) 0%, transparent 60%),
    linear-gradient(165deg, #1a0511 0%, #0d0208 55%, #030102 100%);
  color: #FAFAFA;
  overflow: hidden;
  z-index: 10;
  display: flex;
}

/* Ambient Background Glows */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
}

.glow-pink {
  top: 20%;
  left: 10%;
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(255, 42, 95, 0.16) 0%, transparent 70%);
}

.glow-cyan {
  bottom: 20%;
  left: 30%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(100, 210, 255, 0.08) 0%, transparent 70%);
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
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}

.btn-home-icon:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: #ffffff;
  transform: scale(1.08);
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.35);
}

/* Main Stage Container — takes full viewport, no flex-direction:column offset from action bar */
.stage-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  z-index: 10;
}

/* Left Side Content Area — pink-and-black themed, full viewport height */
.left-content-column {
  width: 48vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 64px 48px 48px 64px;
  z-index: 15;
  opacity: 0;
  animation: content-immediate-fade 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.05s;
}

@keyframes content-immediate-fade {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-header {
  margin-bottom: 24px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #FF2A5F;
  box-shadow: 0 0 12px #FF2A5F;
}

.logo-title {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.08em;
}

.logo-slogan {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.1em;
}

.content-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 520px;
}

.tech-title {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.8rem, 8vw, 7.2rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.05em;
  color: #ffffff;
}

.word-tech {
  display: block;
  color: #FAFAFA;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.15);
}

.word-stack {
  display: block;
}

.gradient-pink {
  background: linear-gradient(135deg, #FF2A5F 0%, #F5B8D1 45%, #64D2FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 45px rgba(255, 42, 95, 0.45));
}

/* Primary Accent Line */
.divider-line {
  width: 80px;
  height: 4px;
  background: #FF2A5F;
  border-radius: 2px;
  box-shadow: 0 0 16px rgba(255, 42, 95, 0.6);
  margin: 12px 0 8px 0;
}

.tech-subtitle {
  font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.6;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #FF2A5F;
  margin-top: 8px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-link:hover {
  color: #ffffff;
  transform: translateX(4px);
  filter: drop-shadow(0 0 12px #FF2A5F);
}

/* Bottom Footer Grid */
.content-footer {
  margin-top: 32px;
  width: 100%;
}

.info-grid {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  color: #FF2A5F;
  display: flex;
  align-items: center;
}

/* Full-Screen Right Slanted Sheet — truly covers top:0 to bottom:0, no flex gap */
.fullscreen-slanted-sheet {
  position: fixed;       /* fixed so it ignores all parent flex/padding constraints */
  top: 0;
  right: 0;
  bottom: 0;
  width: 60vw;
  height: 100vh;
  z-index: 20;
  background: linear-gradient(155deg, rgba(255, 42, 95, 0.28) 0%, rgba(28, 4, 12, 0.97) 38%, rgba(10, 2, 5, 1) 100%);
  /* Glowing slanted left edge drop shadow */
  filter: drop-shadow(-20px 0 40px rgba(255, 42, 95, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  /* 0.5s delayed entrance from right, spanning full 100vh top to bottom */
  animation: slanted-fullscreen-reveal 1.25s cubic-bezier(0.19, 1, 0.22, 1) forwards 0.5s;
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
  background: #120408;
  border: 1px solid rgba(255, 42, 95, 0.25);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 42, 95, 0.2);
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
  background: rgba(10, 3, 6, 0.9);
  color: #3ca6ff;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
}
</style>
