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
  telemetryBadge?: string
  layoutClass?: string
}

const activeCategory = ref<'ALL' | 'AI / ML' | 'FULL STACK' | 'SYSTEMS & C++'>('ALL')
const hoveredCardId = ref<string | null>(null)

const projects: Project[] = [
  {
    id: 'filemind',
    title: 'FileMind AI',
    subtitle: 'Autonomous Local File Intelligence & Context Engine',
    status: 'PRODUCTION',
    category: 'AI / ML',
    description: 'An intelligent local-first document processing engine that indexes, vectors, and analyzes unstructured files with zero external API leaks and instant semantic context retrieval.',
    highlights: ['Local-first semantic document vectorization', 'Zero API data leaks & privacy-first processing', 'Sub-millisecond natural language context search'],
    techStack: ['Python', 'TypeScript', 'PyTorch', 'Vector DB', 'Electron'],
    githubUrl: 'https://github.com/Dhruv-Mann/filemind',
    demoUrl: 'https://github.com/Dhruv-Mann/filemind',
    telemetryBadge: 'AI FILE INTELLIGENCE',
    layoutClass: 'card-hero-span'
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
    githubUrl: 'https://github.com/Dhruv-Mann',
    telemetryBadge: 'AUTONOMOUS SUBAGENTS',
    layoutClass: 'card-tall-span'
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
    githubUrl: 'https://github.com/Dhruv-Mann',
    telemetryBadge: '0.42ms ANN RETRIEVAL',
    layoutClass: 'card-wide-span'
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
    githubUrl: 'https://github.com/Dhruv-Mann',
    telemetryBadge: 'ENTERPRISE SAAS LEDGER',
    layoutClass: 'card-full-span'
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
    :class="{ 'crimson-active': selectedProjectId !== null || hoveredCardId !== null }"
  >
    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav active-tab="projects" />

    <!-- Full Background Dithered Overlay -->
    <div
      class="dither-bg-layer"
      :class="{ 'fade-out': selectedProjectId !== null || hoveredCardId !== null }"
      aria-hidden="true"
    >
      <img src="/INTENSIFY_dithered.png" alt="" class="dither-img" />
    </div>

    <!-- #BE2C55 Crimson Background Takeover Overlay Layer -->
    <div
      class="crimson-bg-takeover"
      :class="{ active: selectedProjectId !== null || hoveredCardId !== null }"
      aria-hidden="true"
    />

    <!-- Main Content Container (Original Apple 12-Column Bento Layout) -->
    <div class="projects-container">
      <!-- Section Header Title & Rule -->
      <header class="section-header anim-seg-2">
        <h1 class="projects-title font-display">
          <span class="word-blush">ENGINEERING</span>
          <span class="word-crimson">PROJECTS</span>
        </h1>
        <div class="crimson-divider-line" />
      </header>

      <!-- Category Filter Pills -->
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

      <!-- Original 12-Column Asymmetric Bento Grid Layout -->
      <div class="bento-projects-grid anim-seg-4">
        <article
          v-for="(proj, index) in filteredProjects"
          :key="proj.id"
          class="project-card"
          :class="[
            proj.layoutClass,
            {
              'card-hovered': hoveredCardId === proj.id
            }
          ]"
          :style="{ animationDelay: `${0.08 + index * 0.07}s` }"
          @mouseenter="hoveredCardId = proj.id"
          @mouseleave="hoveredCardId = null"
        >
          <!-- Top Chamfer Corner Detail -->
          <div class="card-chamfer-corner font-mono" v-if="proj.telemetryBadge">
            <span>{{ proj.telemetryBadge }}</span>
          </div>

          <!-- Level 01: Top Meta Status Bar -->
          <div class="card-header font-mono">
            <span class="status-badge" :class="proj.status.toLowerCase().replace(' ', '-')">
              ● {{ proj.status }}
            </span>
            <span class="category-badge">[ {{ proj.category }} ]</span>
          </div>

          <!-- Main Content Body -->
          <div class="card-body-content">
            <div class="card-title-block">
              <h2 class="project-card-title font-display">{{ proj.title }}</h2>
              <p class="project-card-sub font-mono">{{ proj.subtitle }}</p>
            </div>

            <p class="project-card-desc">{{ proj.description }}</p>
          </div>

          <!-- Direct Action Links Bar -->
          <div class="card-actions-row font-mono">
            <a :href="proj.githubUrl" target="_blank" rel="noopener" class="card-action-btn primary-action">
              <span>GITHUB REPO</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a v-if="proj.demoUrl" :href="proj.demoUrl" target="_blank" rel="noopener" class="card-action-btn secondary-action">
              <span>LIVE SYSTEM</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>

          <!-- Footer Tech Stack Pills -->
          <div class="card-footer-block font-mono">
            <div class="card-stack-pills">
              <span v-for="tech in proj.techStack" :key="tech" class="stack-pill">
                {{ tech }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Redesigned Palette & Lissajous Connected Node Network:
   #2A0C1B - Base Deep Plum Background
   #FFE0EB - Crisp Blush Pink Text
   #BE2C55 - Vivid Crimson Takeover & Accent
   #1E0713 - Solid Plum Card Surface
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
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
  transition: opacity 0.4s ease, filter 0.4s ease;
}

.projects-container.grid-dimmed {
  opacity: 0.1;
  filter: blur(4px);
  pointer-events: none;
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

/* 12-Column Asymmetric Bento Grid (Apple Layout) */
.bento-projects-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.card-hero-span {
  grid-column: span 8;
}

.card-tall-span {
  grid-column: span 4;
  grid-row: span 2;
}

.card-wide-span {
  grid-column: span 8;
}

.card-full-span {
  grid-column: span 12;
}

@media (max-width: 1024px) {
  .card-hero-span,
  .card-tall-span,
  .card-wide-span,
  .card-full-span {
    grid-column: span 12;
    grid-row: auto;
  }
}

.project-card {
  background: rgba(30, 7, 19, 0.55);
  border: 1px solid rgba(190, 44, 85, 0.4);
  border-radius: 14px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  backdrop-filter: blur(4px);
  transition: all 0.35s ease;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
}

.project-card:hover {
  background: #1E0713 !important;
  border-color: #FFE0EB !important;
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 224, 235, 0.35);
}

.card-actions-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  z-index: 5;
}

.card-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.card-action-btn.primary-action {
  background: #BE2C55;
  color: #ffffff;
  border: 1px solid #BE2C55;
}

.card-action-btn.primary-action:hover {
  background: #e03b68;
  box-shadow: 0 4px 16px rgba(190, 44, 85, 0.45);
  transform: translateY(-2px);
}

.card-action-btn.secondary-action {
  background: rgba(255, 224, 235, 0.08);
  color: #FFE0EB;
  border: 1px solid rgba(255, 224, 235, 0.2);
}

.card-action-btn.secondary-action:hover {
  background: rgba(255, 224, 235, 0.18);
  border-color: #BE2C55;
  color: #ffffff;
  transform: translateY(-2px);
}

/* Chamfer Top Badge */
.card-chamfer-corner {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(190, 44, 85, 0.25);
  border-bottom: 1px solid rgba(190, 44, 85, 0.4);
  border-left: 1px solid rgba(190, 44, 85, 0.4);
  border-bottom-left-radius: 8px;
  padding: 4px 12px;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #FFE0EB;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  font-weight: 700;
  padding-right: 110px;
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

.card-body-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-title-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.project-card-title {
  font-size: 1.65rem;
  font-weight: 800;
  color: #FFE0EB;
  line-height: 1.2;
}

.project-card-sub {
  font-size: 0.78rem;
  color: #BE2C55;
  letter-spacing: 0.04em;
}

.project-card-desc {
  font-size: 0.9375rem;
  color: rgba(255, 224, 235, 0.85);
  line-height: 1.6;
}

.card-footer-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

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

.card-actions {
  display: flex;
  align-items: center;
  gap: 12px;
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

/* ============================================================
   CLICKED MODAL OVERLAY & LISSAJOUS CONNECTED NODE STAGE
   ============================================================ */
.lissajous-modal-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(42, 12, 27, 0.85);
  backdrop-filter: blur(8px);
}

.lissajous-canvas-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 110;
}

.close-modal-btn {
  position: absolute;
  top: 28px;
  right: 32px;
  z-index: 150;
  background: #1E0713;
  border: 1px solid #FFE0EB;
  color: #FFE0EB;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8);
  transition: all 0.2s ease;
}

.close-modal-btn:hover {
  background: #BE2C55;
  border-color: #BE2C55;
  transform: translateY(-2px);
}

/* Centered Project Card Container */
.central-card-wrapper {
  position: relative;
  z-index: 130;
  width: 100%;
  max-width: 580px;
  display: flex;
  justify-content: center;
}

.clicked-central-card {
  background: #1E0713;
  border: 2px solid #FFE0EB;
  border-radius: 16px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 224, 235, 0.45);
  animation: center-card-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes center-card-pop {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Sprouting Satellite Nodes connected by Lissajous laser beams */
.sprout-satellite-node {
  position: absolute;
  background: #1E0713;
  border: 1.5px solid #BE2C55;
  border-radius: 12px;
  padding: 18px 22px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(190, 44, 85, 0.5);
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 310px;
  z-index: 140;
  animation: node-sprout-in 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.sprout-node-1 {
  top: -90px;
  right: -340px;
}

.sprout-node-2 {
  bottom: -40px;
  right: -340px;
  animation-delay: 0.08s;
}

.sprout-node-3 {
  bottom: -60px;
  left: -340px;
  animation-delay: 0.15s;
}

@media (max-width: 1300px) {
  .sprout-node-1 {
    top: -160px;
    right: 0;
  }
  .sprout-node-2 {
    bottom: -180px;
    right: 0;
  }
  .sprout-node-3 {
    bottom: -180px;
    left: 0;
  }
}

@keyframes node-sprout-in {
  from {
    opacity: 0;
    transform: scale(0.6) translateY(24px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.sprout-badge {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #BE2C55;
}

.sprout-text {
  font-size: 0.8125rem;
  color: rgba(255, 224, 235, 0.9);
  line-height: 1.45;
}

.sprout-tag {
  font-size: 0.72rem;
  color: #FFE0EB;
  font-weight: 700;
}

.sprout-pattern {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #FFE0EB;
}

.sprout-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.sprout-chip {
  font-size: 0.65rem;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(190, 44, 85, 0.3);
  border: 1px solid rgba(190, 44, 85, 0.5);
  color: #FFE0EB;
}

.sprout-stat {
  font-size: 0.8125rem;
  color: #FFE0EB;
  font-weight: 700;
}

.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s ease;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
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
