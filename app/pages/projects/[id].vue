<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DynamicIslandNav from '~/components/core/DynamicIslandNav.vue'

const route = useRoute()
const router = useRouter()
const projectId = computed(() => (route.params.id as string) || 'filemind')

const isEntered = ref(false)
const isFilemindImageHovered = ref(false)
const activeMobileTab = ref<0 | 1 | 2 | 3>(0)

// J / K Keyboard Navigation Loop
const projectKeys = ['noirsito-ui', 'filemind', 'sentinel-vision'] as const

const currentIndex = computed(() => {
  const idx = projectKeys.indexOf(projectId.value as any)
  return idx >= 0 ? idx : 1
})

const prevProject = computed(() => {
  const prevIdx = (currentIndex.value - 1 + projectKeys.length) % projectKeys.length
  return projectsData[projectKeys[prevIdx]]
})

const nextProject = computed(() => {
  const nextIdx = (currentIndex.value + 1) % projectKeys.length
  return projectsData[projectKeys[nextIdx]]
})

function triggerHaptic() {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(12)
    } catch {}
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.metaKey || e.ctrlKey || e.altKey) return

  if (e.key === 'Escape') {
    triggerHaptic()
    router.push('/projects')
  } else if (e.key.toLowerCase() === 'j') {
    triggerHaptic()
    router.push(`/projects/${prevProject.value.id}`)
  } else if (e.key.toLowerCase() === 'k') {
    triggerHaptic()
    router.push(`/projects/${nextProject.value.id}`)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'
  }
  setTimeout(() => {
    isEntered.value = true
  }, 50)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
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
  paperBg: string
  surfaceBg: string
  githubUrl: string
  demoUrl?: string
  windowsUrl?: string
  macUrl?: string
  docsUrl?: string
  techStack: string[]
  col1Title: string
  col1Text: string
  col2Title: string
  col2Text: string
  col3Title: string
  col3Text: string
  col4Title: string
  col4Text: string
  heroStatement: string
  metaYear: string
  metaAuthor: string
  metaTitle: string
}

const projectsData: Record<string, ProjectDetail> = {
  filemind: {
    id: 'filemind',
    title: 'Filemind',
    subtitle: 'Local MCP Organizer',
    tagline: 'A private, local-first desktop application that categorizes and organizes your Downloads directory using embedded Ollama AI inference.',
    badge: 'LOCAL MCP ORGANIZER',
    status: 'PRODUCTION',
    category: 'AI / ML',
    description: 'FileMind is engineered from the ground up for total privacy and zero-leak file context indexing. Operating directly on your local storage, it combines embedded vector embeddings with Ollama local inference.',
    architectureText: 'Powered by an asynchronous SQLite + Vector DB pipeline, FileMind creates instant local embeddings for your documents. Every automated file relocation is logged for instant 1-click reversals.',
    image: '/filemind.png',
    accentColor: '#00A19B',
    paperBg: '#1A0A09',
    surfaceBg: '#120505',
    githubUrl: 'https://github.com/Dhruv-Mann/filemind',
    demoUrl: 'https://filemind.vercel.app/',
    windowsUrl: 'https://github.com/Dhruv-Mann/filemind/releases',
    macUrl: 'https://github.com/Dhruv-Mann/filemind/releases',
    docsUrl: 'https://github.com/Dhruv-Mann/filemind#readme',
    techStack: ['Tauri v2', 'Rust', 'React 18', 'Ollama AI', 'LanceDB', 'SQLite', 'MCP Protocol'],
    col1Title: '[01] Purpose & Function',
    col1Text: 'A private, local-first desktop application that automatically categorizes and organizes your Downloads directory using embedded Ollama AI inference with real-time reversible undo.',
    col2Title: '[02] Architecture Stack',
    col2Text: 'Tauri v2 • Rust • React 18 • Embedded Ollama LLM • LanceDB Vector Store • SQLite Transaction Log • MCP Protocol.',
    col3Title: '[03] Zero-Leak Privacy',
    col3Text: 'Engineered from the ground up for 100% on-device privacy. Operating directly on local storage, no file context ever leaves your machine.',
    col4Title: '[04] SQLite Vector Log',
    col4Text: 'Powered by an asynchronous SQLite + Vector DB pipeline, creating instant embeddings. Every automated relocation is logged for instant 1-click reversals.',
    heroStatement: 'The ethos of FileMind is deeply rooted in local privacy and architectural speed, combining embedded vector search, local LLM inference, and zero remote server leaks.',
    metaYear: '[2026]',
    metaAuthor: 'Tauri v2 • Rust',
    metaTitle: 'Desktop System App'
  },
  'sentinel-vision': {
    id: 'sentinel-vision',
    title: 'Sentinel Vision',
    subtitle: 'Resume Intelligence Platform',
    tagline: 'Turn your resume into a data source. Track who is opening your resume, location hotspots, device types, and reading duration.',
    badge: 'RESUME INTELLIGENCE',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'Sentinel Vision embeds invisible tracking telemetry into resume links. Job seekers gain real-time analytics on viewer identity, city/country location, and device platform without collecting raw PII.',
    architectureText: 'Built with Next.js 16 App Router, React 19, and Supabase PostgreSQL with Row-Level Security (RLS). Features IP anonymization and dynamic link expiration.',
    image: '/Sentinel-Vision.png',
    accentColor: '#DC2626',
    paperBg: '#1A0A09',
    surfaceBg: '#120505',
    githubUrl: 'https://github.com/Dhruv-Mann/Sentinel-Vision',
    demoUrl: 'https://sentinel-vision-five.vercel.app/',
    docsUrl: 'https://github.com/Dhruv-Mann/Sentinel-Vision#readme',
    techStack: ['Next.js 16', 'React 19', 'TypeScript 5', 'Supabase', 'PostgreSQL RLS', 'Tailwind CSS 4'],
    col1Title: '[01] Purpose & Function',
    col1Text: 'Turn your resume into an active data source. Track who is opening your resume, viewer location hotspots, device types, reading duration, and trigger instant 1-click link revocation.',
    col2Title: '[02] Architecture Stack',
    col2Text: 'Next.js 16 • React 19 • TypeScript 5 • Supabase PostgreSQL • Row-Level Security (RLS) • Tailwind CSS 4.',
    col3Title: '[03] Privacy & Compliance',
    col3Text: 'Built with IP anonymization (masked host octets), DNT/GPC opt-out detection, dynamic 1-7 month link expiration, and full GDPR/CCPA privacy compliance.',
    col4Title: '[04] Link Kill Switch',
    col4Text: 'Empowers job seekers with real-time viewer engagement analytics, country/city detection, and 1-click instant remote link termination.',
    heroStatement: 'The ethos of Sentinel Vision is deeply rooted in applicant privacy and real-time link intelligence, transforming static resume documents into actionable telemetry.',
    metaYear: '[2026]',
    metaAuthor: 'Next.js 16 • Supabase',
    metaTitle: 'Resume Intelligence Platform'
  },
  'noirsito-ui': {
    id: 'noirsito-ui',
    title: 'Noirsito UI',
    subtitle: 'Vue 3 & Nuxt 4 Component Registry & CLI',
    tagline: 'A minimalist, high-performance Vue 3 & Nuxt 4 component registry built with mathematical precision and direct local source code injection.',
    badge: 'COMPONENT REGISTRY & CLI',
    status: 'PRODUCTION',
    category: 'FULL STACK',
    description: 'Unlike traditional UI component libraries requiring heavy runtime dependencies, Noirsito UI provides zero-dependency Vue 3 Single File Components (SFCs) injected directly into your codebase via CLI.',
    architectureText: 'Built with Nuxt 4, Vue 3, and Tailwind CSS. Features direct DOM canvas interaction bypass for 60fps physics, strict layout containment, and automated component scaffolding.',
    image: '/Noirsito-UI.png',
    accentColor: '#EA580C',
    paperBg: '#1A0A09',
    surfaceBg: '#120505',
    githubUrl: 'https://github.com/Dhruv-Mann/Noirsito-UI',
    demoUrl: 'https://noirsito-ui.vercel.app/',
    docsUrl: 'https://github.com/Dhruv-Mann/Noirsito-UI#readme',
    techStack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Node CLI', 'Tailwind CSS'],
    col1Title: '[01] Purpose & Function',
    col1Text: 'A minimalist, high-performance Vue 3 & Nuxt 4 component registry built with mathematical precision, Golden Ratio typography, and direct local source code injection.',
    col2Title: '[02] Architecture Stack',
    col2Text: 'Nuxt 4 • Vue 3 • TypeScript • Node CLI • Tailwind CSS • Direct DOM Bypass • Strict Layout Containment.',
    col3Title: '[03] Zero Dependency Footprint',
    col3Text: 'Unlike heavy runtime UI libraries, Noirsito UI provides zero-dependency Single File Components (SFCs) injected directly into your codebase via a single CLI command.',
    col4Title: '[04] Direct CLI Scaffolding',
    col4Text: 'Execute npx noirsito-ui add <component> to scaffold production-grade components while retaining 100% code ownership with zero technical debt.',
    heroStatement: 'The ethos of Noirsito UI is deeply rooted in mathematical design precision, zero runtime dependencies, and instant CLI source code ownership.',
    metaYear: '[2026]',
    metaAuthor: 'Nuxt 4 • Vue 3',
    metaTitle: 'Component Registry & CLI'
  }
}

const project = computed<ProjectDetail>(() => {
  return projectsData[projectId.value] || projectsData['filemind']
})

const cursorSvgUrl = computed(() => {
  const color = encodeURIComponent(project.value.accentColor)
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='${color}' stroke='%23ffffff' stroke-width='1.5' stroke-linejoin='round' d='M13.64 21.97l-3.22-6.66-3.83 3.83V2.5l14.7 11.47-5.4 1.13 3.22 6.66-5.47 2.21z'/%3E%3C/svg%3E") 3 2, auto`
})

useSeoMeta({
  title: computed(() => `${project.value.title} • Dhruv Mann`),
  description: computed(() => project.value.tagline)
})
</script>

<template>
  <div
    class="modernist-5col-page font-body select-none"
    :class="{ 'is-entered': isEntered }"
    :style="{
      '--m5-paper-bg': project.paperBg,
      '--m5-accent': project.accentColor,
      '--m5-surface-bg': project.surfaceBg,
      '--m5-cursor-url': cursorSvgUrl
    }"
  >
    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav
      active-tab="projects"
      is-read-page
      :accent-color="project.accentColor"
      :surface-bg="project.paperBg"
    />

    <div class="m5-container">
      <!-- TOP NAVIGATION BAR (With J/K Shortcuts & Return Button) -->
      <nav class="m5-top-nav font-mono">
        <div class="m5-top-nav-left">
          <NuxtLink to="/projects" class="m5-back-nav-btn font-body" @click="triggerHaptic">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>BACK TO PROJECTS</span>
            <span class="m5-esc-hint font-mono">[ESC]</span>
          </NuxtLink>
        </div>

        <div class="m5-top-nav-right font-mono">
          <NuxtLink :to="`/projects/${prevProject.id}`" class="m5-cycle-btn" @click="triggerHaptic" title="Press J for Previous Project">
            <span class="m5-key-tag">[J]</span>
            <span class="m5-cycle-label">← {{ prevProject.title }}</span>
          </NuxtLink>
          <span class="m5-nav-sep">•</span>
          <NuxtLink :to="`/projects/${nextProject.id}`" class="m5-cycle-btn" @click="triggerHaptic" title="Press K for Next Project">
            <span class="m5-cycle-label">{{ nextProject.title }} →</span>
            <span class="m5-key-tag">[K]</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- MOBILE TABBED SELECTOR (< 768px viewports) -->
      <div class="m5-mobile-tab-bar font-mono select-none">
        <button
          v-for="(title, i) in ['[01] Purpose', '[02] Stack', '[03] Privacy', '[04] Spec']"
          :key="i"
          class="m5-mobile-tab-btn"
          :class="{ active: activeMobileTab === i }"
          @click="activeMobileTab = i as 0|1|2|3; triggerHaptic();"
        >
          {{ title }}
        </button>
      </div>

      <!-- ROW 1: 4-Column Structured Header Row -->
      <header class="m5-grid m5-grid-4col m5-header-row">
        <!-- Col 1: Purpose & Function -->
        <div class="m5-col" style="--col-index: 0;" :class="{ 'mobile-show': activeMobileTab === 0 }">
          <span class="m5-bracket-num font-body">{{ project.col1Title }}</span>
          <p class="m5-para-text font-body">{{ project.col1Text }}</p>
        </div>

        <!-- Col 2: Architecture Stack -->
        <div class="m5-col" style="--col-index: 1;" :class="{ 'mobile-show': activeMobileTab === 1 }">
          <span class="m5-bracket-num font-body">{{ project.col2Title }}</span>
          <p class="m5-para-text font-body">{{ project.col2Text }}</p>
        </div>

        <!-- Col 3: Privacy & Special Feature -->
        <div class="m5-col" style="--col-index: 2;" :class="{ 'mobile-show': activeMobileTab === 2 }">
          <span class="m5-bracket-num font-body">{{ project.col3Title }}</span>
          <p class="m5-para-text font-body">{{ project.col3Text }}</p>
        </div>

        <!-- Col 4: Engine Spec + Return Link -->
        <div class="m5-col" style="--col-index: 3;" :class="{ 'mobile-show': activeMobileTab === 3 }">
          <div class="m5-top-right-header">
            <span class="m5-bracket-num font-body">{{ project.col4Title }}</span>
            <NuxtLink to="/projects" class="m5-close-glyph font-mono" title="Back to Projects" @click="triggerHaptic">—</NuxtLink>
          </div>
          <p class="m5-para-text font-body">{{ project.col4Text }}</p>
        </div>
      </header>

      <!-- ROW 2: Full-Width 2-Line Hero Editorial Statement -->
      <section class="m5-statement-section">
        <h1 class="m5-hero-statement font-waverly">
          {{ project.heroStatement }}
        </h1>
      </section>

      <!-- ROW 3: Interactive Inner Banner Box -->
      <section
        class="m5-interactive-box"
        :class="{ 'is-box-hovered': isFilemindImageHovered }"
        @mouseenter="isFilemindImageHovered = true; triggerHaptic();"
        @mouseleave="isFilemindImageHovered = false"
      >
        <div class="m5-box-inner">
          <!-- Left Side: App Screenshot -->
          <div class="m5-box-left">
            <div class="m5-item-meta font-body">
              <span class="m5-item-year">{{ project.metaYear }}</span>
              <span class="m5-item-author">{{ project.metaAuthor }}</span>
              <span class="m5-item-title font-body">{{ project.metaTitle }}</span>
            </div>
            <div class="m5-app-screenshot-frame">
              <img :src="project.image" :alt="project.title" class="m5-app-img" />
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

      <!-- ROW 4: Modernist Action Links -->
      <footer class="m5-footer-bar font-body">
        <div class="m5-actions-row">
          <NuxtLink to="/projects" class="m5-action-btn m5-action-back font-body">
            [ ← BACK TO PROJECTS ]
          </NuxtLink>
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
          <a v-if="project.docsUrl" :href="project.docsUrl" target="_blank" rel="noopener" class="m5-action-btn">
            [ READ DOCS ]
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Abril+Fatface&family=Archivo:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap');

/* Typography: Waverly Display Serif */
.font-waverly {
  font-family: 'Waverly', 'Waverly CF', 'Playfair Display', Georgia, serif !important;
}

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
   5 COLUMNS LAYOUT MODERNISM (DATA-DRIVEN FOR ALL PROJECTS)
   ========================================================================== */
.modernist-5col-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: transparent;
  color: #FFFFFF;
  padding-top: 100px;
  padding-bottom: 80px;
  overflow-x: hidden;
  transition: background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.modernist-5col-page,
.modernist-5col-page *,
.modernist-5col-page *::before,
.modernist-5col-page *::after,
.modernist-5col-page a,
.modernist-5col-page button,
.modernist-5col-page input,
.modernist-5col-page [role="button"] {
  cursor: var(--m5-cursor-url, auto) !important;
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

/* Top Navigation Bar */
.m5-top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -1rem;
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-entered .m5-top-nav {
  opacity: 1;
  transform: translateY(0);
}

.m5-top-nav-left, .m5-top-nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.m5-back-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--m5-accent, #AE3B8B);
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.m5-back-nav-btn:hover {
  transform: translateX(-3px);
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--m5-accent, #AE3B8B);
  color: #FFFFFF;
}

.m5-esc-hint {
  font-size: 0.7rem;
  opacity: 0.65;
  margin-left: 2px;
}

.m5-cycle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #FFFFFF;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.m5-cycle-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--m5-accent, #AE3B8B);
  color: var(--m5-accent, #AE3B8B);
}

.m5-key-tag {
  color: var(--m5-accent, #AE3B8B);
  font-weight: 800;
}

.m5-nav-sep {
  color: rgba(255, 255, 255, 0.3);
}

/* Mobile Tabbed Selector (< 768px) */
.m5-mobile-tab-bar {
  display: none;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}

.m5-mobile-tab-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #E5D5D5;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
}

.m5-mobile-tab-btn.active {
  background: var(--m5-accent, #AE3B8B);
  border-color: var(--m5-accent, #AE3B8B);
  color: #FFFFFF;
}

/* Row 1 Header & Staggered Column Animation */
.m5-header-row {
  opacity: 0;
  transform: translateY(-16px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s,
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
}

.m5-col {
  opacity: 0;
  transform: translateY(-12px);
  background: rgba(26, 10, 9, 0.65);
  border: 1px solid rgba(225, 120, 136, 0.18);
  border-radius: 10px;
  padding: 20px 22px;
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.25s ease;
  transition-delay: calc(0.08s + var(--col-index, 0) * 0.07s);
}

.m5-col:hover {
  border-color: var(--m5-accent, #AE3B8B);
}

.is-entered .m5-header-row,
.is-entered .m5-col {
  opacity: 1;
  transform: translateY(0);
}

.m5-bracket-num {
  font-size: 0.85rem;
  color: var(--m5-accent, #AE3B8B);
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.m5-para-text {
  font-size: 0.84rem;
  line-height: 1.65;
  color: #E5D5D5;
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
  color: var(--m5-accent, #AE3B8B);
  text-decoration: none;
  line-height: 1;
  font-weight: 700;
  transition: transform 0.2s ease, color 0.2s ease;
}

.m5-close-glyph:hover {
  transform: scale(1.3);
  color: #FFFFFF;
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
  font-family: 'Waverly', 'Waverly CF', 'Playfair Display', Georgia, serif !important;
  font-size: clamp(2.4rem, 4.2vw, 3.6rem);
  line-height: 1.18;
  letter-spacing: -0.015em;
  color: #FFFFFF;
  font-weight: 400;
  margin: 0;
  width: 100%;
  text-wrap: balance;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
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
  background: var(--m5-surface-bg, rgba(20, 8, 7, 0.92));
  border: 1px solid var(--m5-accent, #AE3B8B);
  border-radius: 12px;
  padding: 28px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.m5-interactive-box:hover .m5-box-inner {
  border-color: var(--m5-accent, #AE3B8B);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.7);
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
  color: #E17888;
}

.m5-item-year {
  color: var(--m5-accent, #AE3B8B);
  font-weight: 600;
}

.m5-item-author {
  color: #FFFFFF;
  font-weight: 500;
}

.m5-item-title {
  color: #E5D5D5;
  font-style: italic;
}

.m5-app-screenshot-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: 280px;
  background: #0E0505;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
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
  height: 100%;
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
  object-fit: cover;
  object-position: right center;
  display: block;
  mix-blend-mode: lighten;
  filter: contrast(1.15) brightness(1.05);
}

/* Row 4 Footer Actions */
.m5-footer-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
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
  gap: 1.5rem;
  flex-wrap: wrap;
}

.m5-action-btn {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--m5-accent, #AE3B8B);
  text-decoration: none;
  letter-spacing: 0.04em;
  padding: 8px 16px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: color 0.2s ease, transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.m5-action-btn:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--m5-accent, #AE3B8B);
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
  .m5-mobile-tab-bar {
    display: flex;
  }
  .m5-top-nav-right {
    font-size: 0.7rem;
  }
  .m5-container {
    padding: 0 20px;
    gap: 2.5rem;
  }
  .m5-header-row .m5-col {
    display: none;
  }
  .m5-header-row .m5-col.mobile-show {
    display: block;
  }
}
</style>
