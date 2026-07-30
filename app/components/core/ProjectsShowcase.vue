<script setup lang="ts">
import { ref, computed } from 'vue'
import DynamicIslandNav from './DynamicIslandNav.vue'

interface Project {
  id: string
  title: string
  subtitle: string
  status: 'PRODUCTION' | 'OPEN SOURCE' | 'RESEARCH'
  category: 'AI / ML' | 'FULL STACK' | 'SYSTEMS & C++'
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  telemetryBadge: string
  image: string
}

const activeCategory = ref<'ALL' | 'AI / ML' | 'FULL STACK' | 'SYSTEMS & C++'>('ALL')
const isFolderOpen = ref(false)
const hoverFolder = ref(false)
const hoveredCardId = ref<string | null>(null)

// Drag tracking for closing folder
const dragStartY = ref<number | null>(null)
const dragOffsetY = ref<number>(0)
const isDragging = ref(false)

const projects: Project[] = [
  {
    id: 'filemind',
    title: 'FileMind AI',
    subtitle: 'Autonomous Local File Intelligence & Context Engine',
    status: 'PRODUCTION',
    category: 'AI / ML',
    description: 'Local document intelligence engine that indexes, vectors, and analyzes unstructured files with zero external API leaks.',
    techStack: ['Python', 'TypeScript', 'PyTorch', 'Vector DB', 'Electron'],
    githubUrl: 'https://github.com/Dhruv-Mann/filemind',
    demoUrl: 'https://github.com/Dhruv-Mann/filemind',
    telemetryBadge: 'AI FILE INTELLIGENCE',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'eve-framework',
    title: 'Eve AI Framework',
    subtitle: 'Durable Agent Orchestration & Subagent Pipelines',
    status: 'OPEN SOURCE',
    category: 'AI / ML',
    description: 'Durable multi-agent AI framework for building background subagents with tool calling, cron timers, and sandboxing.',
    techStack: ['TypeScript', 'Node.js', 'Bun', 'PyTorch', 'Docker'],
    githubUrl: 'https://github.com/Dhruv-Mann',
    telemetryBadge: 'AUTONOMOUS SUBAGENTS',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'simd-vector-engine',
    title: 'SIMD Vector Engine',
    subtitle: 'C++20 AVX-512 Embeddings ANN Retrieval Engine',
    status: 'RESEARCH',
    category: 'SYSTEMS & C++',
    description: 'Ultra-fast vector embeddings search engine utilizing C++20 AVX2/AVX-512 SIMD vectorization with zero-copy Python bindings.',
    techStack: ['C++20', 'SIMD', 'Python', 'PyTorch', 'CMake'],
    githubUrl: 'https://github.com/Dhruv-Mann',
    telemetryBadge: '0.42ms ANN RETRIEVAL',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'better-auth-saas',
    title: 'Better-Auth SaaS Engine',
    subtitle: 'Multi-Tenant Auth & Dodo Payments Credit Billing',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'SaaS foundation with multi-tenant auth, Appwrite document storage, Dodo Payments metered credit ledger, and Nitro API.',
    techStack: ['Nuxt 4', 'Better-Auth', 'Appwrite', 'PostgreSQL', 'Dodo Payments'],
    githubUrl: 'https://github.com/Dhruv-Mann',
    telemetryBadge: 'ENTERPRISE SAAS LEDGER',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop'
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'ALL') return projects
  return projects.filter(p => p.category === activeCategory.value)
})

function getCardStyle(index: number, total: number) {
  const offset = index - (total - 1) / 2

  if (!isFolderOpen.value) {
    const stackY = hoverFolder.value ? offset * -12 - 45 : offset * -6
    const stackX = hoverFolder.value ? offset * 36 : offset * 4
    const stackRotate = hoverFolder.value ? offset * 8 : offset * 3.5
    const stackScale = 1 - Math.abs(offset) * 0.03

    return {
      transform: `translate3d(${stackX}px, ${stackY}px, 0px) rotate(${stackRotate}deg) scale(${stackScale})`,
      zIndex: index + 10,
      opacity: 1
    }
  } else {
    // Open Folder Spread Layout
    const openY = -140 + (isDragging.value ? dragOffsetY.value * 0.5 : 0)
    // Spaced evenly across stage
    const spacing = total <= 3 ? 200 : 170
    const openX = offset * spacing
    const openRotate = offset * 2.5
    const openScale = 1.04

    return {
      transform: `translate3d(${openX}px, ${openY}px, 0px) rotate(${openRotate}deg) scale(${openScale})`,
      zIndex: hoveredCardId.value === filteredProjects.value[index].id ? 100 : index + 10,
      opacity: 1
    }
  }
}

// Drag down to close pointer handlers
function handlePointerDown(e: PointerEvent) {
  if (!isFolderOpen.value) return
  dragStartY.value = e.clientY
  dragOffsetY.value = 0
  isDragging.value = true
}

function handlePointerMove(e: PointerEvent) {
  if (!isDragging.value || dragStartY.value === null) return
  const diff = e.clientY - dragStartY.value
  if (diff > 0) {
    dragOffsetY.value = diff
  }
}

function handlePointerUp() {
  if (!isDragging.value) return
  if (dragOffsetY.value > 80) {
    isFolderOpen.value = false
    hoverFolder.value = false
  }
  dragStartY.value = null
  dragOffsetY.value = 0
  isDragging.value = false
}

function toggleFolder() {
  if (isFolderOpen.value) {
    isFolderOpen.value = false
    hoverFolder.value = false
  } else {
    isFolderOpen.value = true
  }
}
</script>

<template>
  <div
    class="projects-showcase font-body select-none"
    :class="{ 'crimson-active': hoverFolder || hoveredCardId !== null }"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerUp"
  >
    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav active-tab="projects" />

    <!-- Full Background Dithered Overlay (Single Viewport Fitted) -->
    <div
      class="dither-bg-layer"
      :class="{ 'fade-out': hoverFolder || hoveredCardId !== null || isFolderOpen }"
      aria-hidden="true"
    >
      <img src="/INTENSIFY_dithered.png" alt="" class="dither-img" />
    </div>

    <!-- #BE2C55 Crimson Background Takeover Overlay Layer -->
    <div
      class="crimson-bg-takeover"
      :class="{ active: hoverFolder || hoveredCardId !== null || isFolderOpen }"
      aria-hidden="true"
    />

    <!-- Single Page Fixed Stage Container -->
    <div class="projects-stage-wrapper">
      <!-- Top Section Header & Filters -->
      <header class="section-header">
        <h1 class="projects-title font-display">
          <span class="word-blush">ENGINEERING</span>
          <span class="word-crimson">PROJECTS</span>
        </h1>
        <div class="crimson-divider-line" />

        <!-- Category Filter Pills -->
        <div class="category-filters font-mono">
          <button
            v-for="cat in ['ALL', 'AI / ML', 'FULL STACK', 'SYSTEMS & C++']"
            :key="cat"
            class="filter-tab"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat as any"
          >
            <span class="filter-slash">/</span>
            <span>{{ cat }}</span>
          </button>
        </div>
      </header>

      <!-- INTERACTIVE FOLDER GALLERY STAGE -->
      <div class="folder-gallery-viewport">
        <div class="folder-stage-container">
          
          <!-- Back Folder Wall Container -->
          <div
            class="folder-back-wall"
            :class="{ 'open-hidden': isFolderOpen }"
          >
            <!-- Folder Top Tab Header -->
            <div class="folder-tab-top font-mono">
              <span>PROJECTS.gallery</span>
            </div>
            <!-- Folder Back Surface Body -->
            <div class="folder-back-body" />
          </div>

          <!-- Project Photo / Card Stack Layer -->
          <div class="folder-cards-stack-layer">
            <article
              v-for="(proj, i) in filteredProjects"
              :key="proj.id"
              class="folder-project-card font-body"
              :class="{ 
                'is-open-card': isFolderOpen,
                'is-hovered-card': hoveredCardId === proj.id
              }"
              :style="getCardStyle(i, filteredProjects.length)"
              @mouseenter="hoveredCardId = proj.id"
              @mouseleave="hoveredCardId = null"
              @pointerdown="handlePointerDown"
            >
              <!-- Card Image Header -->
              <div class="card-media-wrapper">
                <img :src="proj.image" :alt="proj.title" class="card-preview-img" />
                <div class="card-media-overlay" />
                <span class="card-badge font-mono">{{ proj.telemetryBadge }}</span>
              </div>

              <!-- Card Content Body -->
              <div class="card-content font-body">
                <div class="card-top-meta font-mono">
                  <span class="status-indicator">● {{ proj.status }}</span>
                  <span class="cat-tag">[ {{ proj.category }} ]</span>
                </div>

                <h3 class="card-title font-display">{{ proj.title }}</h3>
                <p class="card-subtitle font-mono">{{ proj.subtitle }}</p>
                <p class="card-description">{{ proj.description }}</p>

                <!-- Tech Stack Pills -->
                <div class="card-tech-pills font-mono">
                  <span v-for="t in proj.techStack" :key="t" class="tech-pill">
                    {{ t }}
                  </span>
                </div>

                <!-- Direct Action Buttons Bar -->
                <div class="card-actions-row font-mono">
                  <a
                    :href="proj.githubUrl"
                    target="_blank"
                    rel="noopener"
                    class="action-btn primary-action"
                    @click.stop
                  >
                    <span>GITHUB REPO</span>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                  <a
                    v-if="proj.demoUrl"
                    :href="proj.demoUrl"
                    target="_blank"
                    rel="noopener"
                    class="action-btn secondary-action"
                    @click.stop
                  >
                    <span>LIVE SYSTEM</span>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <!-- Interactive Folder Front Flap Cover -->
          <div
            class="folder-front-flap"
            :class="{ 
              'flap-hovered': hoverFolder && !isFolderOpen,
              'flap-open': isFolderOpen 
            }"
            @mouseenter="hoverFolder = true"
            @mouseleave="hoverFolder = false"
            @click="toggleFolder"
          >
            <div class="flap-body">
              <div class="flap-shine-line" />
              <div class="flap-badge-box font-mono">
                <span class="flap-folder-icon">📁</span>
                <span class="flap-folder-title">Engineering Projects</span>
                <span class="flap-count-tag">[{{ filteredProjects.length }} ITEMS]</span>
              </div>
              <div class="flap-click-prompt font-mono">
                <span>CLICK TO OPEN FOLDER GALLERY</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Drag or Click to Close Hint Badge -->
        <div
          class="drag-hint-badge font-mono"
          :class="{ visible: isFolderOpen }"
          @click="toggleFolder"
        >
          <span>DRAG DOWN OR CLICK TO CLOSE FOLDER</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.projects-showcase {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #050507;
  color: #FFE0EB;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 80px;
  padding-bottom: 24px;
}

/* Background Dither Overlay — Single Viewport Fitted */
.dither-bg-layer {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  opacity: 0.85;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #050507;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.dither-bg-layer.fade-out {
  opacity: 0;
}

.dither-img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  mix-blend-mode: screen;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* Crimson Overlay Takeover */
.crimson-bg-takeover {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #BE2C55;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.crimson-bg-takeover.active {
  opacity: 1;
}

/* Single Page Fixed Stage Container */
.projects-stage-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

/* Section Header */
.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.projects-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: 0.06em;
  margin: 0;
  display: flex;
  gap: 12px;
}

.word-blush {
  color: #FFE0EB;
}

.word-crimson {
  color: #BE2C55;
}

.crimson-divider-line {
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #BE2C55, transparent);
}

/* Category Filter Pills */
.category-filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.filter-tab {
  background: rgba(30, 7, 19, 0.6);
  border: 1px solid rgba(190, 44, 85, 0.3);
  color: rgba(255, 224, 235, 0.7);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.25s ease;
}

.filter-tab:hover {
  background: rgba(190, 44, 85, 0.25);
  border-color: #BE2C55;
  color: #FFE0EB;
}

.filter-tab.active {
  background: #BE2C55;
  border-color: #BE2C55;
  color: #ffffff;
}

.filter-slash {
  color: #BE2C55;
  font-weight: 800;
}

.filter-tab.active .filter-slash {
  color: #ffffff;
}

/* INTERACTIVE FOLDER GALLERY VIEWPORT */
.folder-gallery-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 24px;
  perspective: 1200px;
}

.folder-stage-container {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

/* Folder Back Wall */
.folder-back-wall {
  position: absolute;
  bottom: 0;
  width: 380px;
  height: 260px;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.folder-back-wall.open-hidden {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.folder-tab-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 34px;
  background: linear-gradient(180deg, #2a0f1d 0%, #1a0812 100%);
  border-t-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: none;
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255, 224, 235, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.folder-back-body {
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #1e0713 0%, #0d0408 100%);
  border-radius: 14px;
  border-top-right-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.8), 0 20px 50px rgba(0, 0, 0, 0.8);
}

/* Folder Cards Stack Layer */
.folder-cards-stack-layer {
  position: absolute;
  bottom: 12px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
}

.folder-project-card {
  position: absolute;
  bottom: 0;
  width: 250px;
  height: 320px;
  background: #1A0712;
  border: 1px solid rgba(190, 44, 85, 0.4);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.75);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform-origin: bottom center;
  transition: transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.25),
              opacity 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease;
  cursor: grab;
}

.folder-project-card:active {
  cursor: grabbing;
}

.folder-project-card.is-hovered-card {
  border-color: #FFE0EB;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 224, 235, 0.4);
}

/* Card Media Header */
.card-media-wrapper {
  position: relative;
  width: 100%;
  height: 110px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.folder-project-card:hover .card-preview-img {
  transform: scale(1.08);
}

.card-media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(26, 7, 18, 0.1) 0%, rgba(26, 7, 18, 0.95) 100%);
}

.card-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(30, 7, 19, 0.85);
  border: 1px solid #BE2C55;
  color: #FFE0EB;
  font-size: 0.58rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.05em;
}

/* Card Content */
.card-content {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}

.card-top-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(255, 224, 235, 0.7);
  margin-bottom: 2px;
}

.status-indicator {
  color: #BE2C55;
}

.cat-tag {
  color: rgba(255, 255, 255, 0.5);
}

.card-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #FFE0EB;
  margin: 0;
  line-height: 1.15;
}

.card-subtitle {
  font-size: 0.62rem;
  color: rgba(255, 224, 235, 0.65);
  margin: 2px 0 6px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-description {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.3;
  margin: 0 0 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
}

.tech-pill {
  background: rgba(190, 44, 85, 0.18);
  border: 1px solid rgba(190, 44, 85, 0.4);
  color: #FFE0EB;
  font-size: 0.55rem;
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 700;
}

/* Card Actions Row */
.card-actions-row {
  display: flex;
  align-items: center;
  gap: 6px;

}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action-btn.primary-action {
  background: #BE2C55;
  color: #ffffff;
  border: 1px solid #BE2C55;
}

.action-btn.primary-action:hover {
  background: #e03b68;
  box-shadow: 0 4px 12px rgba(190, 44, 85, 0.4);
}

.action-btn.secondary-action {
  background: rgba(255, 224, 235, 0.08);
  color: #FFE0EB;
  border: 1px solid rgba(255, 224, 235, 0.2);
}

.action-btn.secondary-action:hover {
  background: rgba(255, 224, 235, 0.2);
  color: #ffffff;
}

/* Folder Front Flap Cover */
.folder-front-flap {
  position: absolute;
  bottom: 0;
  width: 360px;
  height: 170px;
  z-index: 30;
  cursor: pointer;
  transform-origin: bottom center;
  transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.25),
              opacity 0.4s ease;
}

.folder-front-flap.flap-hovered {
  transform: perspective(800px) rotateX(-25deg) translateY(10px);
}

.folder-front-flap.flap-open {
  opacity: 0;
  transform: perspective(800px) rotateX(-75deg) translateY(40px);
  pointer-events: none;
}

.flap-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #2a0d1d 0%, #12040c 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 224, 235, 0.25);
  box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.15), 0 -15px 35px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
}

.flap-shine-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 224, 235, 0.6), transparent);
}

.flap-badge-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #0d0408;
  border: 1px solid rgba(190, 44, 85, 0.4);
  padding: 6px 14px;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
}

.flap-folder-icon {
  font-size: 0.9rem;
}

.flap-folder-title {
  color: #FFE0EB;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.flap-count-tag {
  color: #BE2C55;
  font-size: 0.68rem;
  font-weight: 800;
}

.flap-click-prompt {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255, 224, 235, 0.6);
  letter-spacing: 0.1em;
}

/* Drag or Click Hint Badge */
.drag-hint-badge {
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  background: rgba(13, 4, 8, 0.85);
  border: 1px solid rgba(190, 44, 85, 0.4);
  color: rgba(255, 224, 235, 0.75);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 8px 18px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 12px;
  z-index: 120;
}

.drag-hint-badge.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.drag-hint-badge:hover {
  background: #BE2C55;
  color: #ffffff;
  border-color: #BE2C55;
  box-shadow: 0 4px 16px rgba(190, 44, 85, 0.5);
}
</style>
