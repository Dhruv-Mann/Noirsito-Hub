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
const activeReadProject = ref<Project | null>(null)

// Drag tracking for closing folder
const dragStartY = ref<number | null>(null)
const dragOffsetY = ref<number>(0)
const isDragging = ref(false)

const projects: Project[] = [
  {
    id: 'noirsito-ui',
    title: 'Noirsito UI',
    subtitle: 'Minimalist Vue 3 & Nuxt 4 Component Registry & CLI',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'Zero-dependency Vue 3 component registry and direct CLI tool that injects raw TypeScript components into your codebase.',
    techStack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Node CLI', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Dhruv-Mann/Noirsito-UI',
    demoUrl: 'https://noirsito-ui.vercel.app/',
    telemetryBadge: 'COMPONENT REGISTRY & CLI',
    image: '/Noirsito-UI.png'
  },
  {
    id: 'filemind',
    title: 'Filemind',
    subtitle: 'Autonomous Local File Intelligence & Context Engine',
    status: 'PRODUCTION',
    category: 'AI / ML',
    description: 'Local document intelligence engine that indexes, vectors, and analyzes unstructured files with zero external API leaks.',
    techStack: ['Tauri v2', 'Rust', 'React 18', 'Ollama AI', 'LanceDB', 'MCP Protocol'],
    githubUrl: 'https://github.com/Dhruv-Mann/filemind',
    demoUrl: 'https://filemind.vercel.app/',
    telemetryBadge: 'AI FILE INTELLIGENCE',
    image: '/filemind.png'
  },
  {
    id: 'sentinel-vision',
    title: 'Sentinel Vision',
    subtitle: 'Resume Intelligence & Real-Time Tracking Platform',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'Turn resumes into data sources with real-time viewer geolocation, device telemetry, reading duration tracking, and instant kill switches.',
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS 4'],
    githubUrl: 'https://github.com/Dhruv-Mann/Sentinel-Vision',
    demoUrl: 'https://sentinel-vision-five.vercel.app/',
    telemetryBadge: 'RESUME INTELLIGENCE',
    image: '/Sentinel-Vision.png'
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'ALL') return projects
  return projects.filter(p => p.category === activeCategory.value)
})

function getCardStyle(index: number, total: number) {
  const offset = index - (total - 1) / 2

  if (!isFolderOpen.value) {
    const stackY = hoverFolder.value ? offset * -10 - 40 : offset * -5
    const stackX = hoverFolder.value ? offset * 32 : offset * 3
    const stackRotate = hoverFolder.value ? offset * 7 : offset * 3
    const baseScale = hoverFolder.value ? 1.0 : 0.82
    const stackScale = baseScale - Math.abs(offset) * 0.03

    return {
      transform: `translate3d(${stackX}px, ${stackY}px, 0px) rotate(${stackRotate}deg) scale(${stackScale})`,
      zIndex: index + 10,
      opacity: 1
    }
  } else {
    // Open Folder Spread Layout
    const isHovered = hoveredCardId.value === filteredProjects.value[index].id
    const openY = (isHovered ? -160 : -140) + (isDragging.value ? dragOffsetY.value * 0.5 : 0)
    // Spaced evenly across stage for 16:9 widescreen cards
    const spacing = total <= 3 ? 240 : 205
    const openX = offset * spacing
    const openRotate = isHovered ? 0 : offset * 2
    const openScale = isHovered ? 1.45 : 1.02

    return {
      transform: `translate3d(${openX}px, ${openY}px, 0px) rotate(${openRotate}deg) scale(${openScale})`,
      zIndex: isHovered ? 300 : index + 10,
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

function openProjectLink(url: string) {
  if (isFolderOpen.value && url) {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <div
    class="projects-showcase font-body select-none"
    :class="{ 'crimson-active': hoverFolder || hoveredCardId !== null || isFolderOpen }"
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
            v-for="cat in ['ALL', 'AI / ML', 'FULL STACK']"
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
            :class="{ 'wall-hovered': hoverFolder && !isFolderOpen, 'open-hidden': isFolderOpen }"
          >
            <!-- Folder Top Tab Header -->
            <div class="folder-tab-top font-mono">
              <span>PROJECTS.gallery</span>
            </div>
            <!-- Folder Back Surface Body -->
            <div class="folder-back-body" />
          </div>

          <!-- Project Photo Stack Layer (Pure PNG Cards) -->
          <div class="folder-cards-stack-layer">
            <article
              v-for="(proj, i) in filteredProjects"
              :key="proj.id"
              class="folder-project-card"
              :class="{ 
                'is-open-card': isFolderOpen,
                'is-hovered-card': hoveredCardId === proj.id
              }"
              :style="getCardStyle(i, filteredProjects.length)"
              @mouseenter="hoveredCardId = proj.id"
              @mouseleave="hoveredCardId = null"
              @pointerdown="handlePointerDown"
            >
              <!-- Subtle Floating Title Above Card -->
              <div class="hover-floating-title font-mono">
                <span>{{ proj.title }}</span>
              </div>

              <img :src="proj.image" :alt="proj.title" class="card-full-photo" />

              <!-- Mini Dynamic Island Bar on Each Project Card -->
              <div class="card-mini-island font-mono" @click.stop>
                <!-- 1. Repo -->
                <a :href="proj.githubUrl" target="_blank" rel="noopener" class="mini-island-btn" title="GitHub Repository">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" class="github-icon">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>Repo</span>
                </a>

                <div class="mini-island-divider" />

                <!-- 2. Live -->
                <a :href="proj.demoUrl || proj.githubUrl" target="_blank" rel="noopener" class="mini-island-btn" title="Live System">
                  <span>Live</span>
                </a>

                <div class="mini-island-divider" />

                <!-- 3. Read -->
                <NuxtLink :to="`/projects/${proj.id}`" class="mini-island-btn" title="Read Project Details" @click.stop>
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  <span>Read</span>
                </NuxtLink>
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
              <div class="flap-click-prompt font-mono">
                <span>CLICK TO OPEN PROJECTS GALLERY</span>
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

    <!-- Read Project Modal Drawer -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="activeReadProject"
          class="project-read-modal-overlay font-body"
          @click="activeReadProject = null"
        >
          <div class="project-read-modal-card" @click.stop>
            <button class="close-modal-btn font-mono" @click="activeReadProject = null">✕</button>

            <div class="read-modal-header font-mono">
              <span class="status-badge">● {{ activeReadProject.status }}</span>
              <span class="telemetry-badge">{{ activeReadProject.telemetryBadge }}</span>
            </div>

            <h2 class="read-modal-title font-display">{{ activeReadProject.title }}</h2>
            <p class="read-modal-sub font-mono">{{ activeReadProject.subtitle }}</p>

            <p class="read-modal-desc">{{ activeReadProject.description }}</p>

            <div class="read-modal-stack font-mono">
              <span class="stack-label">TECH STACK:</span>
              <span v-for="t in activeReadProject.techStack" :key="t" class="tech-tag">{{ t }}</span>
            </div>

            <div class="read-modal-actions font-mono">
              <a :href="activeReadProject.githubUrl" target="_blank" rel="noopener" class="read-action-btn primary">
                <span>GITHUB REPOSITORY</span>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a v-if="activeReadProject.demoUrl" :href="activeReadProject.demoUrl" target="_blank" rel="noopener" class="read-action-btn secondary">
                <span>LIVE SYSTEM</span>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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
  transition: color 0.4s ease, text-shadow 0.4s ease;
}

.word-crimson {
  color: #BE2C55;
  transition: color 0.4s ease, text-shadow 0.4s ease;
}

.crimson-divider-line {
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #BE2C55, transparent);
  transition: background 0.4s ease;
}

.projects-showcase.crimson-active .word-crimson {
  color: #12040C;
  text-shadow: 0 1px 2px rgba(255, 224, 235, 0.25);
}

.projects-showcase.crimson-active .word-blush {
  color: #FFE0EB;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.projects-showcase.crimson-active .crimson-divider-line {
  background: linear-gradient(90deg, transparent, #12040C, transparent);
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
  width: 410px;
  height: 210px;
  z-index: 0;
  pointer-events: none;
  transform: scale(0.8);
  transform-origin: bottom center;
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.25);
}

.folder-back-wall.wall-hovered {
  transform: scale(1);
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
  width: 320px;
  height: 180px;
  background: #0d0408;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.85);
  overflow: visible;
  transform-origin: bottom center;
  transition: transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.25),
              opacity 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease;
  cursor: grab;
}

/* Bold Standalone Title Above Card PNG */
.hover-floating-title {
  position: absolute;
  top: -38px;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.8);
  z-index: 100;
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
}

.folder-project-card.is-open-card .hover-floating-title,
.folder-project-card.is-hovered-card .hover-floating-title,
.folder-project-card:hover .hover-floating-title {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.folder-project-card.is-hovered-card .hover-floating-title {
  color: #FFE0EB;
}

.folder-project-card:active {
  cursor: grabbing;
}

.folder-project-card.is-hovered-card {
  border-color: #BE2C55;
  box-shadow: 0 28px 75px rgba(0, 0, 0, 0.95), 0 0 45px rgba(190, 44, 85, 0.6);
  background: #000000;
}

.card-full-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 11px;
  pointer-events: none;
  transition: transform 0.35s ease;
}

.folder-project-card:hover .card-full-photo {
  transform: scale(1.03);
}

/* Folder Front Flap Cover */
.folder-front-flap {
  position: absolute;
  bottom: 0;
  width: 390px;
  height: 140px;
  z-index: 30;
  cursor: pointer;
  transform: scale(0.8);
  transform-origin: bottom center;
  transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.25),
              opacity 0.4s ease;
}

.folder-front-flap.flap-hovered {
  transform: scale(1) perspective(800px) rotateX(-25deg) translateY(10px);
}

.folder-front-flap.flap-open {
  opacity: 0;
  transform: scale(1) perspective(800px) rotateX(-75deg) translateY(40px);
  pointer-events: none;
}

.flap-body {
  width: 100%;
  height: 100%;
  background: #0D0408;
  border-radius: 16px;
  border: 2px solid #2A0C1B;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.95);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  transition: all 0.25s ease;
}

.folder-front-flap.flap-hovered .flap-body {
  background: #14050E;
  border-color: #FFE0EB;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.98);
}

.flap-click-prompt {
  font-size: 0.78rem;
  font-weight: 900;
  color: #FFE0EB;
  letter-spacing: 0.15em;
  text-align: center;
  transition: color 0.25s ease;
}

.folder-front-flap.flap-hovered .flap-click-prompt {
  color: #ffffff;
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

/* Card Mini Dynamic Island Pill */
.card-mini-island {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(13, 4, 8, 0.92);
  border: 1px solid rgba(255, 224, 235, 0.25);
  border-radius: 20px;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 50;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  transition: all 0.25s ease;
}

.mini-island-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: rgba(255, 224, 235, 0.85);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mini-island-btn:hover {
  background: #BE2C55;
  color: #ffffff;
  transform: scale(1.05);
}

.mini-island-divider {
  width: 1px;
  height: 10px;
  background: rgba(255, 224, 235, 0.2);
}

.live-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
  animation: pulse-live 1.8s infinite;
}

@keyframes pulse-live {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

/* Read Project Modal Overlay & Card */
.project-read-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(14px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.project-read-modal-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: linear-gradient(180deg, #1e0713 0%, #0d0408 100%);
  border: 1px solid rgba(190, 44, 85, 0.5);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(190, 44, 85, 0.3);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.close-modal-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 224, 235, 0.1);
  border: 1px solid rgba(255, 224, 235, 0.2);
  color: #FFE0EB;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-modal-btn:hover {
  background: #BE2C55;
  color: #ffffff;
}

.read-modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.7rem;
  font-weight: 700;
}

.status-badge {
  color: #BE2C55;
}

.telemetry-badge {
  background: rgba(190, 44, 85, 0.2);
  border: 1px solid #BE2C55;
  color: #FFE0EB;
  padding: 2px 8px;
  border-radius: 4px;
}

.read-modal-title {
  font-size: 1.6rem;
  font-weight: 900;
  color: #FFE0EB;
  margin: 0;
}

.read-modal-sub {
  font-size: 0.8rem;
  color: rgba(255, 224, 235, 0.7);
  margin: 0;
}

.read-modal-desc {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  margin: 0;
}

.read-modal-stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
}

.stack-label {
  color: rgba(255, 224, 235, 0.6);
  font-weight: 800;
  margin-right: 4px;
}

.tech-tag {
  background: rgba(190, 44, 85, 0.2);
  border: 1px solid rgba(190, 44, 85, 0.4);
  color: #FFE0EB;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 700;
}

.read-modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.read-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.read-action-btn.primary {
  background: #BE2C55;
  color: #ffffff;
  border: 1px solid #BE2C55;
}

.read-action-btn.primary:hover {
  background: #e03b68;
}

.read-action-btn.secondary {
  background: rgba(255, 224, 235, 0.1);
  color: #FFE0EB;
  border: 1px solid rgba(255, 224, 235, 0.2);
}

.read-action-btn.secondary:hover {
  background: rgba(255, 224, 235, 0.2);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
