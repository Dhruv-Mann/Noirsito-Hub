<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const fps = ref(60)
let lastFrameTime = performance.now()
let frameCount = 0
let animId: number | null = null

function calcFPS(now: number) {
  frameCount++
  if (now >= lastFrameTime + 1000) {
    fps.value = Math.round((frameCount * 1000) / (now - lastFrameTime))
    frameCount = 0
    lastFrameTime = now
  }
  animId = requestAnimationFrame(calcFPS)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    animId = requestAnimationFrame(calcFPS)
  }
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<template>
  <div class="system-status-badge font-mono">
    <span class="status-pulse" />
    <span class="status-fps">{{ fps }} FPS</span>
  </div>
</template>

<style scoped>
.system-status-badge {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(45, 17, 16, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(174, 59, 139, 0.4);
  color: #E17888;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 14px rgba(174, 59, 139, 0.2);
  transition: all var(--duration-fast) var(--ease-out);
}

.system-status-badge:hover {
  border-color: #AE3B8B;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(174, 59, 139, 0.4);
}

.status-pulse {
  width: 7px;
  height: 7px;
  background-color: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ff88;
  animation: pulse-green 1.8s infinite ease-in-out;
}

.status-fps {
  color: #ffffff;
  font-weight: 700;
}

@keyframes pulse-green {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.3);
  }
}
</style>
