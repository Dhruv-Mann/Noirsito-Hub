<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PixelMatrixCanvas from './PixelMatrixCanvas.vue'
import FractalTree from './FractalTree.vue'
import LissajousOrbit from './LissajousOrbit.vue'
import { useSystemState } from '~/composables/useSystemState'

const { isStarted, isAssembled, triggerInitialization } = useSystemState()

const tiltX = ref(0)
const tiltY = ref(0)
const mousePctX = ref(50)
const mousePctY = ref(50)

const handleSingleClick = () => {
  triggerInitialization()
}

function handleMouseMove(e: MouseEvent) {
  if (typeof window === 'undefined') return
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  
  // 3D perspective rotational tilt (-4.5deg to +4.5deg)
  tiltX.value = -((e.clientY - cy) / cy) * 4.5
  tiltY.value = ((e.clientX - cx) / cx) * 4.5

  // Calculate cursor background percentage for ambient spotlight mesh
  mousePctX.value = Math.round((e.clientX / window.innerWidth) * 100)
  mousePctY.value = Math.round((e.clientY / window.innerHeight) * 100)
}

onMounted(() => {
  window.addEventListener('click', handleSingleClick)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('click', handleSingleClick)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section 
    class="hero-stage" 
    :style="{
      '--mouse-pct-x': `${mousePctX}%`,
      '--mouse-pct-y': `${mousePctY}%`
    }"
    @click="triggerInitialization"
  >
    <!-- Pixel Matrix Canvas: #341514 screen base, #AE3B8B pixels emerge on click -->
    <PixelMatrixCanvas :is-started="isStarted" />

    <!-- Ambient Dynamic Color Spotlight Mesh (Only visible on initial prompt page before click) -->
    <Transition name="fade">
      <div v-if="!isStarted" class="ambient-mesh" aria-hidden="true" />
    </Transition>

    <!-- Big Background Lissajous Harmonic Orbit (Freezes & Expands smoothly over 2.88s on click) -->
    <div class="initial-lissajous-backdrop" :class="{ expanding: isStarted }" aria-hidden="true">
      <LissajousOrbit :is-started="isStarted" />
    </div>

    <div class="container hero-content-container">
      <div 
        id="hero-text-block" 
        class="hero-text-block" 
        :class="{ Assembled: isAssembled }"
        :style="{ transform: isAssembled ? `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` : undefined }"
      >
        <!-- Stacked Name Heading with Metallic Shimmer Reveal & Animated Fractal Tree -->
        <h1 class="main-name-heading font-display">
          <!-- Line 1: Dhruv with Animated Fractal Tree placed right after -->
          <span class="first-name">
            <span class="first-name-text">Dhruv</span>
            <FractalTree />
          </span>
          <!-- Line 2: Mann (Bright Pink) with aka Noirsito tag -->
          <span class="last-name">
            <span class="name-text">Mann</span>
            <span class="aka-tag font-mono">aka Noirsito</span>
          </span>
        </h1>

        <!-- Meta Block: Head to Hub Button with Inner Text Scroll Animation -->
        <div class="meta-block">
          <a 
            href="https://github.com/Dhruv-Mann" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-hub font-body"
          >
            <span class="btn-hub-scroll">
              <span class="btn-hub-text btn-hub-default">
                <span>Head to Hub</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="btn-hub-text btn-hub-hover" aria-hidden="true">
                <span>Head to Hub</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-stage {
  position: relative;
  height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  overflow: hidden;
  background-color: #341514;
}

/* Ambient Dynamic Color Spotlight Mesh */
.ambient-mesh {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(
    600px circle at var(--mouse-pct-x, 50%) var(--mouse-pct-y, 50%),
    rgba(174, 59, 139, 0.18) 0%,
    rgba(225, 120, 136, 0.07) 40%,
    transparent 80%
  );
  transition: opacity 0.8s var(--ease-out);
}

/* Big Background Lissajous Orbit behind prompt button */
.initial-lissajous-backdrop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  z-index: 4;
  pointer-events: none;
  opacity: 0.5;
  transition: transform 2.88s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 2.88s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.initial-lissajous-backdrop.expanding {
  transform: translate(-50%, -50%) scale(9.5);
  opacity: 0;
}

.hero-content-container {
  position: relative;
  z-index: 10;
  width: 100%;
  pointer-events: none;
  padding-top: 20px;
}

.hero-text-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 880px;
  pointer-events: auto;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

/* Main Name Heading — Hidden until user clicks to initialize */
.main-name-heading {
  font-size: clamp(4.25rem, 9.5vw, 7.25rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.04em;
  margin-bottom: var(--space-phi-md);
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

/* Line 1: Dhruv in Luminous Pure White & Metallic Champagne Shimmer Gradient */
.first-name {
  display: inline-flex;
  align-items: center;
  gap: 20px;
}

.first-name-text {
  display: inline-block;
  color: #ffffff;
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
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5));
  animation: metallic-shimmer 6s ease-in-out infinite alternate;
  transition: filter 0.3s ease;
}

@keyframes metallic-shimmer {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.first-name-text:hover {
  filter: drop-shadow(0 0 32px rgba(245, 184, 209, 0.85));
}

/* Line 2: Mann in Bright Pink (#AE3B8B), starting halfway across Dhruv */
.last-name {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #AE3B8B;
  margin-left: 2.2ch;
  margin-top: 4px;
  flex-wrap: wrap;
}

.name-text {
  color: #AE3B8B;
  transition: text-shadow 0.3s ease, color 0.3s ease;
}

.name-text:hover {
  color: #ffffff;
  text-shadow: 0 0 32px rgba(174, 59, 139, 0.9), 0 0 60px rgba(174, 59, 139, 0.6);
}

/* aka Noirsito Tag (Dusty Pink / Espresso) */
.aka-tag {
  display: inline-flex;
  align-items: center;
  font-size: clamp(0.75rem, 1.2vw, 0.9375rem);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #E17888;
  background-color: rgba(174, 59, 139, 0.2);
  border: 1px solid rgba(174, 59, 139, 0.45);
  padding: 4px 14px;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  vertical-align: middle;
  transition: all 0.3s var(--ease-out);
}

.aka-tag:hover {
  color: #ffffff;
  background-color: #AE3B8B;
  border-color: #AE3B8B;
  box-shadow: 0 4px 20px rgba(174, 59, 139, 0.6);
  transform: translateY(-2px) scale(1.04);
}

/* Meta Block with Head to Hub button — Hidden until user clicks to initialize */
.meta-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2.2ch;
  margin-top: var(--space-phi-sm);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-text-block.Assembled .meta-block {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.35s;
}

/* Head to Hub Button — Vertical Inner Scroll Animation on Hover */
.btn-hub {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 46px;
  padding: 0 var(--space-phi-lg);
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  background-color: #AE3B8B;
  color: #ffffff;
  border: 1px solid #AE3B8B;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden; /* Restricts scroll animation inside button bounds only */
  box-shadow: 0 4px 20px rgba(174, 59, 139, 0.4);
  transition: border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hub-scroll {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
}

.btn-hub-text {
  display: inline-flex;
  align-items: center;
  gap: var(--space-phi-sm);
  height: 100%;
  white-space: nowrap;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hub-default {
  transform: translateY(0%);
}

.btn-hub-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
  color: #ffffff;
}

/* Hover Action: Vertical inner text scroll and switch to Pitch Black */
.btn-hub:hover {
  background-color: #000000;
  border-color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.7);
}

.btn-hub:hover .btn-hub-default {
  transform: translateY(-100%);
}

.btn-hub:hover .btn-hub-hover {
  transform: translateY(0%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s var(--ease-out);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
