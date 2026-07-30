<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DynamicIslandNav from '~/components/core/DynamicIslandNav.vue'

const route = useRoute()
const router = useRouter()
const projectId = computed(() => (route.params.id as string) || 'filemind')

// Listen for ESC key to navigate back to /projects
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    router.push('/projects')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

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
    tagline: 'A private, local-first desktop application that categorizes and organizes your Downloads directory(or any other specified directory) using embedded Ollama AI inference and real-time transaction undo capabilities.',
    badge: 'LOCAL MCP ORGANIZER',
    status: 'PRODUCTION',
    category: 'AI / ML',
    description: 'FileMind is engineered from the ground up for total privacy and zero-leak file context indexing. Operating directly on your local storage, it combines embedded vector embeddings with Ollama local inference to organize unstructured desktop data without transmitting a single byte to remote servers.',
    architectureText: 'Powered by an asynchronous SQLite + Vector DB pipeline, FileMind creates instant local embeddings for your documents, code files, and downloads. Every automated file relocation is tracked in a local transaction log, allowing instant 1-click reversals.',
    githubUrl: 'https://github.com/Dhruv-Mann/filemind',
    demoUrl: 'https://filemind.vercel.app/',
    windowsUrl: 'https://github.com/Dhruv-Mann/filemind/releases',
    macUrl: 'https://github.com/Dhruv-Mann/filemind/releases',
    docsUrl: 'https://github.com/Dhruv-Mann/filemind#readme',
    techStack: ['Tauri v2', 'Rust', 'React 18', 'Ollama AI', 'LanceDB', 'SQLite', 'MCP Protocol'],
    telemetry: [
      { label: 'INFERENCE ENGINE', value: 'Embedded Ollama (Local LLM)' },
      { label: 'SEARCH LATENCY', value: '< 0.42ms Local Context Query' },
      { label: 'PRIVACY GUARANTEE', value: '100% On-Device / Zero API Leaks' },
      { label: 'TRANSACTION LOG', value: 'Real-time Reversible Undo' }
    ]
  },
  'sentinel-vision': {
    id: 'sentinel-vision',
    title: 'Sentinel Vision',
    subtitle: 'Resume Intelligence Platform',
    tagline: 'Turn your resume into a data source. Track who is opening your resume, location hotspots, device types, reading duration, and trigger instant kill-switch link revocation with GDPR/CCPA privacy compliance.',
    badge: 'RESUME INTELLIGENCE',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'Sentinel Vision embeds invisible tracking telemetry into resume links. Job seekers gain real-time analytics on viewer identity, city/country location, device platform, and exact engagement duration without collecting raw PII or relying on invasive third-party ad scripts.',
    architectureText: 'Built with Next.js 16 App Router, React 19, and Supabase PostgreSQL with Row-Level Security (RLS). Features IP anonymization (masked host octets), DNT/GPC opt-out detection, dynamic 1-7 month link expiration, and 1-click link termination.',
    image: '/Sentinel-Vision.png',
    githubUrl: 'https://github.com/Dhruv-Mann/Sentinel-Vision',
    demoUrl: 'https://sentinel-vision-five.vercel.app/',
    docsUrl: 'https://github.com/Dhruv-Mann/Sentinel-Vision#readme',
    techStack: ['Next.js 16', 'React 19', 'TypeScript 5', 'Supabase', 'PostgreSQL RLS', 'Tailwind CSS 4'],
    telemetry: [
      { label: 'GEO INTELLIGENCE', value: 'Real-Time Viewer City & Country' },
      { label: 'PRIVACY & SECURITY', value: 'GDPR / CCPA Compliant + IP Masking' },
      { label: 'ENGAGEMENT METRIC', value: 'Precise Time-On-Page Duration' },
      { label: 'DATABASE & AUTH', value: 'Supabase PostgreSQL + RLS' },
      { label: 'LINK KILL SWITCH', value: 'Instant One-Click Link Revocation' }
    ]
  },
  'project-three': {
    id: 'project-three',
    title: 'Project 03',
    subtitle: 'Upcoming System',
    tagline: 'Final flagship project showcase system in active development. Architecture specs and live deployment coming soon.',
    badge: 'FLAGSHIP SYSTEM',
    status: 'IN DEVELOPMENT',
    category: 'FULL STACK',
    description: 'This is the reserved slot for your third and final featured project.',
    architectureText: 'Full system architecture documentation and interactive telemetry will be populated upon release.',
    githubUrl: 'https://github.com/Dhruv-Mann',
    techStack: ['TypeScript', 'Nuxt 4', 'Nitro', 'PostgreSQL'],
    telemetry: [
      { label: 'STATUS', value: 'In Active Development' },
      { label: 'ARCHITECTURE', value: 'Full-Stack Modern Web SaaS' },
      { label: 'DEPLOYMENT', value: 'Vercel Edge Platform' },
      { label: 'REPOSITORY', value: 'Dhruv-Mann GitHub' }
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
  <div class="project-showcase-page font-body select-none">
    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav active-tab="projects" />

    <!-- Solid Deep Background -->
    <div class="showcase-bg-layer" aria-hidden="true" />

    <main class="showcase-container">
      <!-- Top Navigation & Esc Hint Row -->
      <header class="showcase-nav-bar font-mono">
        <NuxtLink to="/projects" class="showcase-back-link">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>BACK TO PROJECTS</span>
          <span class="esc-hint font-mono">[ESC]</span>
        </NuxtLink>
        <span class="showcase-badge-tag">{{ project.badge }}</span>
      </header>

      <!-- EXECUTIVE HERO HEADER (No Glass, No Neon) -->
      <article class="showcase-article">
        <header class="showcase-header">
          <h1 class="showcase-main-title font-display">{{ project.title }}</h1>
          <h2 class="showcase-subtitle font-display">{{ project.subtitle }}</h2>

          <p class="showcase-abstract font-body">{{ project.tagline }}</p>

          <!-- Solid Interactive Action Buttons (No Glass, No Glow) -->
          <div class="showcase-actions-bar font-mono">
            <a
              v-if="project.windowsUrl"
              :href="project.windowsUrl"
              target="_blank"
              rel="noopener"
              class="solid-btn primary-btn"
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
              class="solid-btn secondary-btn"
            >
              <span>Download .dmg (macOS)</span>
            </a>

            <a
              :href="project.githubUrl"
              target="_blank"
              rel="noopener"
              class="solid-btn outline-btn"
            >
              <span>GitHub Repo</span>
            </a>
          </div>
        </header>

        <hr class="solid-divider" />

        <!-- SECTION 01: OVERVIEW & LOCAL PRIVACY (Prose Style) -->
        <section class="showcase-section">
          <div class="section-tag-num font-mono">01 // OVERVIEW & LOCAL PRIVACY</div>
          <h3 class="section-title-heading font-display">Zero-Leak Local Storage Engine</h3>
          <div class="prose-content font-body">
            <p>{{ project.description }}</p>
          </div>
        </section>

        <hr class="solid-divider" />

        <!-- SECTION 02: SYSTEM ARCHITECTURE & UNDO PIPELINE -->
        <section class="showcase-section">
          <div class="section-tag-num font-mono">02 // TRANSACTIONAL UNDO LOGS</div>
          <h3 class="section-title-heading font-display">Asynchronous SQLite Vector Pipeline</h3>
          <div class="prose-content font-body">
            <p>{{ project.architectureText }}</p>
          </div>
        </section>

        <hr class="solid-divider" />

        <!-- SECTION 03: MINIMAL SPECS GRID (Catchy Minimal UI Components, No Glass) -->
        <section class="showcase-section">
          <div class="section-tag-num font-mono">03 // SYSTEM SPECIFICATIONS</div>
          <h3 class="section-title-heading font-display">Technical Telemetry</h3>
          
          <div class="telemetry-specs-grid font-mono">
            <div v-for="t in project.telemetry" :key="t.label" class="telemetry-tile">
              <span class="tile-label">{{ t.label }}</span>
              <span class="tile-value">{{ t.value }}</span>
            </div>
          </div>
        </section>

        <hr class="solid-divider" />

        <!-- SECTION 04: TECH STACK & FOOTER -->
        <section class="showcase-section showcase-footer-section">
          <div class="stack-tags-row font-mono">
            <span class="stack-title-label">TECH STACK:</span>
            <div class="stack-pills">
              <span v-for="t in project.techStack" :key="t" class="stack-pill-tag">{{ t }}</span>
            </div>
          </div>

          <footer class="showcase-page-footer font-mono">
            <span>Engineering Showcase • Dhruv Mann</span>
            <div class="footer-nav-links">
              <a :href="project.githubUrl" target="_blank" rel="noopener">GitHub</a>
              <a v-if="project.docsUrl" :href="project.docsUrl" target="_blank" rel="noopener">Docs</a>
              <NuxtLink to="/projects">Projects</NuxtLink>
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

/* OLED Palette (No Glass, No Neon, No Blurs):
   Base Background: #08040B (Solid Deep Midnight OLED)
   Primary Title: #FAAA48 (Vivid Amber)
   Secondary Title & Labels: #D8BFD8 (Solid Thistle Violet)
   Prose & Text: #FFDDAC (Warm Soft Cream)
   Surface Tiles: #120713 (Solid Dark Matte)
*/

.project-showcase-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #08040B;
  color: #FFDDAC;
  padding-top: 100px;
  padding-bottom: 80px;
  overflow-x: hidden;
}

.showcase-bg-layer {
  position: absolute;
  inset: 0;
  background: #08040B;
  pointer-events: none;
  z-index: 1;
}

.showcase-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Nav Bar */
.showcase-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.76rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
}

.showcase-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #FAAA48;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.showcase-back-link:hover {
  color: #FFDDAC;
  transform: translateX(-3px);
}

.esc-hint {
  font-size: 0.65rem;
  color: rgba(255, 221, 172, 0.45);
  margin-left: 4px;
}

.showcase-badge-tag {
  background: #150817;
  border: 1px solid #FAAA48;
  color: #FFDDAC;
  padding: 4px 12px;
  border-radius: 4px;
  letter-spacing: 0.08em;
}

/* Article Structure */
.showcase-article {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.showcase-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.showcase-main-title {
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  color: #FAAA48;
  margin: 0;
  line-height: 1.05;
  letter-spacing: 0.01em;
}

.showcase-subtitle {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: #D8BFD8;
  margin: 0;
  letter-spacing: 0em;
}

.showcase-abstract {
  font-size: 1.12rem;
  line-height: 1.65;
  color: rgba(255, 221, 172, 0.9);
  margin: 0.4rem 0 0 0;
}

/* Action Buttons (Solid Matte, Zero Glass, Zero Glow) */
.showcase-actions-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
}

.solid-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.solid-btn.primary-btn {
  background: #FAAA48;
  color: #08040B;
  border: 1px solid #FAAA48;
}

.solid-btn.primary-btn:hover {
  background: #FFDDAC;
  border-color: #FFDDAC;
  transform: translateY(-2px);
}

.solid-btn.secondary-btn {
  background: #180A1A;
  border: 1px solid #D8BFD8;
  color: #D8BFD8;
}

.solid-btn.secondary-btn:hover {
  background: #240E27;
  color: #FFDDAC;
  transform: translateY(-2px);
}

.solid-btn.outline-btn {
  background: transparent;
  border: 1px solid rgba(255, 221, 172, 0.3);
  color: #FFDDAC;
}

.solid-btn.outline-btn:hover {
  border-color: #FAAA48;
  color: #FAAA48;
}

/* Dividers */
.solid-divider {
  border: 0;
  height: 1px;
  background: rgba(250, 170, 72, 0.2);
  margin: 0;
}

/* Sections */
.showcase-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.section-tag-num {
  font-size: 0.72rem;
  font-weight: 800;
  color: #FAAA48;
  letter-spacing: 0.14em;
}

.section-title-heading {
  font-size: 2rem;
  color: #FFDDAC;
  margin: 0;
}

.prose-content {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 221, 172, 0.88);
  border-left: 2px solid #FAAA48;
  padding-left: 1.4rem;
  margin-top: 0.4rem;
}

.prose-content p {
  margin: 0;
}

/* Minimal Telemetry Tiles Grid (Solid Surfaces, Zero Glass) */
.telemetry-specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-top: 0.5rem;
}

.telemetry-tile {
  background: #120713;
  border: 1px solid rgba(250, 170, 72, 0.25);
  border-radius: 8px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.telemetry-tile:hover {
  transform: translateY(-2px);
  border-color: #FAAA48;
}

.tile-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #D8BFD8;
  letter-spacing: 0.1em;
}

.tile-value {
  font-size: 0.88rem;
  font-weight: 700;
  color: #FFDDAC;
  font-variant-numeric: tabular-nums;
}

/* Footer Section */
.showcase-footer-section {
  gap: 2rem;
  margin-top: 1rem;
}

.stack-tags-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.stack-title-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #D8BFD8;
}

.stack-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stack-pill-tag {
  background: #180A1A;
  border: 1px solid rgba(216, 191, 216, 0.35);
  color: #FFDDAC;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 4px;
}

.showcase-page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  color: rgba(255, 221, 172, 0.5);
  border-top: 1px solid rgba(250, 170, 72, 0.18);
  padding-top: 20px;
}

.footer-nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-nav-links a {
  color: #FAAA48;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-nav-links a:hover {
  color: #FFDDAC;
}
</style>
