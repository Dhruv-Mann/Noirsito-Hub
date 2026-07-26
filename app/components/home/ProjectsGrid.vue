<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
import ProjectCard from '~/components/projects/ProjectCard.vue'

const { featuredProjects } = useProjects()
</script>

<template>
  <section class="projects-section">
    <div class="container">
      <div class="section-header">
        <div class="header-content">
          <h2 class="h2">Selected Systems & Research</h2>
          <p class="body-text">
            Key architectures, open-source engines, and technical explorations built recently.
          </p>
        </div>
        <NuxtLink to="/projects" class="view-all-link font-mono">
          View All Projects ({{ featuredProjects.length }}+)
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <div class="bento-grid">
        <ProjectCard 
          v-for="project in featuredProjects" 
          :key="project.id" 
          :project="project" 
          :bento="true"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: var(--space-16) 0;
  border-top: 1px solid var(--color-border);
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-10);
}

@media (min-width: 768px) {
  .section-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--color-accent);
  transition: opacity var(--duration-fast) var(--ease-out);
}

.view-all-link:hover {
  opacity: 0.8;
}

.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(220px, auto);
  }
}
</style>
