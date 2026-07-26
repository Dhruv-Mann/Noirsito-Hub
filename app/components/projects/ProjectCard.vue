<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  project: Project
  bento?: boolean
}>()
</script>

<template>
  <NuxtLink 
    :to="`/projects/${project.slug}`" 
    class="project-card"
    :class="[
      bento ? `bento-${project.bentoSize || 'normal'}` : '',
    ]"
  >
    <div class="card-background" />
    
    <div class="card-header">
      <div class="card-category">
        <span class="category-dot" :style="{ backgroundColor: project.accentColor || 'var(--color-accent)' }" />
        {{ project.category }}
      </div>
      <span class="card-year font-mono">{{ project.year }}</span>
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-subtitle">{{ project.subtitle }}</p>
    </div>

    <div class="card-footer">
      <div class="tag-list">
        <span 
          v-for="tag in project.tags.slice(0, 3)" 
          :key="tag" 
          class="tag font-mono"
        >
          {{ tag }}
        </span>
      </div>

      <div class="card-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  text-decoration: none;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
  contain: layout style;
}

.project-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-md);
}

.project-card:active {
  transform: translateY(0) scale(0.98);
}

.card-background {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 0%, var(--color-accent-dim) 0%, transparent 60%);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
  pointer-events: none;
}

.project-card:hover .card-background {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  z-index: 1;
}

.card-category {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.category-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
}

.card-year {
  font-size: 0.75rem;
  color: var(--color-text-subtle);
}

.card-body {
  margin-bottom: var(--space-6);
  z-index: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-2);
  transition: color var(--duration-fast) var(--ease-out);
}

.project-card:hover .card-title {
  color: var(--color-accent);
}

.card-subtitle {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  z-index: 1;
}

.tag-list {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.tag {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  padding: 2px 8px;
  border-radius: var(--radius-xs);
}

.card-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-xs);
  color: var(--color-text-subtle);
  transition: color var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.project-card:hover .card-arrow {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}

/* Bento Grid Spans */
@media (min-width: 768px) {
  .bento-large {
    grid-column: span 2;
    grid-row: span 2;
  }
  .bento-wide {
    grid-column: span 2;
  }
  .bento-tall {
    grid-row: span 2;
  }
}
</style>
