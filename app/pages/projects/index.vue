<script setup lang="ts">
import { onMounted } from 'vue'
import ProjectsShowcase from '~/components/core/ProjectsShowcase.vue'

useSeoMeta({
  title: 'Projects & Systems • Dhruv Mann',
  description: 'Explore featured engineering projects, custom WebGL engines, AI agent frameworks, and production SaaS applications by Dhruv Mann.'
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
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
