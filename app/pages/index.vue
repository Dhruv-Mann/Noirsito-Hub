<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'

useSeoMeta({
  title: 'Dhruv Mann • Digital Hub & OS',
  description: 'Personal digital operating system of Dhruv Mann.'
})
</script>

<template>
  <div class="page-landing">
    <HeroSection />
  </div>
</template>

<style scoped>
.page-landing {
  width: 100%;
  height: calc(100dvh - 64px);
  overflow: hidden;
}
</style>
