<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
import ProjectCard from '~/components/projects/ProjectCard.vue'

const { filteredProjects, categories, selectedCategory, searchQuery } = useProjects()

useSeoMeta({
  title: 'Projects & Systems • Dhruv Mann',
  description: 'Complete index of AI projects, full-stack systems, research papers, and software tools built by Dhruv Mann.'
})
</script>

<template>
  <div class="page-projects">
    <div class="container">
      <header class="page-header">
        <h1 class="h1">Projects & Systems</h1>
        <p class="body-text">
          A comprehensive registry of open-source architectures, neural experiments, developer tools, and research explorations.
        </p>
      </header>

      <div class="filter-controls">
        <div class="category-pills">
          <button
            v-for="cat in categories"
            :key="cat"
            class="pill-btn font-mono"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <div class="search-box">
          <label for="project-search" class="visually-hidden">Search projects</label>
          <input
            id="project-search"
            v-model="searchQuery"
            type="text"
            placeholder="Filter by keyword or tag..."
            class="search-input"
          />
        </div>
      </div>

      <div v-if="filteredProjects.length > 0" class="projects-grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <div v-else class="empty-state">
        <p class="empty-title font-display">No matching projects found</p>
        <p class="empty-desc">Try clearing your search query or selecting a different category filter.</p>
        <button class="btn btn-secondary font-mono" @click="selectedCategory = 'All'; searchQuery = ''">
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-projects {
  padding: var(--space-12) 0 var(--space-20);
}

.page-header {
  margin-bottom: var(--space-10);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.filter-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .filter-controls {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.category-pills {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.pill-btn {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  transition: all var(--duration-fast) var(--ease-out);
}

.pill-btn:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

.pill-btn.active {
  color: var(--color-accent);
  background: var(--color-accent-dim);
  border-color: var(--color-border-accent);
}

.search-box {
  width: 100%;
  max-width: 320px;
}

.search-input {
  width: 100%;
  height: 40px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0 var(--space-4);
  font-size: 0.875rem;
  color: var(--color-text);
  transition: border-color var(--duration-fast) var(--ease-out);
}

.search-input:focus {
  border-color: var(--color-accent);
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) 0;
  text-align: center;
  gap: var(--space-4);
}

.empty-title {
  font-size: 1.25rem;
  color: var(--color-text);
}

.empty-desc {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
