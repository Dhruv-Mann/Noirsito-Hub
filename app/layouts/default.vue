<script setup lang="ts">
import AppCommandPalette from '~/components/core/AppCommandPalette.vue'
import PageTransitionSheet from '~/components/core/PageTransitionSheet.vue'
</script>

<template>
  <div class="layout-wrapper">
    <!-- Cinematic Elastic Pink Sheet Sweep Transition Layer -->
    <PageTransitionSheet />
    <!-- Full Page Background holding me.png without modifying the image -->
    <div class="page-background-image" aria-hidden="true" />
    <AppGrain />
    <main class="layout-main">
      <slot />
    </main>
    <!-- Raycast OS Cmd+K Command Palette Modal & Trigger -->
    <AppCommandPalette />
  </div>
</template>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #341514;
}

/* Full page background layer with me.png directly included */
.page-background-image {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  background-image: url('/me.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.12;
}

.layout-main {
  position: relative;
  z-index: 10;
}
</style>
