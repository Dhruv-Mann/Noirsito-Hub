<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePageTransition } from '~/composables/usePageTransition'

const props = defineProps<{
  activeTab?: 'home' | 'tech-stack' | 'projects'
  isReadPage?: boolean
  accentColor?: string
  surfaceBg?: string
}>()

const route = useRoute()
const router = useRouter()
const { resetPinkSweep } = usePageTransition()

const isHovered = ref(false)

const isProjectRead = computed(() => {
  return props.isReadPage || (route.path.startsWith('/projects/') && route.path !== '/projects')
})

const customIslandStyle = computed(() => {
  if (!isProjectRead.value && !props.accentColor) return {}
  const accent = props.accentColor || '#FAAA48'
  const bg = props.surfaceBg || '#2F0F03'

  return {
    '--island-accent': accent,
    '--island-bg': bg
  }
})

const currentTitle = computed(() => {
  if (props.activeTab === 'projects') return 'PROJECTS'
  if (props.activeTab === 'tech-stack') return 'TECH STACK'
  return 'HUB'
})

function navigateToHome() {
  if (props.activeTab === 'home') return
  resetPinkSweep()
  router.push('/')
}

function navigateToTechStack() {
  if (props.activeTab === 'tech-stack') return
  resetPinkSweep()
  router.push('/hub')
}

function navigateToProjects() {
  if (props.activeTab === 'projects') return
  resetPinkSweep()
  router.push('/projects')
}

function triggerCmdPalette() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
}
</script>

<template>
  <div
    class="dynamic-island-wrapper font-mono select-none"
    :class="{ expanded: isHovered, 'custom-theme': isProjectRead }"
    :style="customIslandStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Collapsed Pill Header State -->
    <Transition name="fade-fast" mode="out-in">
      <div v-if="!isHovered" key="collapsed" class="island-collapsed-content">
        <span class="pulse-dot" />
        <span class="island-title">{{ currentTitle }}</span>
        <svg class="chevron-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Expanded Navigation Options -->
      <div v-else key="expanded" class="island-expanded-content">
        <button
          class="island-nav-btn"
          :class="{ active: activeTab === 'home' }"
          @click="navigateToHome"
        >
          <span class="btn-prefix">01</span>
          <span class="btn-label">HOME</span>
        </button>

        <button
          class="island-nav-btn"
          :class="{ active: activeTab === 'tech-stack' }"
          @click="navigateToTechStack"
        >
          <span class="btn-prefix">02</span>
          <span class="btn-label">STACK</span>
        </button>

        <button
          class="island-nav-btn"
          :class="{ active: activeTab === 'projects' }"
          @click="navigateToProjects"
        >
          <span class="btn-prefix">03</span>
          <span class="btn-label">PROJECTS</span>
        </button>

        <button
          class="island-nav-btn"
          @click="triggerCmdPalette"
        >
          <span class="btn-prefix">04</span>
          <span class="btn-label">COMMANDS</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dynamic-island-wrapper {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 900;
  background: #1E0713;
  border: 1px solid rgba(190, 44, 85, 0.4);
  border-radius: 28px;
  height: 42px;
  width: 172px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px rgba(190, 44, 85, 0.2);
  transition: width 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.25),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  overflow: hidden;
}

.dynamic-island-wrapper.expanded {
  width: 460px;
  border-color: #BE2C55;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.9), 0 0 30px rgba(190, 44, 85, 0.35);
  padding: 0 10px;
}

.island-collapsed-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #FFE0EB;
  font-size: 0.78125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  white-space: nowrap;
  width: 100%;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #FF2A5F;
  box-shadow: 0 0 10px #FF2A5F, 0 0 16px rgba(255, 42, 95, 0.8);
  animation: pulse-glow 2s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.chevron-icon {
  color: #FF2A5F;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.island-expanded-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 6px;
}

.island-nav-btn {
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 224, 235, 0.7);
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.island-nav-btn:hover {
  background: rgba(190, 44, 85, 0.25);
  color: #FFE0EB;
  border-color: rgba(190, 44, 85, 0.5);
}

.island-nav-btn.active {
  background: #BE2C55;
  border-color: #BE2C55;
  color: #FFE0EB;
}

.btn-prefix {
  color: #FFE0EB;
  font-size: 0.65rem;
  opacity: 0.8;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.15s ease;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .dynamic-island-wrapper.expanded {
    width: 92vw;
  }

  .btn-prefix {
    display: none;
  }
}

/* ==========================================================================
   Dynamic Project Read Detail Page Theme (High-Contrast Dark Adaptive)
   ========================================================================== */
.dynamic-island-wrapper.custom-theme {
  background: var(--island-bg, rgba(26, 10, 9, 0.92));
  border: 1px solid var(--island-accent, #AE3B8B);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3);
}

.dynamic-island-wrapper.custom-theme.expanded {
  border-color: var(--island-accent, #AE3B8B);
  box-shadow: 0 14px 44px rgba(0, 0, 0, 0.6);
}

.dynamic-island-wrapper.custom-theme .island-collapsed-content {
  color: #FFFFFF;
}

.dynamic-island-wrapper.custom-theme .pulse-dot {
  background-color: var(--island-accent, #AE3B8B);
  box-shadow: 0 0 8px var(--island-accent, #AE3B8B);
}

.dynamic-island-wrapper.custom-theme .chevron-icon {
  color: var(--island-accent, #AE3B8B);
}

.dynamic-island-wrapper.custom-theme .island-nav-btn {
  color: #E5D5D5;
  font-weight: 700;
  border-color: rgba(255, 255, 255, 0.1);
}

.dynamic-island-wrapper.custom-theme .island-nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border-color: var(--island-accent, #AE3B8B);
}

.dynamic-island-wrapper.custom-theme .island-nav-btn.active {
  background: var(--island-accent, #AE3B8B);
  border-color: var(--island-accent, #AE3B8B);
  color: #FFFFFF;
}

.dynamic-island-wrapper.custom-theme .btn-prefix {
  color: var(--island-accent, #AE3B8B);
  opacity: 1;
  font-weight: 800;
}

.dynamic-island-wrapper.custom-theme .island-nav-btn.active .btn-prefix {
  color: #FFFFFF;
  opacity: 0.9;
}
</style>
