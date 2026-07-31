<script setup lang="ts">
import ProjectsShowcase from '~/components/core/ProjectsShowcase.vue'
import { onMounted, onUnmounted } from 'vue'

useSeoMeta({
  title: 'Projects & Systems • Dhruv Mann',
  description: 'Explore featured engineering projects, custom WebGL engines, AI agent frameworks, and production SaaS applications by Dhruv Mann.'
})

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="page-projects">
    <ProjectsShowcase />
  </div>
</template>

<style scoped>
.page-projects {
  width: 100%;
  min-height: 100vh;
  background-color: #050507;
  overflow-x: hidden;
}
</style>
