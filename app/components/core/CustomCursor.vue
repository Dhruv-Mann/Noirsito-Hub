<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(-100)
const cursorY = ref(-100)
const followerX = ref(-100)
const followerY = ref(-100)
const isHovered = ref(false)
const isClicked = ref(false)

let animationFrameId: number | null = null

function updateCursorPosition(e: MouseEvent) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY

  // Check if hovering over interactive elements
  const target = e.target as HTMLElement | null
  const interactiveEl = target?.closest('a, button, [data-cursor-hover], .btn-hub, .aka-tag, .cmd-k-trigger')
  
  if (interactiveEl) {
    isHovered.value = true
  } else {
    isHovered.value = false
  }
}

function handleMouseDown() {
  isClicked.value = true
}

function handleMouseUp() {
  isClicked.value = false
}

function animateFollower() {
  // Smooth spring follower interpolation
  followerX.value += (cursorX.value - followerX.value) * 0.18
  followerY.value += (cursorY.value - followerY.value) * 0.18

  animationFrameId = requestAnimationFrame(animateFollower)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('mousemove', updateCursorPosition)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  animationFrameId = requestAnimationFrame(animateFollower)
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('mousemove', updateCursorPosition)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="custom-cursor-container">
    <!-- Center Dot -->
    <div
      class="cursor-dot"
      :class="{ hovered: isHovered, clicked: isClicked }"
      :style="{ transform: `translate3d(${cursorX}px, ${cursorY}px, 0)` }"
    />

    <!-- Trailing Spring Ring -->
    <div
      class="cursor-follower"
      :class="{ hovered: isHovered, clicked: isClicked }"
      :style="{ transform: `translate3d(${followerX}px, ${followerY}px, 0)` }"
    />
  </div>
</template>

<style scoped>
.custom-cursor-container {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 99999;
}

.cursor-dot {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(174, 59, 139, 0.6);
  transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease, transform 0.02s linear;
  will-change: transform;
}

.cursor-dot.hovered {
  width: 12px;
  height: 12px;
  top: -6px;
  left: -6px;
  background-color: #AE3B8B;
  box-shadow: 0 0 14px rgba(174, 59, 139, 0.9);
}

.cursor-dot.clicked {
  transform: scale(0.6);
}

.cursor-follower {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border: 1.5px solid rgba(225, 120, 136, 0.4);
  border-radius: 50%;
  background: rgba(174, 59, 139, 0.05);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              top 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              left 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.25s ease,
              background-color 0.25s ease;
  will-change: transform;
}

.cursor-follower.hovered {
  top: -24px;
  left: -24px;
  width: 48px;
  height: 48px;
  border-color: #AE3B8B;
  background: rgba(174, 59, 139, 0.15);
  box-shadow: 0 0 24px rgba(174, 59, 139, 0.35);
}

.cursor-follower.clicked {
  transform: scale(0.85);
}

@media (pointer: coarse) {
  .custom-cursor-container {
    display: none;
  }
}
</style>
