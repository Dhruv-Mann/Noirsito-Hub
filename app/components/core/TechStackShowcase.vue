<template>
  <div class="tech-stack-showcase font-body select-none">
    <!-- Ambient Background Glow -->
    <div class="ambient-glow" />

    <!-- Top Action Bar with Minimal White Home Icon Button on Top Right -->
    <div class="top-action-bar">
      <div class="spacer" />

      <button class="btn-home-icon" aria-label="Return to Home" @click="$emit('returnHome')">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      </button>
    </div>

    <!-- Main Stage: Right-Middle Borderless Feathered Mosaic Canvas -->
    <div class="stage-container">
      <div class="canvas-wrapper">
        <canvas ref="canvasRef" class="mosaic-canvas" />
        
        <div v-if="!imgLoaded" class="loading-overlay font-mono">
          <span>SAMPLING MATRIX...</span>
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
  brightness: 12,
  contrast: 1.15,
  pfx: {
    vignette: { enabled: true, intensity: 38 },
    bloom: { enabled: true, intensity: 25 }
  },
  animated: true,
  animStyle: 'wave',
  animSpeed: 100,
  animIntensity: 60
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

  // 1. Draw solid dark background matching screen color
  ctx.fillStyle = '#0a0306'
  ctx.fillRect(0, 0, w, h)

  // 2. Sample pixel data from offscreen image canvas
  const imgData = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight)
  const pixels = imgData.data

  const cols = Math.floor(w / params.cellSize)
  const rows = Math.floor(h / params.cellSize)

  const time = timestamp * 0.0025 * (params.animSpeed / 100)

  // 3. Grid Mosaic Cell Render Loop with Edge Feathering (Borderless Blend)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Calculate distance to canvas boundaries for seamless edge blending
      const edgeDistX = Math.min(c, cols - 1 - c)
      const edgeDistY = Math.min(r, rows - 1 - r)
      const edgeDist = Math.min(edgeDistX, edgeDistY)

      // Outer 4 border rows/cols fade out to zero opacity for borderless background blend
      const feather = Math.min(1.0, Math.max(0, edgeDist / 3.5))
      if (feather <= 0) continue

      const x = c * params.cellSize
      const y = r * params.cellSize

      // Map grid cell to sampled source image coordinates
      const sx = Math.floor((c / cols) * sampleWidth)
      const sy = Math.floor((r / rows) * sampleHeight)
      const idx = (sy * sampleWidth + sx) * 4

      let red = pixels[idx] || 0
      let green = pixels[idx + 1] || 0
      let blue = pixels[idx + 2] || 0

      // Brightness (+12)
      red = Math.min(255, Math.max(0, red + params.brightness))
      green = Math.min(255, Math.max(0, green + params.brightness))
      blue = Math.min(255, Math.max(0, blue + params.brightness))

      // Contrast (1.15 multiplier around midpoint 128)
      red = Math.min(255, Math.max(0, (red - 128) * params.contrast + 128))
      green = Math.min(255, Math.max(0, (green - 128) * params.contrast + 128))
      blue = Math.min(255, Math.max(0, (blue - 128) * params.contrast + 128))

      // Wave animation modulation
      const wave = Math.sin(time + c * 0.16 + r * 0.16) * (params.animIntensity / 100)
      const scaleFactor = Math.max(0.2, 0.75 + wave * 0.35) * feather
      const tileSize = (params.cellSize - 2) * scaleFactor
      const offset = (params.cellSize - tileSize) / 2

      // Draw Borderless Feathered Mosaic Primitive Tile
      ctx.save()
      ctx.globalAlpha = feather
      ctx.fillStyle = `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`
      ctx.shadowColor = `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, ${0.35 * feather})`
      ctx.shadowBlur = 3

      ctx.beginPath()
      ctx.roundRect(x + offset, y + offset, tileSize, tileSize, 3)
      ctx.fill()
      ctx.restore()
    }
  }

  // 4. Post-Effect: Vignette (intensity: 38)
  if (params.pfx.vignette.enabled) {
    ctx.save()
    const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.65)
    const opacity = (params.pfx.vignette.intensity / 100) * 0.95
    grad.addColorStop(0, 'rgba(10, 3, 6, 0)')
    grad.addColorStop(1, `rgba(10, 3, 6, ${opacity})`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
    ctx.restore()
  }

  // 5. Post-Effect: Bloom (intensity: 25)
  if (params.pfx.bloom.enabled) {
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = (params.pfx.bloom.intensity / 100) * 0.3
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
  background: radial-gradient(circle at 75% 50%, #1c080d 0%, #0d0407 60%, #030102 100%);
  color: #FAFAFA;
  overflow: hidden;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

/* Ambient Glow */
.ambient-glow {
  position: absolute;
  top: 30%;
  right: 15%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 42, 95, 0.12) 0%, rgba(60, 166, 255, 0.06) 60%, transparent 100%);
  filter: blur(120px);
  pointer-events: none;
}

/* Top Action Bar */
.top-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 40px;
  z-index: 20;
}

.spacer {
  flex: 1;
}

.btn-home-icon {
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
}

.btn-home-icon:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: #ffffff;
  transform: scale(1.08);
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.35);
}

/* Stage Container: Screen is empty, Canvas positioned Right-Middle */
.stage-container {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: clamp(24px, 6vw, 96px);
  position: relative;
  z-index: 10;
}

.canvas-wrapper {
  position: relative;
  width: clamp(380px, 46vw, 760px);
  height: clamp(280px, 58vh, 560px);
  background: transparent;
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
