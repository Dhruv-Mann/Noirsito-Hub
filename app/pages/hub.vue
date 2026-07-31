<script setup lang="ts">
import TechStackShowcase from '~/components/core/TechStackShowcase.vue'
import { onMounted, onUnmounted } from 'vue'

useSeoMeta({
  title: 'Dhruv Mann • Hub & System Architecture',
  description: 'Explore the projects, architecture, and tech stack of Dhruv Mann.'
})

// The landing page locks body overflow to hide scroll.
// Restore it so the entire hub page scrolls naturally.
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
  <div class="page-hub">
    <TechStackShowcase />
  </div>
</template>

<style scoped>
.page-hub {
  width: 100%;
  min-height: 100vh;
  background-color: #050507;
}
</style>
