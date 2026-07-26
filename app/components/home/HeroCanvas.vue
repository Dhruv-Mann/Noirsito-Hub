<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null

// Mouse tracking with lerp physics
let targetMouseX = 0
let targetMouseY = 0
let currentMouseX = 0
let currentMouseY = 0

// Magnetic rotation values (max 3 degrees)
let rotationX = 0
let rotationY = 0

// Particle structure
interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  alpha: number
  targetAlpha: number
  char?: string
  isPortrait: boolean
}

let particles: Particle[] = []
let backgroundParticles: Particle[] = []
let imageLoaded = false
let assemblyProgress = 0 // 0 to 1 progress of emergence

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return

  let width = (canvas.width = canvas.parentElement?.clientWidth || 600)
  let height = (canvas.height = canvas.parentElement?.clientHeight || 600)

  const handleResize = () => {
    if (!canvas || !canvas.parentElement) return
    width = canvas.width = canvas.parentElement.clientWidth
    height = canvas.height = canvas.parentElement.clientHeight
  }
  window.addEventListener('resize', handleResize)

  // Track mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left - width / 2
    const y = e.clientY - rect.top - height / 2
    targetMouseX = x
    targetMouseY = y
  }
  window.addEventListener('mousemove', handleMouseMove)

  // Create ambient background particles rising from bottom/edges
  const initBackgroundParticles = () => {
    backgroundParticles = []
    const count = 40
    for (let i = 0; i < count; i++) {
      backgroundParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: 0,
        originY: 0,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        size: Math.random() > 0.5 ? 2.5 : 4,
        alpha: Math.random() * 0.35 + 0.1,
        targetAlpha: 0.3,
        isPortrait: false
      })
    }
  }
  initBackgroundParticles()

  // Load Hero_section.png portrait image
  const img = new Image()
  img.src = '/Hero_section.png'
  img.onload = () => {
    imageLoaded = true
    sampleImage(img, width, height)
  }

  // Sample image luminance into dot matrix/ASCII particles
  function sampleImage(image: HTMLImageElement, w: number, h: number) {
    const offCanvas = document.createElement('canvas')
    const offCtx = offCanvas.getContext('2d')
    if (!offCtx) return

    const gridStep = 7 // density step
    const sampleWidth = Math.floor(w * 0.8)
    const sampleHeight = Math.floor(h * 0.8)
    offCanvas.width = sampleWidth
    offCanvas.height = sampleHeight

    offCtx.drawImage(image, 0, 0, sampleWidth, sampleHeight)
    const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight)
    const data = imgData.data

    particles = []
    const startX = (w - sampleWidth) / 2
    const startY = (h - sampleHeight) / 2

    const chars = ['.', ':', 'o', 'x', '*', '#', '%', '@']

    for (let y = 0; y < sampleHeight; y += gridStep) {
      for (let x = 0; x < sampleWidth; x += gridStep) {
        const index = (y * sampleWidth + x) * 4
        const r = data[index]
        const g = data[index + 1]
        const b = data[index + 2]
        const a = data[index + 3]

        // Calculate dark tone luminance (0 = black, 255 = white)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

        // If particle is part of dark features (portrait structure)
        if (a > 50 && luminance < 0.85) {
          const px = startX + x
          const py = startY + y
          const charIndex = Math.floor((1 - luminance) * (chars.length - 1))

          // Initial position starts scattered near bottom or random edge
          const initX = px + (Math.random() - 0.5) * 160
          const initY = h + Math.random() * 100

          particles.push({
            x: initX,
            y: initY,
            originX: px,
            originY: py,
            vx: 0,
            vy: 0,
            size: Math.max(1.5, (1 - luminance) * 3.5),
            alpha: 0,
            targetAlpha: Math.min(0.9, (1 - luminance) * 1.2),
            char: chars[charIndex],
            isPortrait: true
          })
        }
      }
    }
  }

  // Animation Loop
  let startTime: number | null = null

  const render = (time: number) => {
    if (!startTime) startTime = time
    const elapsed = (time - startTime) / 1000

    // Calm assembly progression (0 to 1 over ~2.5s)
    if (assemblyProgress < 1) {
      assemblyProgress = Math.min(1, elapsed / 2.2)
    }

    ctx.clearRect(0, 0, width, height)

    // Smooth Mouse Lerp & 3 degree rotation cap
    currentMouseX += (targetMouseX - currentMouseX) * 0.05
    currentMouseY += (targetMouseY - currentMouseY) * 0.05

    rotationY = (currentMouseX / (width / 2)) * 3 // max 3 deg
    rotationX = -(currentMouseY / (height / 2)) * 3

    // 1. Render Background Dot Grid & Technical Lines
    ctx.strokeStyle = 'rgba(52, 21, 20, 0.06)'
    ctx.lineWidth = 1
    const gridGap = 32
    for (let x = 0; x < width; x += gridGap) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += gridGap) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Soft subtle radial gradients (#AE3B8B and #1C5789 under 10% opacity)
    const glowGrad1 = ctx.createRadialGradient(
      width * 0.3,
      height * 0.3,
      10,
      width * 0.3,
      height * 0.3,
      250
    )
    glowGrad1.addColorStop(0, 'rgba(174, 59, 139, 0.08)')
    glowGrad1.addColorStop(1, 'transparent')
    ctx.fillStyle = glowGrad1
    ctx.fillRect(0, 0, width, height)

    const glowGrad2 = ctx.createRadialGradient(
      width * 0.7,
      height * 0.7,
      10,
      width * 0.7,
      height * 0.7,
      280
    )
    glowGrad2.addColorStop(0, 'rgba(28, 87, 137, 0.08)')
    glowGrad2.addColorStop(1, 'transparent')
    ctx.fillStyle = glowGrad2
    ctx.fillRect(0, 0, width, height)

    // 2. Render Sparse Ambient Rising Particles with magnetic mouse drift
    backgroundParticles.forEach(p => {
      p.y += p.vy
      p.x += p.vx

      // Reset to bottom when rising past top
      if (p.y < -10) {
        p.y = height + 10
        p.x = Math.random() * width
      }

      // Magnetic attraction toward cursor
      const dx = targetMouseX + width / 2 - p.x
      const dy = targetMouseY + height / 2 - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 180) {
        p.x += (dx / dist) * 0.6
        p.y += (dy / dist) * 0.6
      }

      ctx.fillStyle = '#341514'
      ctx.globalAlpha = p.alpha * assemblyProgress
      ctx.fillRect(p.x, p.y, p.size, p.size)
    })

    // 3. Render Portrait Assembly Matrix
    if (imageLoaded && particles.length > 0) {
      // Calculate rotation offset for 3D tilt tracking cursor
      const radY = (rotationY * Math.PI) / 180
      const radX = (rotationX * Math.PI) / 180

      const centerX = width / 2
      const centerY = height / 2

      ctx.font = '10px monospace'
      ctx.textAlign = 'center'

      particles.forEach((p, idx) => {
        // Ease position from initial scattered state to target origin
        const ease = Math.min(1, Math.max(0, (assemblyProgress - idx * 0.0001) * 1.5))
        if (ease <= 0) return

        const targetX = p.originX + Math.sin(radY) * (p.originY - centerY) * 0.08
        const targetY = p.originY + Math.sin(radX) * (p.originX - centerX) * 0.08

        p.x += (targetX - p.x) * 0.08 * ease
        p.y += (targetY - p.y) * 0.08 * ease

        const currentAlpha = p.targetAlpha * ease

        // Radial Vignette Dissolve: Dissolve outer edges softly into pink background
        const distFromCenter = Math.sqrt(
          Math.pow(p.originX - centerX, 2) + Math.pow(p.originY - centerY, 2)
        )
        const maxRadius = Math.min(width, height) * 0.42
        let fadeAlpha = 1
        if (distFromCenter > maxRadius * 0.6) {
          fadeAlpha = Math.max(0, 1 - (distFromCenter - maxRadius * 0.6) / (maxRadius * 0.4))
        }

        ctx.fillStyle = '#341514'
        ctx.globalAlpha = currentAlpha * fadeAlpha

        if (idx % 2 === 0) {
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
        } else if (p.char) {
          ctx.fillText(p.char, p.x, p.y)
        }
      })
    }

    ctx.globalAlpha = 1
    animationFrameId = requestAnimationFrame(render)
  }

  animationFrameId = requestAnimationFrame(render)

  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
  })
})
</script>

<template>
  <div class="hero-canvas-container">
    <canvas ref="canvasRef" class="procedural-canvas" />
  </div>
</template>

<style scoped>
.hero-canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.procedural-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
