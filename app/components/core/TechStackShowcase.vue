<template>
  <div class="tech-stack-showcase font-body select-none">
    <!-- Layered ambient glows matching home page pink-black canvas feel -->
    <div class="ambient-glow glow-primary" />
    <div class="ambient-glow glow-secondary" />
    <div class="ambient-glow glow-accent" />
    <!-- Pixel-grid noise overlay for home-page texture parity -->
    <div class="noise-overlay" aria-hidden="true" />

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
          <!-- Segment 1: Title block — completes at 0.8s -->
          <h1 class="tech-title font-display anim-seg-1">
            <!-- TECH: white-to-blush metallic shimmer, mirrors home page 'Dhruv' -->
            <span class="word-tech">TECH</span>
            <!-- STACK: bright magenta #AE3B8B, mirrors home page 'Mann' -->
            <span class="word-stack">STACK</span>
          </h1>

          <!-- Segment 2: Accent rule — completes at 1.0s (different rate) -->
          <div class="divider-line anim-seg-2" />

          <!-- Segment 3: Subtitle — completes at 1.2s -->
          <p class="tech-subtitle anim-seg-3">
            First-principles problem solving, high-throughput backend architecture,
            and desktop-grade 60fps web graphics.
          </p>

          <!-- Segment 4: CTA — completes at 1.4s (last, feels alive) -->
          <a
            href="https://github.com/Dhruv-Mann/Noir-Hub"
            target="_blank"
            rel="noopener"
            class="cta-btn font-mono anim-seg-4"
          >
            <span class="cta-btn-scroll">
              <span class="cta-btn-text cta-btn-default">
                EXPLORE FULL REPOSITORY
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
              <span class="cta-btn-text cta-btn-hover">
                EXPLORE FULL REPOSITORY
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </span>
          </a>
        </main>

        <!-- Bottom Section: Footer info tags styled like home page 'aka-tag' chips -->
        <!-- Segment 5: Footer — staggered reveal, different rate (1.6s) -->
        <footer class="content-footer font-mono anim-seg-5">
          <div class="info-grid">
            <span class="info-tag">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/>
              </svg>
              dhruvmann.dev
            </span>
            <span class="info-tag">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              AI &amp; ML Systems
            </span>
            <span class="info-tag">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              New Delhi, IN
            </span>
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
  /*
   * Three-layer background matching home page DNA:
   * 1. Hot magenta bloom (left 20%) — mirrors home PixelMatrix #AE3B8B glow
   * 2. Deep crimson wash (top-left) — mirrors home #341514 pixel base
   * 3. Base: near-black (#030102) = home page deepest black
   */
  background:
    radial-gradient(ellipse 55% 80% at 8% 55%, rgba(174, 59, 139, 0.22) 0%, transparent 65%),
    radial-gradient(ellipse 45% 55% at 22% 15%, rgba(255, 10, 80, 0.14) 0%, transparent 60%),
    radial-gradient(ellipse 35% 45% at 40% 85%, rgba(174, 59, 139, 0.09) 0%, transparent 60%),
    linear-gradient(160deg, #1f080f 0%, #0d0207 50%, #030102 100%);
  color: #FAFAFA;
  overflow: hidden;
  z-index: 10;
  display: flex;
}

/* Pixel-noise grain overlay (same texture feel as home page canvas) */
.noise-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Ambient Background Glows */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
}

/* Primary large glow — #AE3B8B magenta, left-center (mirrors home) */
.glow-primary {
  top: 15%;
  left: -8%;
  width: 600px;
  height: 700px;
  background: radial-gradient(circle, rgba(174, 59, 139, 0.20) 0%, transparent 70%);
  filter: blur(120px);
}

/* Secondary warm pink — hot pink splash mid-left */
.glow-secondary {
  bottom: 10%;
  left: 5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 42, 95, 0.13) 0%, transparent 70%);
  filter: blur(100px);
}

/* Accent subtle blush — top-left for depth */
.glow-accent {
  top: -5%;
  left: 20%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(245, 184, 209, 0.08) 0%, transparent 70%);
  filter: blur(80px);
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

/* ============================================================
   ENTRANCE ANIMATION SEGMENTS — each at a different rate so the
   left side feels alive and layered, not a single monotonous fade
   ============================================================ */
@keyframes content-immediate-fade {
  0%   { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Seg 1: Title (0.05s delay, 0.80s dur) — fastest, sets the stage */
.anim-seg-1 { opacity: 0; animation: content-immediate-fade 0.80s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.05s; }
/* Seg 2: Divider (0.25s delay, 0.55s dur, snappy) */
.anim-seg-2 { opacity: 0; animation: content-immediate-fade 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.25s; }
/* Seg 3: Subtitle (0.40s delay, 0.90s dur, slower/heavier) */
.anim-seg-3 { opacity: 0; animation: content-immediate-fade 0.90s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.40s; }
/* Seg 4: CTA button (0.60s delay, 0.70s dur) */
.anim-seg-4 { opacity: 0; animation: content-immediate-fade 0.70s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.60s; }
/* Seg 5: Footer chips (0.80s delay, 1.0s dur, last and slowest — trails in softly) */
.anim-seg-5 { opacity: 0; animation: content-immediate-fade 1.00s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.80s; }

.content-header {
  margin-bottom: 24px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Pulsing dot matches home page #FF2A5F brand accent */
.logo-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #AE3B8B;
  box-shadow: 0 0 10px #AE3B8B, 0 0 20px rgba(174, 59, 139, 0.4);
  animation: dot-pulse 3s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 10px #AE3B8B, 0 0 20px rgba(174, 59, 139, 0.4); }
  50%       { box-shadow: 0 0 18px #AE3B8B, 0 0 40px rgba(174, 59, 139, 0.7); }
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
  gap: 20px;
  max-width: 520px;
}

/* ============================================================
   TECH STACK TITLE — mirrors home page first-name/last-name DNA
   ============================================================ */
.tech-title {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.8rem, 8vw, 7.2rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.05em;
}

/*
 * TECH: White-to-blush metallic shimmer — same gradient as home page 'Dhruv'
 * mirrors: #ffffff → #ffffff → #F5B8D1 → #AE3B8B
 */
.word-tech {
  display: block;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #ffffff 40%,
    #F5B8D1 70%,
    #AE3B8B 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 24px rgba(0, 0, 0, 0.5));
  animation: metallic-shimmer 6s ease-in-out infinite alternate;
}

@keyframes metallic-shimmer {
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

/*
 * STACK: Bright magenta #AE3B8B — same as home page 'Mann'
 */
.word-stack {
  display: block;
  color: #AE3B8B;
  filter: drop-shadow(0 0 30px rgba(174, 59, 139, 0.45));
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.word-stack:hover {
  color: #ffffff;
  filter: drop-shadow(0 0 50px rgba(174, 59, 139, 0.9)) drop-shadow(0 0 80px rgba(174, 59, 139, 0.5));
}

/*
 * Accent divider — #AE3B8B to match STACK, 2 segment sizes for visual depth
 */
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
  box-shadow: 0 0 14px rgba(174, 59, 139, 0.7);
}

.divider-line::after {
  content: '';
  display: block;
  width: 12px;
  height: 3px;
  background: rgba(174, 59, 139, 0.45);
  border-radius: 2px;
}

.tech-subtitle {
  font-size: clamp(0.9375rem, 1.2vw, 1.05rem);
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.65;
  text-wrap: pretty;
}

/* ============================================================
   CTA BUTTON — mirrors home page btn-hub (pink bg → black on hover)
   with vertical inner-scroll animation
   ============================================================ */
.cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 46px;
  padding: 0 28px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  border-radius: 6px;
  background-color: #AE3B8B;
  color: #ffffff;
  border: 1px solid #AE3B8B;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(174, 59, 139, 0.4);
  transition:
    background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  align-self: flex-start;
}

.cta-btn-scroll {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
}

.cta-btn-text {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  white-space: nowrap;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-btn-default {
  transform: translateY(0%);
}

.cta-btn-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
}

/* Hover: black bg + inner text scrolls up (identical to btn-hub on home page) */
.cta-btn:hover {
  background-color: #000000;
  border-color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.7);
}

.cta-btn:hover .cta-btn-default {
  transform: translateY(-100%);
}

.cta-btn:hover .cta-btn-hover {
  transform: translateY(0%);
}

/* ============================================================
   FOOTER TAGS — styled like home page 'aka-tag' pill chips
   ============================================================ */
.content-footer {
  margin-top: 32px;
  width: 100%;
}

.info-grid {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Each info tag is a pill chip — mirrors home page .aka-tag */
.info-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #E17888;
  background-color: rgba(174, 59, 139, 0.15);
  border: 1px solid rgba(174, 59, 139, 0.38);
  padding: 5px 12px;
  border-radius: 999px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  transition:
    color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.info-tag:hover {
  color: #ffffff;
  background-color: #AE3B8B;
  border-color: #AE3B8B;
  box-shadow: 0 4px 20px rgba(174, 59, 139, 0.55);
  transform: translateY(-2px) scale(1.03);
}

/* Full-Screen Right Slanted Sheet — truly covers top:0 to bottom:0, GPU hardware accelerated */
.fullscreen-slanted-sheet {
  position: fixed;       /* fixed so it ignores all parent flex/padding constraints */
  top: 0;
  right: 0;
  bottom: 0;
  width: 60vw;
  height: 100vh;
  z-index: 20;
  background: linear-gradient(155deg, rgba(255, 42, 95, 0.28) 0%, rgba(28, 4, 12, 0.97) 38%, rgba(10, 2, 5, 1) 100%);
  box-shadow: -20px 0 40px rgba(255, 42, 95, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  will-change: clip-path, opacity;
  transform: translateZ(0);
  contain: layout style;
  /* Entrance animation slides across full screen every time page is visited */
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
