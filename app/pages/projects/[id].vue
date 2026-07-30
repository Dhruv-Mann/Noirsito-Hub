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
  title: computed(() => `${project.value.title} • Dhruv Mann Documentation`),
  description: computed(() => project.value.tagline)
})
</script>

<template>
  <div class="docs-detail-page font-body select-none">
    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav active-tab="projects" />

    <!-- Ambient Subtle Lavender Background Glow -->
    <div class="docs-background-tint" aria-hidden="true" />

    <main class="docs-container">
      <!-- Back Link & Breadcrumb Bar -->
      <header class="docs-nav-bar font-mono">
        <NuxtLink to="/projects" class="docs-back-link">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>DOCS / PROJECTS</span>
        </NuxtLink>
        <span class="docs-badge-tag">{{ project.badge }}</span>
      </header>

      <!-- DOCUMENTATION TITLE & ABSTRACT HEADER (Inverted Light Theme, No Cards) -->
      <article class="docs-article">
        <header class="docs-header">
          <h1 class="docs-main-title font-display">{{ project.title }}</h1>
          <h2 class="docs-subtitle font-display">{{ project.subtitle }}</h2>

          <p class="docs-abstract font-body">{{ project.tagline }}</p>

          <!-- Documentation Action Link Pills -->
          <div class="docs-actions-bar font-mono">
            <a
              v-if="project.windowsUrl"
              :href="project.windowsUrl"
              target="_blank"
              rel="noopener"
              class="docs-pill-btn primary-pill"
            >
              <span>Download .exe (Windows)</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>

            <a
              v-if="project.macUrl"
              :href="project.macUrl"
              target="_blank"
              rel="noopener"
              class="docs-pill-btn secondary-pill"
            >
              <span>Download .dmg (macOS)</span>
            </a>

            <a
              :href="project.githubUrl"
              target="_blank"
              rel="noopener"
              class="docs-pill-btn outline-pill"
            >
              <span>Source Repository</span>
            </a>
          </div>
        </header>

        <hr class="docs-divider" />

        <!-- SECTION 01: OVERVIEW & LOCAL PRIVACY (Prose Style) -->
        <section class="docs-section">
          <div class="docs-section-num font-mono">01. OVERVIEW & PRIVACY MODEL</div>
          <h3 class="docs-section-title font-display">Zero-Leak Local Storage Architecture</h3>
          <div class="docs-prose font-body">
            <p>{{ project.description }}</p>
          </div>
        </section>

        <hr class="docs-divider" />

        <!-- SECTION 02: SYSTEM ARCHITECTURE & UNDO PIPELINE -->
        <section class="docs-section">
          <div class="docs-section-num font-mono">02. TRANSACTIONAL UNDO LOGS</div>
          <h3 class="docs-section-title font-display">Asynchronous SQLite Vector Pipeline</h3>
          <div class="docs-prose font-body">
            <p>{{ project.architectureText }}</p>
          </div>
        </section>

        <hr class="docs-divider" />

        <!-- SECTION 03: TECHNICAL SPECS TABLE (Pure Docs Table, No Cards) -->
        <section class="docs-section">
          <div class="docs-section-num font-mono">03. SYSTEM TELEMETRY & SPECIFICATIONS</div>
          <h3 class="docs-section-title font-display">Technical Specifications</h3>
          
          <table class="docs-specs-table font-mono">
            <tbody>
              <tr v-for="t in project.telemetry" :key="t.label">
                <td class="spec-label">{{ t.label }}</td>
                <td class="spec-value">{{ t.value }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr class="docs-divider" />

        <!-- SECTION 04: TECH STACK & FOOTER -->
        <section class="docs-section docs-footer-section">
          <div class="docs-stack-row font-mono">
            <span class="docs-stack-label">TECH STACK:</span>
            <div class="docs-stack-tags">
              <span v-for="t in project.techStack" :key="t" class="docs-stack-tag">{{ t }}</span>
            </div>
          </div>

          <footer class="docs-page-footer font-mono">
            <span>Engineering Documentation • Dhruv Mann</span>
            <div class="docs-footer-links">
              <a :href="project.githubUrl" target="_blank" rel="noopener">GitHub</a>
              <a v-if="project.docsUrl" :href="project.docsUrl" target="_blank" rel="noopener">Docs</a>
              <NuxtLink to="/projects">Projects Showcase</NuxtLink>
            </div>
          </footer>
        </section>
      </article>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Archivo:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap');

/* Typography Pairing: Abril Fatface + Archivo */
.font-display {
  font-family: 'Abril Fatface', Georgia, serif !important;
  font-weight: 400 !important;
}

.font-body, .font-mono {
  font-family: 'Archivo', system-ui, -apple-system, sans-serif !important;
}

/* Inverted Color Palette:
   Base Background: #D3DFFF (Soft Powder Ice Blue)
   Primary Headings & Text: #0B0812 (Deep Night Velvet Violet)
   Subtitles & Accents: #4A2548 (Thistle Dark Violet)
*/

.docs-detail-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #D3DFFF;
  color: #0B0812;
  padding-top: 100px;
  padding-bottom: 80px;
  overflow-x: hidden;
}

.docs-background-tint {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(216, 191, 216, 0.4) 0%, transparent 65%),
              radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.6) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.docs-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Nav Bar */
.docs-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.76rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
}

.docs-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4A2548;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.docs-back-link:hover {
  color: #0B0812;
  transform: translateX(-3px);
}

.docs-badge-tag {
  background: rgba(74, 37, 72, 0.1);
  border: 1px solid rgba(74, 37, 72, 0.3);
  color: #4A2548;
  padding: 4px 12px;
  border-radius: 4px;
  letter-spacing: 0.08em;
}

/* Article Structure */
.docs-article {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.docs-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.docs-main-title {
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  color: #0B0812;
  margin: 0;
  line-height: 1.05;
  letter-spacing: 0.01em;
  text-shadow: 0 4px 20px rgba(11, 8, 18, 0.1);
}

.docs-subtitle {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: #4A2548;
  margin: 0;
  letter-spacing: 0em;
}

.docs-abstract {
  font-size: 1.15rem;
  line-height: 1.7;
  color: rgba(11, 8, 18, 0.88);
  margin: 0.5rem 0 0 0;
}

/* Action Pills */
.docs-actions-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
}

.docs-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.docs-pill-btn.primary-pill {
  background: #0B0812;
  color: #D3DFFF;
  border: 1px solid #0B0812;
}

.docs-pill-btn.primary-pill:hover {
  background: #1D142E;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 18px rgba(11, 8, 18, 0.25);
}

.docs-pill-btn.secondary-pill {
  background: rgba(74, 37, 72, 0.12);
  border: 1px solid #4A2548;
  color: #4A2548;
}

.docs-pill-btn.secondary-pill:hover {
  background: rgba(74, 37, 72, 0.2);
  color: #0B0812;
  transform: translateY(-2px);
}

.docs-pill-btn.outline-pill {
  background: transparent;
  border: 1px solid rgba(11, 8, 18, 0.3);
  color: #0B0812;
}

.docs-pill-btn.outline-pill:hover {
  border-color: #0B0812;
  background: rgba(11, 8, 18, 0.05);
}

/* Dividers */
.docs-divider {
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(11, 8, 18, 0.2), rgba(74, 37, 72, 0.05));
  margin: 0;
}

/* Sections */
.docs-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.docs-section-num {
  font-size: 0.72rem;
  font-weight: 800;
  color: #4A2548;
  letter-spacing: 0.14em;
}

.docs-section-title {
  font-size: 2rem;
  color: #0B0812;
  margin: 0;
}

.docs-prose {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(11, 8, 18, 0.88);
  border-left: 2px solid #4A2548;
  padding-left: 1.4rem;
  margin-top: 0.4rem;
}

.docs-prose p {
  margin: 0;
}

/* Pure Documentation Specs Table (No Cards!) */
.docs-specs-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  font-size: 0.86rem;
}

.docs-specs-table td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(11, 8, 18, 0.14);
}

.docs-specs-table tr:last-child td {
  border-bottom: none;
}

.spec-label {
  color: #4A2548;
  font-weight: 800;
  letter-spacing: 0.08em;
  width: 35%;
}

.spec-value {
  color: #0B0812;
  font-weight: 600;
}

/* Footer Section */
.docs-footer-section {
  gap: 2rem;
  margin-top: 1rem;
}

.docs-stack-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.docs-stack-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #4A2548;
}

.docs-stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.docs-stack-tag {
  background: rgba(74, 37, 72, 0.1);
  border: 1px solid rgba(74, 37, 72, 0.3);
  color: #0B0812;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 4px;
}

.docs-page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  color: rgba(11, 8, 18, 0.6);
  border-top: 1px solid rgba(11, 8, 18, 0.18);
  padding-top: 20px;
}

.docs-footer-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.docs-footer-links a {
  color: #4A2548;
  text-decoration: none;
  transition: color 0.2s ease;
}

.docs-footer-links a:hover {
  color: #0B0812;
}
</style>
