<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import HomeFooter from '~/components/home/HomeFooter.vue'

useSeoMeta({
  title: 'Dhruv Mann • Digital Hub & OS',
  description: 'Personal digital operating system of Dhruv Mann.'
})
</script>

<template>
  <div class="page-landing">
    <HeroSection />
    <HomeFooter />
  </div>
</template>

<style scoped>
.page-landing {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
