<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DynamicIslandNav from '~/components/core/DynamicIslandNav.vue'

const route = useRoute()
const router = useRouter()
const projectId = computed(() => (route.params.id as string) || 'filemind')

const isEntered = ref(false)
const isFilemindImageHovered = ref(false)

// Listen for ESC key to navigate back to /projects
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    router.push('/projects')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  // Trigger multi-segment entrance animation sequence smoothly after DOM paint
  requestAnimationFrame(() => {
    isEntered.value = true
  })
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
  image: string
  accentColor: string
  secondaryAccent: string
  proseColor: string
  surfaceBg: string
  pageBg: string
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
    tagline: 'A private, local-first desktop application that categorizes and organizes your Downloads directory (or any other specified directory) using embedded Ollama AI inference and real-time transaction undo capabilities.',
    badge: 'LOCAL MCP ORGANIZER',
    status: 'PRODUCTION',
    category: 'AI / ML',
    description: 'FileMind is engineered from the ground up for total privacy and zero-leak file context indexing. Operating directly on your local storage, it combines embedded vector embeddings with Ollama local inference to organize unstructured desktop data without transmitting a single byte to remote servers.',
    architectureText: 'Powered by an asynchronous SQLite + Vector DB pipeline, FileMind creates instant local embeddings for your documents, code files, and downloads. Every automated file relocation is tracked in a local transaction log, allowing instant 1-click reversals.',
    image: '/filemind.png',
    accentColor: '#34D399',
    secondaryAccent: '#9CA3AF',
    proseColor: '#E5E7EB',
    surfaceBg: '#0F1713',
    pageBg: '#08040B',
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
    accentColor: '#38BDF8',
    secondaryAccent: '#94A3B8',
    proseColor: '#F1F5F9',
    surfaceBg: '#0C141D',
    pageBg: '#08040B',
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
  'noirsito-ui': {
    id: 'noirsito-ui',
    title: 'Noirsito UI',
    subtitle: 'Vue 3 & Nuxt 4 Component Registry & CLI',
    tagline: 'A minimalist, high-performance Vue 3 & Nuxt 4 component registry built with mathematical precision, Golden Ratio typography, and direct local source code injection.',
    badge: 'COMPONENT REGISTRY & CLI',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'Unlike traditional UI component libraries requiring heavy runtime dependencies, Noirsito UI provides zero-dependency Vue 3 Single File Components (SFCs) that you inject directly into your codebase via a single CLI command (`npx noirsito-ui add <component>`). You retain 100% code ownership with zero technical debt.',
    architectureText: 'Built with Nuxt 4, Vue 3, and Tailwind CSS. Features direct DOM canvas interaction bypass for 60fps physics, strict layout containment (`contain: paint layout`), and automated component scaffolding.',
    image: '/Noirsito-UI.png',
    accentColor: '#FAAA48',
    secondaryAccent: '#D8BFD8',
    proseColor: '#FFDDAC',
    surfaceBg: '#150817',
    pageBg: '#08040B',
    githubUrl: 'https://github.com/Dhruv-Mann/Noirsito-UI',
    demoUrl: 'https://noirsito-ui.vercel.app/',
    docsUrl: 'https://github.com/Dhruv-Mann/Noirsito-UI#readme',
    techStack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Node CLI', 'Tailwind CSS'],
    telemetry: [
      { label: 'CLI DISTRIBUTION', value: 'npx noirsito-ui add <component>' },
      { label: 'DOM PERFORMANCE', value: 'Direct DOM Bypass (60fps Physics)' },
      { label: 'CSS CONTAINMENT', value: 'contain: paint layout (Zero Thrashing)' },
      { label: 'DEPENDENCY FOOTPRINT', value: '0 Runtime Dependencies / Copy SFC' }
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
  <!-- 5 COLUMNS LAYOUT MODERNISM (SPECIAL READ PAGE FOR FILEMIND) -->
  <div
    v-if="projectId === 'filemind'"
    class="modernist-5col-page font-body select-none"
    :class="{ 'is-entered': isEntered }"
  >
    <!-- Dynamic Island Navigation Header (Connected to Site Theme) -->
    <DynamicIslandNav
      active-tab="projects"
      is-read-page
      accent-color="#00A19B"
      surface-bg="#E4DDD3"
    />

    <div class="m5-container">
      <!-- ROW 1: 4-Column Structured Header Row -->
      <header class="m5-grid m5-grid-4col m5-header-row">
        <!-- Col 1 (First Place): Purpose & Function -->
        <div class="m5-col">
          <span class="m5-bracket-num font-body">[01] Purpose &amp; Function</span>
          <p class="m5-para-text font-body">
            A private, local-first desktop application that automatically categorizes and organizes your Downloads directory using embedded Ollama AI inference with real-time reversible undo.
          </p>
        </div>

        <!-- Col 2: Architecture Stack -->
        <div class="m5-col">
          <span class="m5-bracket-num font-body">[02] Architecture Stack</span>
          <p class="m5-para-text font-body">
            Tauri v2 • Rust • React 18 • Embedded Ollama LLM • LanceDB Vector Store • SQLite Transaction Log • MCP Protocol.
          </p>
        </div>

        <!-- Col 3: Zero-Leak Privacy -->
        <div class="m5-col">
          <span class="m5-bracket-num font-body">[03] Zero-Leak Privacy</span>
          <p class="m5-para-text font-body">
            Engineered from the ground up for 100% on-device privacy. Operating directly on local storage, no file context ever leaves your machine.
          </p>
        </div>

        <!-- Col 4: SQLite Vector Log + Top Right Close Glyph -->
        <div class="m5-col">
          <div class="m5-top-right-header">
            <span class="m5-bracket-num font-body">[04] SQLite Vector Log</span>
            <NuxtLink to="/projects" class="m5-close-glyph font-mono" title="Back to Projects">—</NuxtLink>
          </div>
          <p class="m5-para-text font-body">
            Powered by an asynchronous SQLite + Vector DB pipeline, creating instant embeddings. Every automated relocation is logged for instant 1-click reversals.
          </p>
        </div>
      </header>

      <!-- ROW 2: Full-Width 2-Line Editorial Statement -->
      <section class="m5-statement-section">
        <h1 class="m5-hero-statement font-display">
          The ethos of FileMind is deeply rooted in local privacy and architectural speed, combining embedded vector search, local LLM inference, and zero remote server leaks.
        </h1>
      </section>

      <!-- ROW 3: Interactive Inner Banner Box (Filemind Screenshot + Same-Size Dithered Reveal) -->
      <section
        class="m5-interactive-box"
        :class="{ 'is-box-hovered': isFilemindImageHovered }"
        @mouseenter="isFilemindImageHovered = true"
        @mouseleave="isFilemindImageHovered = false"
      >
        <div class="m5-box-inner">
          <!-- Left Side: App Screenshot -->
          <div class="m5-box-left">
            <div class="m5-item-meta font-body">
              <span class="m5-item-year">[2026]</span>
              <span class="m5-item-author">Tauri v2 • Rust</span>
              <span class="m5-item-title font-body">Desktop System App</span>
            </div>
            <div class="m5-app-screenshot-frame">
              <img src="/filemind.png" alt="Filemind Desktop App Screenshot" class="m5-app-img" />
            </div>
          </div>

          <!-- Right Side: Same-Size Dithered Image Reveal -->
          <div class="m5-box-right" aria-hidden="true">
            <div class="m5-dither-reveal-frame">
              <img src="/dithered2.png" alt="Dithered Reveal Asset" class="m5-dither-img" />
            </div>
          </div>
        </div>
      </section>

      <!-- ROW 4: Modernist Action Links & Tech Stack -->
      <footer class="m5-footer-bar font-body">
        <div class="m5-actions-row">
          <a v-if="project.windowsUrl" :href="project.windowsUrl" target="_blank" rel="noopener" class="m5-action-btn">
            [ DOWNLOAD .EXE ]
          </a>
          <a v-if="project.macUrl" :href="project.macUrl" target="_blank" rel="noopener" class="m5-action-btn">
            [ DOWNLOAD .DMG ]
          </a>
          <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener" class="m5-action-btn">
            [ LIVE DEMO ]
          </a>
          <a :href="project.githubUrl" target="_blank" rel="noopener" class="m5-action-btn">
            [ GITHUB REPO ]
          </a>
        </div>
      </footer>
    </div>
  </div>

  <!-- STANDARD SHOWCASE FOR OTHER PROJECTS (Sentinel Vision & Noirsito UI) -->
  <div
    v-else
    class="project-showcase-page font-body select-none"
    :class="{ 'is-entered': isEntered }"
    :style="{
      '--project-accent': project.accentColor,
      '--project-secondary': project.secondaryAccent,
      '--project-prose': project.proseColor,
      '--project-surface': project.surfaceBg,
      '--project-page-bg': project.pageBg
    }"
  >
    <!-- Top Signature Shimmer Curtain Reveal Line -->
    <div class="amber-shimmer-curtain" aria-hidden="true" />

    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav
      active-tab="projects"
      is-read-page
      :accent-color="project.accentColor"
      :surface-bg="project.surfaceBg"
    />

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
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener"
              class="solid-btn primary-btn"
            >
              <span>Live System Demo</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>

            <a
              v-if="project.windowsUrl"
              :href="project.windowsUrl"
              target="_blank"
              rel="noopener"
              class="solid-btn secondary-btn"
            >
              <span>Download .exe</span>
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

        <!-- HERO VISUAL SCREENSHOT BEZEL FRAME -->
        <div v-if="project.image" class="hero-image-frame">
          <div class="frame-header-bar font-mono">
            <div class="frame-dots">
              <span class="frame-dot red" />
              <span class="frame-dot yellow" />
              <span class="frame-dot green" />
            </div>
            <span class="frame-url-title">{{ project.id }}.system.app</span>
            <span class="frame-status-badge">{{ project.status }}</span>
          </div>
          <div class="frame-image-wrapper">
            <img :src="project.image" :alt="project.title" class="hero-project-img" />
          </div>
        </div>

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
  background: var(--project-page-bg, #08040B);
  color: var(--project-prose, #FFDDAC);
  padding-top: 100px;
  padding-bottom: 80px;
  overflow-x: hidden;
}

/* Ambient Top Shimmer Curtain Reveal */
.amber-shimmer-curtain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--project-accent, #FAAA48) 40%, #FFDDAC 50%, var(--project-accent, #FAAA48) 60%, transparent);
  z-index: 99;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-entered .amber-shimmer-curtain {
  transform: scaleX(1);
}

.showcase-bg-layer {
  position: absolute;
  inset: 0;
  background: var(--project-page-bg, #08040B);
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

/* Segment 2: Nav Bar Entrance */
.showcase-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.76rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(-16px);
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.08s,
              transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
}

.is-entered .showcase-nav-bar {
  opacity: 1;
  transform: translateY(0);
}

.showcase-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--project-accent, #FAAA48);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.showcase-back-link:hover {
  color: var(--project-prose, #FFDDAC);
  transform: translateX(-3px);
}

.esc-hint {
  font-size: 0.65rem;
  color: var(--project-secondary, #D8BFD8);
  opacity: 0.6;
  margin-left: 4px;
}

.showcase-badge-tag {
  background: var(--project-surface, #150817);
  border: 1px solid var(--project-accent, #FAAA48);
  color: var(--project-prose, #FFDDAC);
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

/* Segment 3: Main Title Clip & 3D Blur Reveal */
.showcase-main-title {
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  color: var(--project-accent, #FAAA48);
  margin: 0;
  line-height: 1.05;
  letter-spacing: 0.01em;
  opacity: 0;
  filter: blur(10px);
  transform: translateY(28px) rotateX(10deg);
  transform-origin: bottom center;
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s,
              filter 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s,
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s;
}

.is-entered .showcase-main-title {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0) rotateX(0deg);
}

/* Hero Visual Screenshot Bezel Frame */
.hero-image-frame {
  margin-top: 1rem;
  border-radius: 12px;
  background: var(--project-surface, #0E050D);
  border: 1px solid var(--project-accent, #FAAA48);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  opacity: 0;
  transform: translateY(22px) scale(0.98);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s,
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s,
              border-color 0.3s ease;
}

.is-entered .hero-image-frame {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.frame-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--project-surface, rgba(14, 5, 13, 0.95));
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.frame-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.frame-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.frame-dot.red { background: #FF5F56; }
.frame-dot.yellow { background: #FFBD2E; }
.frame-dot.green { background: #27C93F; }

.frame-url-title {
  font-size: 0.7rem;
  color: var(--project-accent, #FAAA48);
  letter-spacing: 0.08em;
}

.frame-status-badge {
  font-size: 0.62rem;
  color: var(--project-prose, #FFDDAC);
  background: rgba(255, 255, 255, 0.06);
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.06em;
}

.frame-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--project-surface, #050206);
  overflow: hidden;
}

.hero-project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-image-frame:hover .hero-project-img {
  transform: scale(1.02);
}

/* Segment 4: Subtitle & Abstract Paragraph */
/* Segment 4: Subtitle & Abstract Paragraph */
.showcase-subtitle {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: var(--project-secondary, #D8BFD8);
  margin: 0;
  letter-spacing: 0em;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.26s,
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.26s;
}

.is-entered .showcase-subtitle {
  opacity: 1;
  transform: translateY(0);
}

.showcase-abstract {
  font-size: 1.12rem;
  line-height: 1.65;
  color: var(--project-prose, rgba(255, 221, 172, 0.9)) !important;
  margin: 0.4rem 0 0 0;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.34s,
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.34s;
}

.is-entered .showcase-abstract {
  opacity: 1;
  transform: translateY(0);
}

/* Segment 5: Action Buttons (Solid Matte, Zero Glass, Zero Glow) */
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
  opacity: 0;
  transform: translateY(14px) scale(0.96);
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.showcase-actions-bar .solid-btn:nth-child(1) { transition-delay: 0.42s, 0.42s, 0s, 0s, 0s; }
.showcase-actions-bar .solid-btn:nth-child(2) { transition-delay: 0.48s, 0.48s, 0s, 0s, 0s; }
.showcase-actions-bar .solid-btn:nth-child(3) { transition-delay: 0.54s, 0.54s, 0s, 0s, 0s; }

.is-entered .solid-btn {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.solid-btn.primary-btn {
  background: var(--project-accent, #FAAA48);
  color: #08040B;
  border: 1px solid var(--project-accent, #FAAA48);
}

.solid-btn.primary-btn:hover {
  background: #FFFFFF;
  border-color: #FFFFFF;
  transform: translateY(-2px);
}

.solid-btn.secondary-btn {
  background: var(--project-surface, #180A1A);
  border: 1px solid var(--project-secondary, #D8BFD8);
  color: var(--project-secondary, #D8BFD8);
}

.solid-btn.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  transform: translateY(-2px);
}

.solid-btn.outline-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--project-prose, #FFDDAC);
}

.solid-btn.outline-btn:hover {
  border-color: var(--project-accent, #FAAA48);
  color: var(--project-accent, #FAAA48);
}

/* Dividers Stagger */
.solid-divider {
  border: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
}

.is-entered .solid-divider {
  transform: scaleX(1);
}

/* Segment 6: Sections Stagger */
.showcase-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.showcase-section:nth-of-type(1) { transition-delay: 0.52s; }
.showcase-section:nth-of-type(2) { transition-delay: 0.63s; }
.showcase-section:nth-of-type(3) { transition-delay: 0.74s; }
.showcase-section:nth-of-type(4) { transition-delay: 0.85s; }

.is-entered .showcase-section {
  opacity: 1;
  transform: translateY(0);
}

.section-tag-num {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--project-accent, #FAAA48);
  letter-spacing: 0.14em;
}

.section-title-heading {
  font-size: 2rem;
  color: var(--project-prose, #FFDDAC);
  margin: 0;
}

.prose-content {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--project-prose, rgba(255, 221, 172, 0.88));
  border-left: 2px solid var(--project-accent, #FAAA48);
  padding-left: 1.4rem;
  margin-top: 0.4rem;
}

.prose-content p {
  margin: 0;
  color: var(--project-prose, rgba(255, 221, 172, 0.88)) !important;
}

.prose-content p::first-letter {
  font-family: 'Abril Fatface', Georgia, serif;
  font-size: 2.7rem;
  line-height: 0.85;
  float: left;
  margin-right: 0.6rem;
  margin-top: 0.1rem;
  color: var(--project-accent, #FAAA48);
}

/* Segment 7: Telemetry Tiles Stagger (Solid Surfaces, Zero Glass) */
.telemetry-specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-top: 0.5rem;
}

.telemetry-tile {
  background: var(--project-surface, #120713);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.25s ease;
}

.telemetry-specs-grid .telemetry-tile:nth-child(1) { transition-delay: 0.76s, 0.76s, 0s; }
.telemetry-specs-grid .telemetry-tile:nth-child(2) { transition-delay: 0.82s, 0.82s, 0s; }
.telemetry-specs-grid .telemetry-tile:nth-child(3) { transition-delay: 0.88s, 0.88s, 0s; }
.telemetry-specs-grid .telemetry-tile:nth-child(4) { transition-delay: 0.94s, 0.94s, 0s; }

.is-entered .telemetry-tile {
  opacity: 1;
  transform: translateY(0);
}

.telemetry-tile:hover {
  transform: translateY(-2px);
  border-color: var(--project-accent, #FAAA48);
}

.tile-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--project-secondary, #D8BFD8);
  letter-spacing: 0.1em;
}

.tile-value {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--project-prose, #FFDDAC);
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
  color: var(--project-secondary, #D8BFD8);
}

.stack-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stack-pill-tag {
  background: var(--project-surface, #180A1A);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--project-prose, #FFDDAC);
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
  color: var(--project-secondary, rgba(255, 221, 172, 0.5));
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 20px;
}

.footer-nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-nav-links a {
  color: var(--project-accent, #FAAA48);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-nav-links a:hover {
  color: var(--project-prose, #FFDDAC);
}

/* ==========================================================================
   5 COLUMNS LAYOUT MODERNISM (FILEMIND READ PAGE - #E4DDD3 & #00A19B TEAL)
   ========================================================================== */
.modernist-5col-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #E4DDD3; /* Warm Paper Canvas Requested by User */
  color: #1C1B18;       /* Deep Ink Typography */
  padding-top: 100px;
  padding-bottom: 80px;
  overflow-x: hidden;
}

.m5-container {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
}

.m5-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 28px;
}

.m5-grid-4col {
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

/* Row 1 Header */
.m5-header-row {
  opacity: 0;
  transform: translateY(-16px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s,
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
}

.is-entered .m5-header-row {
  opacity: 1;
  transform: translateY(0);
}

.m5-bracket-num {
  font-size: 0.85rem;
  color: #00A19B; /* Vivid Teal Accent Requested by User */
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.m5-para-text {
  font-size: 0.82rem;
  line-height: 1.6;
  color: #4A4740; /* Readable Ink Text */
  margin: 0;
}

.m5-top-right-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.m5-close-glyph {
  font-size: 1.5rem;
  color: #00A19B;
  text-decoration: none;
  line-height: 1;
  font-weight: 700;
  transition: transform 0.2s ease, color 0.2s ease;
}

.m5-close-glyph:hover {
  transform: scale(1.3);
  color: #1C1B18;
}

/* Row 2 Hero Statement */
.m5-statement-section {
  margin: 1rem 0;
  width: 100%;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.is-entered .m5-statement-section {
  opacity: 1;
  transform: translateY(0);
}

.m5-hero-statement {
  font-size: clamp(2.4rem, 4.2vw, 3.6rem);
  line-height: 1.18;
  letter-spacing: -0.015em;
  color: #1C1B18; /* Deep Ink Title */
  font-weight: 400;
  margin: 0;
  width: 100%;
  text-wrap: balance;
}

/* Row 3 Interactive Inner Banner Box */
.m5-interactive-box {
  width: 100%;
  margin: 0.5rem 0;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s,
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s;
}

.is-entered .m5-interactive-box {
  opacity: 1;
  transform: translateY(0);
}

.m5-box-inner {
  width: 100%;
  background: #080A0F; /* Solid Dark Inner Banner Box */
  border: 1px solid rgba(0, 161, 155, 0.35); /* Teal Accent Border */
  border-radius: 12px;
  padding: 28px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.m5-interactive-box:hover .m5-box-inner {
  border-color: #00A19B;
  box-shadow: 0 20px 48px rgba(0, 161, 155, 0.2);
}

.m5-box-left {
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 5;
}

.m5-item-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8rem;
  color: #9CA3AF;
}

.m5-item-year {
  color: #00A19B;
  font-weight: 600;
}

.m5-item-author {
  color: #E5E7EB;
  font-weight: 500;
}

.m5-item-title {
  color: #9CA3AF;
  font-style: italic;
}

.m5-app-screenshot-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: 280px;
  background: #080A0F;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.m5-app-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.m5-box-right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 48%;
  z-index: 4;
  pointer-events: none;
}

.m5-dither-reveal-frame {
  width: 100%;
  height: 100%; /* Top to bottom fill inside black box */
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  transform: translateX(16px);
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.4) 15%, black 45%);
  mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.4) 15%, black 45%);
}

.is-box-hovered .m5-dither-reveal-frame {
  opacity: 1;
  transform: translateX(0);
}

.m5-dither-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fills top to bottom seamlessly */
  object-position: right center;
  display: block;
  mix-blend-mode: lighten; /* Black BG disappears, particles blend seamlessly into dark box */
  filter: contrast(1.15) brightness(1.05);
}

/* Row 4 Footer Actions */
.m5-footer-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid rgba(28, 27, 24, 0.18);
  padding-top: 2rem;
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.48s;
}

.is-entered .m5-footer-bar {
  opacity: 1;
}

.m5-actions-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.m5-action-btn {
  font-size: 0.85rem;
  font-weight: 700;
  color: #00A19B;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s ease, transform 0.2s ease;
}

.m5-action-btn:hover {
  color: #1C1B18;
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .m5-grid-4col {
    grid-template-columns: repeat(2, 1fr);
  }
  .m5-box-inner {
    flex-direction: column;
    align-items: stretch;
  }
  .m5-box-left, .m5-box-right {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .m5-grid-4col {
    grid-template-columns: 1fr;
  }
  .m5-container {
    padding: 0 20px;
    gap: 3rem;
  }
}
</style>
