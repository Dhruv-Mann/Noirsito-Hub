<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DynamicIslandNav from '~/components/core/DynamicIslandNav.vue'

const route = useRoute()
const projectId = computed(() => (route.params.id as string) || 'filemind')

interface ProjectDetail {
  id: string
  title: string
  subtitle: string
  tagline: string
  badge: string
  status: string
  category: string
  description: string
  architectureText: string
  image: string
  githubUrl: string
  demoUrl?: string
  windowsUrl?: string
  macUrl?: string
  docsUrl?: string
  techStack: string[]
  telemetry: { label: string; value: string }[]
}

const projectsData: Record<string, ProjectDetail> = {
  filemind: {
    id: 'filemind',
    title: 'Download Filemind',
    subtitle: 'Local MCP Organizer',
    tagline: 'A private, local-first desktop application that categorizes and organizes your Downloads directory using embedded Ollama AI inference and real-time transaction undo capabilities.',
    badge: 'LOCAL MCP ORGANIZER',
    status: 'PRODUCTION',
    category: 'AI / ML',
    description: 'FileMind is engineered from the ground up for total privacy and zero-leak file context indexing. Operating directly on your local storage, it combines embedded vector embeddings with Ollama local inference to organize unstructured desktop data without transmitting a single byte to remote servers.',
    architectureText: 'Powered by an asynchronous SQLite + Vector DB pipeline, FileMind creates instant local embeddings for your documents, code files, and downloads. Every automated file relocation is tracked in a local transaction log, allowing instant 1-click reversals.',
    image: '/filemind.png',
    githubUrl: 'https://github.com/Dhruv-Mann/filemind',
    demoUrl: 'https://github.com/Dhruv-Mann/filemind',
    windowsUrl: 'https://github.com/Dhruv-Mann/filemind/releases',
    macUrl: 'https://github.com/Dhruv-Mann/filemind/releases',
    docsUrl: 'https://github.com/Dhruv-Mann/filemind#readme',
    techStack: ['Python', 'TypeScript', 'Ollama AI', 'Vector DB', 'Electron', 'SQLite'],
    telemetry: [
      { label: 'INFERENCE ENGINE', value: 'Embedded Ollama (Local LLM)' },
      { label: 'SEARCH LATENCY', value: '< 0.42ms Local Context Query' },
      { label: 'PRIVACY GUARANTEE', value: '100% On-Device / Zero API Leaks' },
      { label: 'TRANSACTION LOG', value: 'Real-time Reversible Undo' }
    ]
  },
  'eve-framework': {
    id: 'eve-framework',
    title: 'Eve AI Framework',
    subtitle: 'Durable Agent Pipelines',
    tagline: 'A durable, multi-agent AI framework built for constructing autonomous background subagent trees, real-time tool calling, scheduled cron jobs, and isolated sandboxes.',
    badge: 'AUTONOMOUS SUBAGENTS',
    status: 'OPEN SOURCE',
    category: 'AI / ML',
    description: 'Eve provides an enterprise-grade agentic runtime supporting stateful parent-child subagent delegation, background schedule triggers, and zero-leak execution telemetry.',
    architectureText: 'Utilizing a persistent event bus and background worker queues, Eve handles multi-step AI reasoning loops with automatic retry state recovery and deterministic bench evals.',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/Dhruv-Mann',
    techStack: ['TypeScript', 'Node.js', 'Bun', 'Docker', 'PyTorch'],
    telemetry: [
      { label: 'DELEGATION TREE', value: 'Hierarchical Parent-Child Subagents' },
      { label: 'RUNTIME', value: 'Bun / Node.js Stateful Workers' },
      { label: 'SCHEDULING', value: 'One-Shot Timer & Recurring Cron' },
      { label: 'SANDBOXING', value: 'Isolated Container Execution' }
    ]
  },
  'simd-vector-engine': {
    id: 'simd-vector-engine',
    title: 'SIMD Vector Engine',
    subtitle: 'C++20 AVX-512 ANN Retrieval',
    tagline: 'Ultra-fast vector embeddings search engine utilizing C++20 AVX2/AVX-512 SIMD vectorization with zero-copy Python bindings for high-throughput LLM RAG pipelines.',
    badge: '0.42ms ANN RETRIEVAL',
    status: 'RESEARCH',
    category: 'SYSTEMS & C++',
    description: 'Designed for high-throughput vector retrieval, this engine executes hardware-accelerated cosine distance and dot-product calculations directly over SIMD registers.',
    architectureText: 'Combines HNSW graph indexing with custom memory-aligned AVX-512 intrinsic kernels, achieving sub-millisecond nearest neighbor lookups over 10M+ vector datasets.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/Dhruv-Mann',
    techStack: ['C++20', 'AVX-512 SIMD', 'Python', 'PyBind11', 'CMake'],
    telemetry: [
      { label: 'SIMD VECTOR MATH', value: 'AVX2 / AVX-512 Hardware Acceleration' },
      { label: 'BINDINGS', value: 'Zero-Copy PyBind11 C++ Interface' },
      { label: 'GRAPH INDEXING', value: 'Lock-Free Multi-Threaded HNSW' },
      { label: 'QUERY LATENCY', value: '0.42ms @ 10M Vectors' }
    ]
  },
  'better-auth-saas': {
    id: 'better-auth-saas',
    title: 'Better-Auth SaaS Engine',
    subtitle: 'Multi-Tenant Auth & Billing',
    tagline: 'Enterprise-grade SaaS architecture featuring multi-tenant OAuth, Appwrite document storage, Dodo Payments credit ledger, and Nitro API backend.',
    badge: 'ENTERPRISE SAAS LEDGER',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'A modern, modular SaaS stack equipped with OAuth session management, credit entitlement balances, meeting usage meters, and serverless Nitro routes.',
    architectureText: 'Built on Nuxt 4 and Nitro API layers with PostgreSQL database adapters, providing bulletproof type-safety, automatic session renewal, and metered subscription hooks.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/Dhruv-Mann',
    techStack: ['Nuxt 4', 'Better-Auth', 'Appwrite', 'PostgreSQL', 'Dodo Payments'],
    telemetry: [
      { label: 'AUTH LAYER', value: 'Better-Auth Multi-Tenant Sessions' },
      { label: 'BILLING LEDGER', value: 'Dodo Payments Credit & Usage Meter' },
      { label: 'DATABASE', value: 'Appwrite + PostgreSQL Relational' },
      { label: 'API LAYER', value: 'Nuxt 4 / Nitro H3 Type-Safe Handler' }
    ]
  }
}

const project = computed<ProjectDetail>(() => {
  return projectsData[projectId.value] || projectsData['filemind']
})

useSeoMeta({
  title: computed(() => `${project.value.title} • Dhruv Mann`),
  description: computed(() => project.value.tagline)
})
</script>

<template>
  <div class="project-detail-page font-body select-none">
    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav active-tab="projects" />

    <!-- Deep Background Image & Dither Tint -->
    <div class="background-tint" aria-hidden="true" />

    <main class="golden-stage-container">
      <!-- Back Navigation Header -->
      <nav class="back-nav-row font-mono">
        <NuxtLink to="/projects" class="back-link">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>BACK TO PROJECTS</span>
        </NuxtLink>
        <span class="badge-tag">{{ project.badge }}</span>
      </nav>

      <!-- SECTION 01: HERO SECTION (Golden Ratio Proportions) -->
      <section class="golden-hero-section">
        <div class="hero-text-block">
          <h1 class="hero-title font-display">
            <span class="title-primary">{{ project.title }}</span>
            <span class="title-secondary">{{ project.subtitle }}</span>
          </h1>

          <p class="hero-tagline font-body">{{ project.tagline }}</p>

          <!-- Golden Action Buttons Row -->
          <div class="hero-actions font-mono">
            <a
              v-if="project.windowsUrl"
              :href="project.windowsUrl"
              target="_blank"
              rel="noopener"
              class="golden-btn primary-btn"
            >
              <span>Download for Windows (.exe)</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>

            <a
              v-if="project.macUrl"
              :href="project.macUrl"
              target="_blank"
              rel="noopener"
              class="golden-btn secondary-btn"
            >
              <span>Download for macOS (.dmg)</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>

            <a
              :href="project.githubUrl"
              target="_blank"
              rel="noopener"
              class="golden-btn outline-btn"
            >
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>

        <!-- High-Resolution Widescreen Showcase Photo Frame -->
        <div class="hero-image-frame">
          <img :src="project.image" :alt="project.title" class="showcase-img" />
        </div>
      </section>

      <!-- SECTION 02: CORE ARCHITECTURE & PHILOSOPHY -->
      <section class="golden-section">
        <div class="section-label font-mono">01 / ARCHITECTURE & PRIVACY</div>
        <h2 class="section-heading font-display">Zero-Leak Local Intelligence</h2>
        <div class="architecture-grid">
          <div class="arch-card">
            <h3 class="arch-card-title font-mono">LOCAL VECTOR INDEXING</h3>
            <p class="arch-card-body">{{ project.description }}</p>
          </div>
          <div class="arch-card">
            <h3 class="arch-card-title font-mono">TRANSACTION UNDO LOGS</h3>
            <p class="arch-card-body">{{ project.architectureText }}</p>
          </div>
        </div>
      </section>

      <!-- SECTION 03: SYSTEM TELEMETRY & SPECS GRID -->
      <section class="golden-section">
        <div class="section-label font-mono">02 / TECHNICAL TELEMETRY</div>
        <h2 class="section-heading font-display">System Specifications</h2>
        
        <div class="telemetry-grid font-mono">
          <div v-for="t in project.telemetry" :key="t.label" class="telemetry-card">
            <span class="telemetry-label">{{ t.label }}</span>
            <span class="telemetry-value">{{ t.value }}</span>
          </div>
        </div>
      </section>

      <!-- SECTION 04: TECH STACK & FOOTER LINKS -->
      <section class="golden-section footer-section">
        <div class="tech-stack-row font-mono">
          <span class="stack-heading">TECH STACK:</span>
          <div class="stack-pills">
            <span v-for="t in project.techStack" :key="t" class="stack-pill">{{ t }}</span>
          </div>
        </div>

        <footer class="detail-footer font-mono">
          <span>Built by Dhruv Mann</span>
          <div class="footer-links">
            <a :href="project.githubUrl" target="_blank" rel="noopener">GitHub</a>
            <a v-if="project.docsUrl" :href="project.docsUrl" target="_blank" rel="noopener">Docs</a>
            <NuxtLink to="/projects">Projects</NuxtLink>
          </div>
          <span>Built for local privacy</span>
        </footer>
      </section>
    </main>
  </div>
</template>

<style scoped>

/* Golden Ratio Spacing System: phi = 1.618 */
.project-detail-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #050507;
  color: #FFE0EB;
  padding-top: 100px;
  padding-bottom: 60px;
  overflow-x: hidden;
}

.background-tint {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(190, 44, 85, 0.15) 0%, transparent 70%),
              radial-gradient(circle at 80% 40%, rgba(42, 12, 27, 0.4) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
}

.golden-stage-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 4.236rem; /* 68px (1.618^3 * 16px) */
}

/* Back Nav Row */
.back-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.786rem;
  font-weight: 700;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 224, 235, 0.7);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-link:hover {
  color: #ffffff;
  transform: translateX(-3px);
}

.badge-tag {
  background: rgba(190, 44, 85, 0.2);
  border: 1px solid #BE2C55;
  color: #FFE0EB;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.08em;
}

/* SECTION 01: HERO SECTION */
.golden-hero-section {
  display: flex;
  flex-direction: column;
  gap: 2.618rem;
}

.hero-text-block {
  display: flex;
  flex-direction: column;
  gap: 1.618rem;
  max-width: 900px;
}

.hero-title {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  line-height: 1.05;
}

.title-primary {
  font-size: clamp(2.618rem, 5.5vw, 4.236rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.title-secondary {
  font-size: clamp(1.618rem, 3.5vw, 2.618rem);
  font-weight: 400;
  color: rgba(255, 224, 235, 0.55);
  letter-spacing: -0.01em;
}

.hero-tagline {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.618;
  margin: 0;
  max-width: 800px;
}

/* Golden Action Buttons */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.golden-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 30px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: all 0.25s ease;
}

.golden-btn.primary-btn {
  background: #ffffff;
  color: #050507;
  border: 1px solid #ffffff;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
}

.golden-btn.primary-btn:hover {
  background: #FFE0EB;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(255, 255, 255, 0.35);
}

.golden-btn.secondary-btn {
  background: rgba(30, 7, 19, 0.8);
  border: 1px solid rgba(255, 224, 235, 0.25);
  color: #FFE0EB;
}

.golden-btn.secondary-btn:hover {
  background: rgba(190, 44, 85, 0.3);
  border-color: #BE2C55;
  color: #ffffff;
  transform: translateY(-2px);
}

.golden-btn.outline-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
}

.golden-btn.outline-btn:hover {
  border-color: #ffffff;
  color: #ffffff;
}

/* Showcase Image Frame */
.hero-image-frame {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(190, 44, 85, 0.35);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.95), 0 0 40px rgba(190, 44, 85, 0.2);
  background: #000000;
}

.showcase-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* SECTION 02 & 03: GOLDEN SECTIONS */
.golden-section {
  display: flex;
  flex-direction: column;
  gap: 1.618rem;
  padding-top: 1.618rem;
  border-top: 1px solid rgba(255, 224, 235, 0.1);
}

.section-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #BE2C55;
  letter-spacing: 0.12em;
}

.section-heading {
  font-size: 1.85rem;
  font-weight: 900;
  color: #FFE0EB;
  margin: 0;
  letter-spacing: -0.01em;
}

.architecture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.618rem;
}

.arch-card {
  background: linear-gradient(180deg, #160711 0%, #0d0408 100%);
  border: 1px solid rgba(190, 44, 85, 0.3);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.arch-card-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: #FFE0EB;
  letter-spacing: 0.08em;
  margin: 0;
}

.arch-card-body {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.618;
  margin: 0;
}

/* Telemetry Grid */
.telemetry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.618rem;
}

.telemetry-card {
  background: rgba(26, 7, 18, 0.6);
  border: 1px solid rgba(255, 224, 235, 0.15);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.telemetry-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: rgba(255, 224, 235, 0.5);
  letter-spacing: 0.1em;
}

.telemetry-value {
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
}

/* Footer Section */
.footer-section {
  gap: 2.618rem;
  padding-bottom: 2rem;
}

.tech-stack-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.stack-heading {
  font-size: 0.72rem;
  font-weight: 800;
  color: rgba(255, 224, 235, 0.6);
}

.stack-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stack-pill {
  background: rgba(190, 44, 85, 0.2);
  border: 1px solid rgba(190, 44, 85, 0.4);
  color: #FFE0EB;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}

.detail-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  color: rgba(255, 224, 235, 0.5);
  border-top: 1px solid rgba(255, 224, 235, 0.1);
  padding-top: 24px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-links a {
  color: rgba(255, 224, 235, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #ffffff;
}
</style>
