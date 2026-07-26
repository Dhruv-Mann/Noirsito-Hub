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

const handleSingleClick = () => {
  triggerInitialization()
}

onMounted(() => {
  window.addEventListener('click', handleSingleClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleSingleClick)
})
</script>

<template>
  <section class="hero-stage" @click="triggerInitialization">
    <!-- Pixel Matrix Canvas: #341514 screen base, #AE3B8B pixels emerge on click -->
    <PixelMatrixCanvas :is-started="isStarted" />

    <div class="container hero-content-container">
      <div id="hero-text-block" class="hero-text-block" :class="{ Assembled: isAssembled }">
        <!-- Stacked Name Heading -->
        <h1 class="main-name-heading font-display">
          <!-- Line 1: Dhruv (Pitch Black) -->
          <span class="first-name">Dhruv</span>
          <!-- Line 2: Mann (Bright Pink) with aka Noirsito tag -->
          <span class="last-name">
            <span class="name-text">Mann</span>
            <span class="aka-tag font-mono">aka Noirsito</span>
          </span>
        </h1>

        <!-- Meta Block: Head to Hub Button -->
        <div class="meta-block">
          <a 
            href="https://github.com/Dhruv-Mann" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-hub font-body"
          >
            Head to Hub
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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
  cursor: pointer;
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

/* Line 1: Dhruv in Pitch Black */
.first-name {
  display: block;
  color: #000000;
  text-shadow: none;
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

/* Head to Hub Small Button */
.btn-hub {
  display: inline-flex;
  align-items: center;
  gap: var(--space-phi-sm);
  height: 44px;
  padding: 0 var(--space-phi-lg);
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  background-color: #AE3B8B;
  color: #ffffff;
  border: 1px solid #AE3B8B;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(174, 59, 139, 0.4);
  transition: all var(--duration-fast) var(--ease-out);
}

.btn-hub:hover {
  background-color: #c4479e;
  border-color: #c4479e;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(174, 59, 139, 0.6);
}
</style>
