<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import ProjectsGrid from '~/components/home/ProjectsGrid.vue'
import ThinkingStrip from '~/components/home/ThinkingStrip.vue'
import AboutSection from '~/components/home/AboutSection.vue'

useSeoMeta({
  title: 'Dhruv Mann • Digital Hub & OS',
  description: 'Central digital operating system of Dhruv Mann. AI engines, full-stack systems, research, and interaction design.'
})
</script>

<template>
  <div class="page-home">
    <HeroSection />
    <ProjectsGrid />
    <ThinkingStrip />
    <AboutSection />
  </div>
</template>
