<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import HomeFooter from '~/components/home/HomeFooter.vue'
import { useSystemState } from '~/composables/useSystemState'

const { isStarted } = useSystemState()

useSeoMeta({
  title: 'Dhruv Mann • Digital Hub',
  description: 'Personal digital hub of Dhruv Mann.'
})
</script>

<template>
  <div class="page-landing" :class="{ 'is-initialized': isStarted }">
    <HeroSection />
    <HomeFooter v-if="isStarted" />
  </div>
</template>

<style scoped>
.page-landing {
  width: 100%;
  max-width: 100%;
  height: 100vh;
  overflow: hidden;
}

.page-landing.is-initialized {
  height: auto;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
