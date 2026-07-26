<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'

const route = useRoute()
const { getProjectBySlug } = useProjects()

const slug = computed(() => String(route.params.projectSlug))
const project = computed(() => getProjectBySlug(slug.value))

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project Not Found'
  })
}

useSeoMeta({
  title: computed(() => `${project.value?.title || 'Project'} • Dhruv Mann`),
  description: computed(() => project.value?.description || '')
})
</script>

<template>
  <div v-if="project" class="page-project-detail">
    <div class="container detail-container">
      <NuxtLink to="/projects" class="back-link font-mono">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to All Projects
      </NuxtLink>

      <header class="detail-header">
        <div class="meta-row">
          <span class="category-badge font-mono">{{ project.category }}</span>
          <span class="year font-mono">{{ project.year }}</span>
        </div>

        <h1 class="h1 project-title">{{ project.title }}</h1>
        <p class="project-subtitle">{{ project.subtitle }}</p>

        <div class="actions-row">
          <a 
            v-if="project.githubUrl" 
            :href="project.githubUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-secondary font-mono"
          >
            Repository
          </a>
          <a 
            v-if="project.liveUrl" 
            :href="project.liveUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-primary font-mono"
          >
            Live Demo
          </a>
        </div>
      </header>

      <!-- Metrics Section -->
      <div v-if="project.metrics && project.metrics.length > 0" class="metrics-grid">
        <div v-for="m in project.metrics" :key="m.label" class="metric-card">
          <span class="metric-value font-display">{{ m.value }}</span>
          <span class="metric-label font-mono">{{ m.label }}</span>
        </div>
      </div>

      <!-- Detail Content -->
      <div class="content-grid">
        <div class="main-prose">
          <h2 class="h3">System Architecture</h2>
          <p class="body-text">{{ project.longDescription || project.description }}</p>

          <div v-if="project.highlights" class="highlights-block">
            <h3 class="h3">Technical Highlights</h3>
            <ul class="highlights-list">
              <li v-for="item in project.highlights" :key="item" class="highlight-item">
                <span class="bullet" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <aside class="side-info">
          <div class="info-block">
            <h4 class="info-title font-mono">Technologies</h4>
            <div class="tags-flex">
              <span v-for="tag in project.tags" :key="tag" class="tag font-mono">
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-project-detail {
  padding: var(--space-12) 0 var(--space-20);
}

.detail-container {
  max-width: 960px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-8);
  transition: color var(--duration-fast) var(--ease-out);
}

.back-link:hover {
  color: var(--color-accent);
}

.detail-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}

.meta-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.category-badge {
  font-size: 0.75rem;
  color: var(--color-accent);
  background: var(--color-accent-dim);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border-accent);
}

.year {
  font-size: 0.8125rem;
  color: var(--color-text-subtle);
}

.project-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
}

.project-subtitle {
  font-size: 1.25rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.actions-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.metric-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--space-6);
  border-radius: var(--radius-sm);
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
}

.metric-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
}

@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.main-prose {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.highlights-block {
  margin-top: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.highlights-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  list-style: none;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: 1rem;
  color: var(--color-text-muted);
}

.bullet {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background-color: var(--color-accent);
  margin-top: 8px;
  flex-shrink: 0;
}

.side-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.info-block {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--space-6);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.info-title {
  font-size: 0.8125rem;
  color: var(--color-text-subtle);
  text-transform: uppercase;
}

.tags-flex {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  padding: 4px 10px;
  border-radius: var(--radius-xs);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 var(--space-6);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-accent);
  color: #080a0e;
  font-weight: 600;
}

.btn-secondary {
  background-color: var(--color-surface-2);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
</style>
