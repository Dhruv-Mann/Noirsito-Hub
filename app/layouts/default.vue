<template>
  <div class="layout-wrapper">
    <!-- Requirement 3: Full Page Background holding Hero_section.png without modifying the image -->
    <div class="page-background-image" aria-hidden="true" />
    <AppGrain />
    <AppNav />
    <main class="layout-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #341514;
}

/* Full page background layer with Hero_section.png directly included */
.page-background-image {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  background-image: url('/Hero_section.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.18;
}

.layout-main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
</style>
