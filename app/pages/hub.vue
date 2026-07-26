<script setup lang="ts">
useSeoMeta({
  title: 'Dhruv Mann • Hub OS Dashboard',
  description: 'Explore the projects, architecture, and personal operating system of Dhruv Mann.'
})
</script>

<template>
  <div class="page-hub font-body">
    <div class="hub-container">
      <header class="hub-header">
        <NuxtLink to="/" class="back-link font-mono">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Return to Landing Stage</span>
        </NuxtLink>
        <h1 class="hub-title font-display">NOIRSITO HUB</h1>
        <p class="hub-subtitle">Central Command & System Projects</p>
      </header>

      <div class="hub-grid">
        <div class="hub-card">
          <div class="card-badge font-mono">SYSTEM ARCHITECTURE</div>
          <h2 class="card-title font-display">Nuxt 4 Desktop Engine</h2>
          <p class="card-desc">Zero reactivity DOM thrashing with custom WebGL & canvas micro-animations.</p>
        </div>

        <div class="hub-card">
          <div class="card-badge font-mono">RAYCAST OS INTEGRATION</div>
          <h2 class="card-title font-display">Command Palette</h2>
          <p class="card-desc">Press Ctrl+K anytime for instant 1-click system navigation & contact shortcuts.</p>
        </div>

        <div class="hub-card">
          <div class="card-badge font-mono">GITHUB REPOSITORY</div>
          <a href="https://github.com/Dhruv-Mann/Noir-Hub" target="_blank" rel="noopener" class="card-title font-display card-link">
            Dhruv-Mann / Noir-Hub ↗
          </a>
          <p class="card-desc">Explore open-source full-stack codebases and procedural canvas art shaders.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-hub {
  min-height: 100vh;
  width: 100%;
  padding: 80px 24px;
  background-color: #341514;
  color: #ffffff;
  display: flex;
  justify-content: center;
}

.hub-container {
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #E17888;
  font-size: 0.875rem;
  margin-bottom: 24px;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #ffffff;
}

.hub-title {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1;
  color: #ffffff;
  margin-bottom: 8px;
}

.hub-subtitle {
  font-size: 1.125rem;
  color: #E17888;
}

.hub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.hub-card {
  background: rgba(45, 17, 16, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(174, 59, 139, 0.3);
  border-radius: var(--radius-md);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.hub-card:hover {
  border-color: #AE3B8B;
  transform: translateY(-4px);
}

.card-badge {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  color: #E17888;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
}

.card-link {
  color: #F5B8D1;
}

.card-link:hover {
  color: #ffffff;
}

.card-desc {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}
</style>
