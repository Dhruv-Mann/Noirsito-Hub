<script setup lang="ts">
import TechStackShowcase from '~/components/core/TechStackShowcase.vue'

useSeoMeta({
  title: 'Dhruv Mann • Hub & System Architecture',
  description: 'Explore the projects, architecture, and tech stack of Dhruv Mann.'
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
