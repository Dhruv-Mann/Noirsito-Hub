<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PixelMatrixCanvas from './PixelMatrixCanvas.vue'

const isStarted = ref(false)
const isAssembled = ref(false)

function triggerInitialization() {
  if (isStarted.value) return
  isStarted.value = true
  isAssembled.value = true
}

onMounted(() => {
  // Single global click listener: A single click anywhere initializes canvas & text simultaneously
  const handleSingleClick = () => {
    triggerInitialization()
  }
  window.addEventListener('click', handleSingleClick)

  onUnmounted(() => {
    window.removeEventListener('click', handleSingleClick)
  })
})
</script>

<template>
  <section class="hero-stage" @click="triggerInitialization">
    <!-- Pixel Matrix Canvas: Starts on #341514 screen with jumping cursor prompt. 
         A single click anywhere initializes canvas emergence and text reveal simultaneously. 
         Strict 120px text/button keep-away buffer. -->
    <PixelMatrixCanvas :is-started="isStarted" />

    <div class="container hero-content-container">
      <div id="hero-text-block" class="hero-text-block" :class="{ Assembled: isAssembled }">
        <!-- 1. Dhruv Mann: Golden Ratio Largest Text Hierarchy (Phi^4 scale = 6.854rem / 109.7px) -->
        <h1 class="main-name-heading font-display">
          Dhruv Mann
        </h1>

        <!-- 2. Info about Dhruv: Golden Ratio Vertical Rhythm -->
        <div class="info-block">
          <p class="role-tag font-mono">
            B.Tech Student & Systems Architect
          </p>

          <p class="info-paragraph body-text">
            Building low-latency vector databases, browser compute engines, spatial visualization tools, and resilient distributed worker architectures.
          </p>

          <div class="hero-actions">
            <NuxtLink to="/projects" class="btn btn-primary font-body">
              Explore Projects
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-secondary font-body">
              About & Stack
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-stage {
  position: relative;
  min-height: calc(100dvh - 64px);
  width: 100%;
  display: flex;
  align-items: center;
  padding: var(--space-phi-xl) 0;
  overflow: hidden;
  background-color: #341514;
  cursor: pointer;
}

.hero-content-container {
  position: relative;
  z-index: 2;
  width: 100%;
  pointer-events: none; /* Let single click pass to stage */
}

.hero-text-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 840px;
  pointer-events: auto; /* Re-enable pointer events for text and buttons */
}

/* Golden Ratio Main Heading (Phi^3 to Phi^4: 67.8px - 109.7px) */
.main-name-heading {
  font-size: clamp(4.236rem, 9vw, 6.854rem);
  font-weight: 800;
  line-height: 1.058;
  letter-spacing: -0.04em;
  color: #ffffff;
  margin-bottom: var(--space-phi-lg);
  opacity: 0;
  transform: translateY(30px) scale(0.98);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-text-block.Assembled .main-name-heading {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.15s;
}

.info-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-phi-md);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-text-block.Assembled .info-block {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.35s;
}

.role-tag {
  font-size: var(--text-phi-xs); /* 0.618rem */
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #AE3B8B;
  background: rgba(174, 59, 139, 0.15);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(174, 59, 139, 0.35);
  align-self: flex-start;
}

.info-paragraph {
  font-size: 1.125rem;
  line-height: 1.618; /* Golden Ratio line height */
  color: #E17888;
  max-width: 54ch;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: var(--space-phi-md);
  margin-top: var(--space-phi-lg);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-phi-sm);
  height: 48px;
  padding: 0 var(--space-phi-lg);
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-out);
}

.btn-primary {
  background-color: #AE3B8B;
  color: #ffffff;
  border: 1px solid #AE3B8B;
}

.btn-primary:hover {
  background-color: #c4479e;
  border-color: #c4479e;
  box-shadow: 0 4px 20px rgba(174, 59, 139, 0.4);
}

.btn-secondary {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid rgba(225, 120, 136, 0.4);
}

.btn-secondary:hover {
  background-color: rgba(225, 120, 136, 0.12);
  border-color: #E17888;
}
</style>
