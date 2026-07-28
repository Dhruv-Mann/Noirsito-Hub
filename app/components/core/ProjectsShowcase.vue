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
  highlights: string[]
  techStack: string[]
  githubUrl: string
  demoUrl?: string
}

const activeCategory = ref<'ALL' | 'AI / ML' | 'FULL STACK' | 'SYSTEMS & C++'>('ALL')
const hoveredCardId = ref<string | null>(null)

const projects: Project[] = [
  {
    id: 'noir-hub',
    title: 'Noir-Hub Digital OS',
    subtitle: 'High-Performance Desktop Portfolio Engine',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'An interactive, desktop-grade personal operating system and digital portfolio hub engineered with custom canvas physics, zero VDOM thrashing, and dynamic plum aesthetics.',
    highlights: ['60fps canvas particle physics', 'Zero VDOM reactivity thrashing', 'Integrated Ctrl+K Command Palette'],
    techStack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Canvas WebGL', 'Hono'],
    githubUrl: 'https://github.com/Dhruv-Mann/Noirsito-Hub',
    demoUrl: 'https://github.com/Dhruv-Mann/Noirsito-Hub'
  },
  {
    id: 'eve-framework',
    title: 'Eve AI Agent Framework',
    subtitle: 'Durable Agent Orchestration & Subagent Pipelines',
    status: 'OPEN SOURCE',
    category: 'AI / ML',
    description: 'A durable, multi-agent AI framework for building autonomous background subagents with tool calling, scheduled cron timers, sandbox execution, and eval benchmarks.',
    highlights: ['Durable subagent delegation tree', 'Real-time tool execution & sandbox', 'Autonomous cron scheduling'],
    techStack: ['TypeScript', 'Node.js', 'Bun', 'PyTorch', 'Vector DB'],
    githubUrl: 'https://github.com/Dhruv-Mann'
  },
  {
    id: 'simd-vector-engine',
    title: 'SIMD Vector Search Engine',
    subtitle: 'C++20 AVX-512 Embeddings ANN Retrieval Engine',
    status: 'RESEARCH',
    category: 'SYSTEMS & C++',
    description: 'Ultra-fast vector embeddings search engine utilizing C++20 AVX2/AVX-512 SIMD vectorization with zero-copy Python bindings for LLM RAG pipelines.',
    highlights: ['Sub-millisecond ANN retrieval speed', 'AVX-512 SIMD vector math optimization', 'Zero-copy PyBind11 bindings'],
    techStack: ['C++20', 'SIMD', 'Python', 'PyTorch', 'CMake'],
    githubUrl: 'https://github.com/Dhruv-Mann'
  },
  {
    id: 'better-auth-saas',
    title: 'Better-Auth & Appwrite SaaS System',
    subtitle: 'Multi-Tenant Auth & Dodo Payments Credit Billing',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'Enterprise-grade SaaS engine featuring multi-tenant authentication, Appwrite document storage, Dodo Payments metered credit ledger, and Nitro API backend.',
    highlights: ['Multi-tenant OAuth & session management', 'Credit-based meter deduction', 'Type-safe H3 / Nitro API layer'],
    techStack: ['Nuxt 4', 'Better-Auth', 'Appwrite', 'PostgreSQL', 'Dodo Payments'],
    githubUrl: 'https://github.com/Dhruv-Mann'
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'ALL') return projects
  return projects.filter(p => p.category === activeCategory.value)
})
</script>

<template>
  <div
    class="projects-showcase font-body select-none"
    :class="{ 'crimson-active': hoveredCardId !== null }"
  >
    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav active-tab="projects" />

    <!-- Full Background Dithered Overlay -->
    <div
      class="dither-bg-layer"
      :class="{ 'fade-out': hoveredCardId !== null }"
      aria-hidden="true"
    >
      <img src="/INTENSIFY_dithered.png" alt="" class="dither-img" />
    </div>

    <!-- #BE2C55 Crimson Background Takeover Overlay Layer -->
    <div
      class="crimson-bg-takeover"
      :class="{ active: hoveredCardId !== null }"
      aria-hidden="true"
    />

    <!-- Main Content Container -->
    <div class="projects-container">

      <!-- Segment 2: Main Title & Crimson Rule -->
      <header class="section-header anim-seg-2">
        <h1 class="projects-title font-display">
          <span class="word-blush">ENGINEERING</span>
          <span class="word-crimson">PROJECTS</span>
        </h1>
        <div class="crimson-divider-line" />
      </header>

      <!-- Segment 3: Category Filter Pills -->
      <div class="category-filters font-mono anim-seg-3">
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

      <!-- Segment 4: Projects Grid -->
      <div class="projects-grid anim-seg-4">
        <article
          v-for="(proj, index) in filteredProjects"
          :key="proj.id"
          class="project-card"
          :class="{ 'card-hovered': hoveredCardId === proj.id }"
          :style="{ animationDelay: `${0.1 + index * 0.08}s` }"
          @mouseenter="hoveredCardId = proj.id"
          @mouseleave="hoveredCardId = null"
        >
          <!-- Top Card Meta Bar -->
          <div class="card-header font-mono">
            <span class="status-badge" :class="proj.status.toLowerCase().replace(' ', '-')">
              ● {{ proj.status }}
            </span>
            <span class="category-badge">[ {{ proj.category }} ]</span>
          </div>

          <!-- Project Title & Subtitle -->
          <div class="card-title-block">
            <h2 class="project-card-title font-display">{{ proj.title }}</h2>
            <p class="project-card-sub font-mono">{{ proj.subtitle }}</p>
          </div>

          <!-- Description -->
          <p class="project-card-desc">{{ proj.description }}</p>

          <!-- Segment 5: Engineering Highlights Box -->
          <div class="card-highlights anim-seg-5">
            <span class="highlights-label font-mono">// KEY SPECIFICATIONS</span>
            <ul class="highlights-list font-mono">
              <li v-for="(h, idx) in proj.highlights" :key="idx">
                <span class="bullet">›</span> {{ h }}
              </li>
            </ul>
          </div>

          <!-- Tech Stack Badges -->
          <div class="card-stack-pills font-mono">
            <span v-for="tech in proj.techStack" :key="tech" class="stack-pill">
              {{ tech }}
            </span>
          </div>

          <!-- Card Actions / Links -->
          <div class="card-actions font-mono">
            <a
              :href="proj.githubUrl"
              target="_blank"
              rel="noopener"
              class="action-btn primary-btn"
            >
              <span>GITHUB REPO</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>

            <a
              v-if="proj.demoUrl"
              :href="proj.demoUrl"
              target="_blank"
              rel="noopener"
              class="action-btn secondary-btn"
            >
              <span>LIVE SYSTEM</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Redesigned Palette & Interactive Takeover:
   #2A0C1B - Base Deep Plum Background
   #FFE0EB - Crisp Blush Pink Text
   #BE2C55 - Vivid Crimson Takeover & Accent
*/

.projects-showcase {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: #2A0C1B;
  color: #FFE0EB;
  padding: 110px 24px 80px 24px;
  overflow-x: hidden;
  transition: background 0.5s ease;
}

/* Full Background Dithered Layer */
.dither-bg-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.85;
  z-index: 1;
  overflow: hidden;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.dither-bg-layer.fade-out {
  opacity: 0;
}

.dither-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  mix-blend-mode: screen;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* #BE2C55 Crimson Background Takeover Overlay Layer */
.crimson-bg-takeover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #BE2C55;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.crimson-bg-takeover.active {
  opacity: 1;
}

.projects-container {
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

/* Header Badge */
.header-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: #BE2C55;
  font-weight: 700;
  transition: color 0.3s ease;
}

.projects-showcase.crimson-active .header-badge {
  color: #FFE0EB;
}

.badge-num {
  color: #FFE0EB;
}

/* Section Header & Titles */
.section-header {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.projects-title {
  font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.03em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.word-blush {
  color: #FFE0EB;
  margin-right: 14px;
}

.word-crimson {
  color: #BE2C55;
  transition: color 0.3s ease;
}

.projects-showcase.crimson-active .word-crimson {
  color: #2A0C1B;
}

.crimson-divider-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #BE2C55 0%, rgba(190, 44, 85, 0.3) 60%, transparent 100%);
  margin-top: 4px;
  transition: background 0.3s ease;
}

.projects-showcase.crimson-active .crimson-divider-line {
  background: #FFE0EB;
}

/* Category Filter Tabs */
.category-filters {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-tab {
  background: rgba(30, 7, 19, 0.55);
  border: 1px solid rgba(190, 44, 85, 0.4);
  color: rgba(255, 224, 235, 0.75);
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.filter-slash {
  color: #BE2C55;
}

.filter-tab:hover {
  background: rgba(190, 44, 85, 0.25);
  border-color: #BE2C55;
  color: #FFE0EB;
}

.filter-tab.active {
  background: #BE2C55;
  border-color: #BE2C55;
  color: #FFE0EB;
  box-shadow: 0 4px 16px rgba(190, 44, 85, 0.45);
}

.projects-showcase.crimson-active .filter-tab {
  background: rgba(42, 12, 27, 0.85);
  border-color: rgba(255, 224, 235, 0.3);
}

.projects-showcase.crimson-active .filter-tab.active {
  background: #2A0C1B;
  border-color: #FFE0EB;
  color: #FFE0EB;
}

/* Projects Grid & Cards */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 28px;
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

.project-card {
  background: rgba(30, 7, 19, 0.5);
  border: 1px solid rgba(190, 44, 85, 0.4);
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
}

.projects-showcase.crimson-active .project-card {
  background: rgba(30, 7, 19, 0.9);
  border-color: rgba(255, 224, 235, 0.25);
  backdrop-filter: none;
}

.project-card.card-hovered {
  background: #1E0713 !important;
  border-color: #FFE0EB !important;
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75), 0 0 35px rgba(255, 224, 235, 0.35);
  z-index: 20;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  font-weight: 700;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(42, 12, 27, 0.85);
}

.status-badge.production {
  color: #FFE0EB;
  border: 1px solid #BE2C55;
}

.status-badge.open-source {
  color: #FFE0EB;
  border: 1px solid rgba(255, 224, 235, 0.5);
}

.status-badge.research {
  color: #BE2C55;
  border: 1px solid #BE2C55;
}

.category-badge {
  color: rgba(255, 224, 235, 0.6);
}

.card-title-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.project-card-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #FFE0EB;
  line-height: 1.2;
}

.project-card-sub {
  font-size: 0.78rem;
  color: #BE2C55;
  letter-spacing: 0.04em;
  transition: color 0.3s ease;
}

.project-card.card-hovered .project-card-sub {
  color: #FFE0EB;
}

.project-card-desc {
  font-size: 0.9375rem;
  color: rgba(255, 224, 235, 0.85);
  line-height: 1.6;
}

/* Highlights Box */
.card-highlights {
  background: rgba(42, 12, 27, 0.5);
  border: 1px solid rgba(190, 44, 85, 0.3);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.project-card.card-hovered .card-highlights {
  background: rgba(42, 12, 27, 0.85);
  border-color: rgba(255, 224, 235, 0.3);
}

.highlights-label {
  font-size: 0.6875rem;
  color: #BE2C55;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.project-card.card-hovered .highlights-label {
  color: #FFE0EB;
}

.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.78rem;
  color: rgba(255, 224, 235, 0.9);
  list-style: none;
  padding: 0;
  margin: 0;
}

.bullet {
  color: #BE2C55;
  font-weight: 700;
}

.project-card.card-hovered .bullet {
  color: #FFE0EB;
}

/* Tech Stack Badges */
.card-stack-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.stack-pill {
  font-size: 0.6875rem;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(42, 12, 27, 0.6);
  border: 1px solid rgba(190, 44, 85, 0.35);
  color: rgba(255, 224, 235, 0.8);
}

.project-card.card-hovered .stack-pill {
  background: rgba(42, 12, 27, 0.9);
  border-color: rgba(255, 224, 235, 0.4);
  color: #FFE0EB;
}

/* Card Action Buttons */
.card-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: all 0.2s ease;
}

.primary-btn {
  background: #BE2C55;
  border: 1px solid #BE2C55;
  color: #FFE0EB;
}

.primary-btn:hover {
  background: #d43562;
  border-color: #d43562;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(190, 44, 85, 0.5);
}

.secondary-btn {
  background: rgba(42, 12, 27, 0.6);
  border: 1px solid rgba(190, 44, 85, 0.4);
  color: rgba(255, 224, 235, 0.85);
}

.secondary-btn:hover {
  border-color: #BE2C55;
  color: #FFE0EB;
  background: rgba(190, 44, 85, 0.2);
}

/* Multi-Segment Staggered Micro-Animations */
.anim-seg-1 {
  animation: seg-fade 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.anim-seg-2 {
  animation: seg-fade 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.anim-seg-3 {
  animation: seg-fade 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.anim-seg-4 {
  animation: seg-fade 1.05s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.anim-seg-5 {
  animation: seg-fade 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes seg-fade {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
