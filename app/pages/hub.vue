<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import TechStackShowcase from '~/components/core/TechStackShowcase.vue'

useSeoMeta({
  title: 'Dhruv Mann • Hub & System Architecture',
  description: 'Explore the projects, architecture, and tech stack of Dhruv Mann.'
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
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
  width: 100vw;
  height: 100vh;
  background-color: #050507;
  overflow: hidden;
}
</style>
