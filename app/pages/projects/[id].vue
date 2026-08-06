<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DynamicIslandNav from '~/components/core/DynamicIslandNav.vue'
import InteractiveHoverButton from '~/components/ui/InteractiveHoverButton.vue'
import ScrollInception from '~/components/project/ScrollInception.vue'
import type { InceptionScreenData, ActionLink } from '~/components/project/InceptionScreen.vue'

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
    paperBg: 'rgba(0, 161, 155, 0.15)',
    surfaceBg: '#031413',
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
    paperBg: 'rgba(220, 38, 38, 0.15)',
    surfaceBg: '#170404',
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
    paperBg: 'rgba(234, 88, 12, 0.15)',
    surfaceBg: '#170A03',
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

// Inception Screen Data
const screens = computed<InceptionScreenData[]>(() => {
  const p = project.value
  return [
    {
      eyebrow: '01 / OVERVIEW',
      heading: p.title,
      sub: p.description,
      techStack: p.techStack,
      image: p.image
    },
    {
      eyebrow: '02 / ARCHITECTURE',
      heading: p.col2Title.replace(/\[\d+\]\s*/, ''),
      sub: p.architectureText,
      techStack: []
    },
    {
      eyebrow: '03 / PRIVACY & SPEC',
      heading: p.col3Title.replace(/\[\d+\]\s*/, ''),
      sub: p.col3Text,
      techStack: [],
      actions: true
    }
  ]
})

const actionLinks = computed<ActionLink[]>(() => {
  const p = project.value
  const links: ActionLink[] = []
  if (p.githubUrl) links.push({ label: 'GITHUB', href: p.githubUrl })
  if (p.demoUrl) links.push({ label: 'LIVE DEMO', href: p.demoUrl })
  if (p.windowsUrl) links.push({ label: 'WINDOWS .EXE', href: p.windowsUrl })
  if (p.macUrl) links.push({ label: 'MACOS .DMG', href: p.macUrl })
  if (p.docsUrl) links.push({ label: 'DOCS', href: p.docsUrl })
  return links
})

useSeoMeta({
  title: computed(() => `${project.value.title} • Dhruv Mann`),
  description: computed(() => project.value.tagline)
})
</script>

<template>
  <div class="read-page-wrapper font-body select-none">
    <!-- Dynamic Island Navigation Header -->
    <DynamicIslandNav
      active-tab="projects"
      is-read-page
      :accent-color="project.accentColor"
      surface-bg="transparent"
    />

    <!-- TOP NAVIGATION BAR (With J/K Shortcuts & Return Button) -->
    <nav class="m5-top-nav font-mono">
      <div class="m5-top-nav-left">
        <InteractiveHoverButton
          to="/projects"
          :accent-color="project.accentColor"
          @click="triggerHaptic"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>BACK TO PROJECTS</span>
          <span class="m5-esc-hint font-mono">[ESC]</span>
        </InteractiveHoverButton>
      </div>

      <div class="m5-top-nav-right font-mono">
        <InteractiveHoverButton
          :to="`/projects/${prevProject.id}`"
          :accent-color="project.accentColor"
          title="Press J for Previous Project"
          @click="triggerHaptic"
        >
          <span class="m5-key-tag">[J]</span>
          <span class="m5-cycle-label">← {{ prevProject.title }}</span>
        </InteractiveHoverButton>
        <span class="m5-nav-sep">•</span>
        <InteractiveHoverButton
          :to="`/projects/${nextProject.id}`"
          :accent-color="project.accentColor"
          title="Press K for Next Project"
          @click="triggerHaptic"
        >
          <span class="m5-cycle-label">{{ nextProject.title }} →</span>
          <span class="m5-key-tag">[K]</span>
        </InteractiveHoverButton>
      </div>
    </nav>

    <!-- Recursive Scroll Engine -->
    <ScrollInception
      :screens="screens"
      :url="project.demoUrl || 'hub.dhruvmann.com'"
      :button-label="'Explore ' + project.title"
      :accent-color="project.accentColor"
      :surface-bg="project.surfaceBg"
      :action-links="actionLinks"
      :reveal-chrome="true"
    />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Abril+Fatface&family=Archivo:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap');

.font-body, .font-mono {
  font-family: 'Archivo', system-ui, -apple-system, sans-serif !important;
}

.read-page-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #08040B; /* Dark background so InceptionScreen blends in */
  color: #FFDDAC;
}

.m5-top-nav {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  font-size: 0.76rem;
  font-weight: 700;
  z-index: 50;
  pointer-events: none; /* Let clicks pass through empty areas */
}

.m5-top-nav > * {
  pointer-events: auto; /* Re-enable clicks on the buttons */
}

.m5-top-nav-left, .m5-top-nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.m5-esc-hint, .m5-key-tag {
  font-size: 0.65rem;
  opacity: 0.5;
  margin-left: 4px;
}

.m5-nav-sep {
  opacity: 0.3;
}

@media (max-width: 768px) {
  .m5-top-nav {
    top: 80px;
    padding: 0 24px;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
</style>
