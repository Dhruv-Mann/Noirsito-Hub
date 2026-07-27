<template>
  <div class="tech-stack-showcase font-body">
    <!-- Ambient Background Lighting Glows -->
    <div class="ambient-glow glow-pink" />
    <div class="ambient-glow glow-amber" />
    <div class="ambient-glow glow-cyan" />

    <div class="tech-stack-container">
      <!-- Top Action Bar -->
      <div class="top-action-bar">
        <div class="system-status-badge font-mono select-none">
          <span class="pulse-dot" />
          <span>TECH STACK ENGINE // ONLINE</span>
        </div>

        <div class="action-buttons">
          <button class="btn-return-home font-mono" @click="$emit('returnHome')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Return to Home</span>
          </button>
        </div>
      </div>

      <!-- Main Header Section -->
      <header class="showcase-header">
        <h1 class="showcase-title font-display">
          <span>ENGINEERING & </span>
          <span class="gradient-text">TECH STACK</span>
        </h1>
        <p class="showcase-subtitle">
          First-principles problem solving • High-performance web canvas • Production-grade architecture
        </p>

        <!-- Category Filter Tabs -->
        <div class="category-tabs font-mono select-none">
          <button 
            v-for="tab in tabs" 
            :key="tab.id" 
            class="tab-btn" 
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <span class="tab-icon" :style="{ color: tab.color }">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </header>

      <!-- Tech Stack Grid Cards -->
      <div class="tech-grid">
        <div 
          v-for="cat in filteredCategories" 
          :key="cat.id" 
          class="tech-card"
          :style="{ '--accent-color': cat.accentColor, '--glow-color': cat.glowColor }"
        >
          <div class="card-header">
            <div class="card-title-group">
              <span class="category-badge font-mono" :style="{ color: cat.accentColor }">
                {{ cat.badge }}
              </span>
              <h2 class="card-title font-display">{{ cat.title }}</h2>
            </div>
            <div class="icon-bubble" :style="{ borderColor: cat.accentColor, color: cat.accentColor }">
              <component :is="cat.iconSvg" />
            </div>
          </div>

          <p class="card-description">{{ cat.description }}</p>

          <!-- Skills Pill Tags Grid -->
          <div class="skills-wrapper font-mono">
            <div 
              v-for="skill in cat.skills" 
              :key="skill.name" 
              class="skill-pill"
              :style="{ '--pill-accent': cat.accentColor }"
            >
              <span class="skill-dot" :style="{ backgroundColor: cat.accentColor }" />
              <span class="skill-name">{{ skill.name }}</span>
              <span v-if="skill.level" class="skill-level">{{ skill.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'

defineEmits<{
  (e: 'returnHome'): void
}>()

const activeTab = ref('all')

const tabs = [
  { id: 'all', label: 'ALL STACK', icon: '⚡', color: '#FAFAFA' },
  { id: 'ai', label: 'AI & ML', icon: '🧠', color: '#FF9500' },
  { id: 'frontend', label: 'FRONTEND & UX', icon: '🎨', color: '#FF2A5F' },
  { id: 'backend', label: 'BACKEND & SYSTEMS', icon: '⚙️', color: '#64D2FF' },
  { id: 'devops', label: 'DEVOPS & TOOLS', icon: '🚀', color: '#30D158' }
]

// Category SVG Icons
const AiIcon = () => h('svg', { viewBox: '0 0 24 24', width: '20', height: '20', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
])

const FrontendIcon = () => h('svg', { viewBox: '0 0 24 24', width: '20', height: '20', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M4 6h16M4 12h16M4 18h16', 'stroke-linecap': 'round' })
])

const BackendIcon = () => h('svg', { viewBox: '0 0 24 24', width: '20', height: '20', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('rect', { x: '2', y: '3', width: '20', height: '6', rx: '2' }),
  h('rect', { x: '2', y: '15', width: '20', height: '6', rx: '2' }),
  h('path', { d: 'M6 6h.01M6 18h.01' })
])

const DevOpsIcon = () => h('svg', { viewBox: '0 0 24 24', width: '20', height: '20', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M22 12A10 10 0 0012 2v10zM12 22A10 10 0 0022 12H12z', 'stroke-linecap': 'round' })
])

const categories = [
  {
    id: 'ai',
    title: 'AI & ML Systems',
    badge: '01 // INTELLIGENCE ENGINE',
    accentColor: '#FF9500',
    glowColor: 'rgba(255, 149, 0, 0.25)',
    iconSvg: AiIcon,
    description: 'Durable backend AI agents, neural pipelines, LLM orchestration & local vector search engines.',
    skills: [
      { name: 'PyTorch', level: 'Core' },
      { name: 'Eve Agent Framework', level: 'Expert' },
      { name: 'Transformers', level: 'Advanced' },
      { name: 'LangChain', level: 'Production' },
      { name: 'Ollama / Local LLMs', level: 'Runtime' },
      { name: 'CUDA Optimization', level: 'Systems' },
      { name: 'Qdrant Vector DB', level: 'Storage' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend & Interactive UX',
    badge: '02 // DESKTOP-GRADE CANVAS',
    accentColor: '#FF2A5F',
    glowColor: 'rgba(255, 42, 95, 0.25)',
    iconSvg: FrontendIcon,
    description: '60fps desktop-grade web interfaces, direct DOM manipulation, WebGL shaders & kinetic motion design.',
    skills: [
      { name: 'Nuxt 4', level: 'Framework' },
      { name: 'Vue 3 / Composition', level: 'Expert' },
      { name: 'TypeScript', level: 'Strict' },
      { name: 'WebGL & Canvas 2D', level: 'Graphics' },
      { name: 'Lenis Smooth Scroll', level: 'Physics' },
      { name: 'Vanilla CSS & Motion', level: 'Design' },
      { name: 'Pinia / ShallowRef', level: 'State' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Architecture',
    badge: '03 // DISTRIBUTED RUNTIMES',
    accentColor: '#64D2FF',
    glowColor: 'rgba(100, 210, 255, 0.25)',
    iconSvg: BackendIcon,
    description: 'High-throughput Nitro server engines, structured API repositories, PostgreSQL schemas & real-time sockets.',
    skills: [
      { name: 'Nitro Engine / H3', level: 'Server' },
      { name: 'Node.js & Deno', level: 'Runtime' },
      { name: 'PostgreSQL', level: 'Database' },
      { name: 'Appwrite Cloud', level: 'BaaS' },
      { name: 'Redis Cache', level: 'Memory' },
      { name: 'REST & WebSockets', level: 'Protocols' },
      { name: 'Service Repository', level: 'Pattern' }
    ]
  },
  {
    id: 'devops',
    title: 'Systems & Infrastructure',
    badge: '04 // DEPLOYMENT & TOOLING',
    accentColor: '#30D158',
    glowColor: 'rgba(48, 209, 88, 0.25)',
    iconSvg: DevOpsIcon,
    description: 'Zero-downtime deployment pipelines, containerization, bundle optimizations & automated CI/CD workflows.',
    skills: [
      { name: 'Docker / Compose', level: 'Containers' },
      { name: 'Git & GitHub Actions', level: 'CI/CD' },
      { name: 'Linux / Server Ops', level: 'OS' },
      { name: 'Vite Bundler', level: 'Build' },
      { name: 'Vercel / Edge Deploy', level: 'Cloud' },
      { name: 'Performance Profiling', level: 'Audit' }
    ]
  }
]

const filteredCategories = computed(() => {
  if (activeTab.value === 'all') return categories
  return categories.filter(c => c.id === activeTab.value)
})
</script>

<style scoped>
.tech-stack-showcase {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at 50% 30%, #1a080d 0%, #0c0406 60%, #030102 100%);
  color: #FAFAFA;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  padding: 40px 24px 80px;
}

/* Ambient Background Lighting */
.ambient-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  opacity: 0.15;
}

.glow-pink {
  top: -100px;
  left: 20%;
  background: #FF2A5F;
}

.glow-amber {
  top: 300px;
  right: 10%;
  background: #FF9500;
}

.glow-cyan {
  bottom: 0;
  left: 30%;
  background: #64D2FF;
}

.tech-stack-container {
  max-width: 1180px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* Top Action Bar */
.top-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.system-status-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.7);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #30D158;
  box-shadow: 0 0 10px #30D158;
  animation: pulse-ring 2s infinite ease-in-out;
}

@keyframes pulse-ring {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-curtain-control,
.btn-hub-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
  border-radius: var(--radius-sm, 6px);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.btn-curtain-control {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FAFAFA;
}

.btn-curtain-control:hover {
  background: rgba(255, 42, 95, 0.2);
  border-color: #FF2A5F;
  color: #ffffff;
}

.btn-hub-link {
  background: #FF2A5F;
  border: 1px solid #FF2A5F;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(255, 42, 95, 0.4);
}

.btn-hub-link:hover {
  background: #E01E50;
  box-shadow: 0 0 30px rgba(255, 42, 95, 0.7);
  transform: translateY(-1px);
}

/* Header Section */
.showcase-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.showcase-title {
  font-size: clamp(2.5rem, 5.5vw, 4.25rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #ffffff;
}

.gradient-text {
  background: linear-gradient(135deg, #FF2A5F 0%, #F5B8D1 50%, #64D2FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.showcase-subtitle {
  font-size: clamp(0.9375rem, 1.4vw, 1.125rem);
  color: rgba(255, 255, 255, 0.75);
  max-width: 680px;
}

/* Category Tabs */
.category-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.25s ease;
  cursor: pointer;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.tab-btn.active {
  background: rgba(255, 42, 95, 0.15);
  border-color: #FF2A5F;
  color: #ffffff;
  box-shadow: 0 0 16px rgba(255, 42, 95, 0.3);
}

.tab-icon {
  font-size: 0.875rem;
}

/* Tech Cards Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
}

.tech-card {
  background: rgba(20, 7, 11, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: var(--radius-lg, 12px);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.tech-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 10px 40px -10px var(--glow-color);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.card-title-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.category-badge {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  font-weight: 600;
}

.card-title {
  font-size: 1.45rem;
  font-weight: 700;
  color: #ffffff;
}

.icon-bubble {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  flex-shrink: 0;
}

.card-description {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
}

.skills-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
}

.skill-pill:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: var(--pill-accent);
  color: #ffffff;
}

.skill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.skill-level {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.45);
  margin-left: 2px;
}
</style>
