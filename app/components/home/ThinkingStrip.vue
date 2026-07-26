<script setup lang="ts">
const thoughts = [
  'Exploring WebGPU compute pipelines for browser AI inference',
  'SIMD vector indices achieve 75% memory footprint reduction',
  'Lock-free thread-local caching for microsecond latency',
  'Spatial computing and AST 3D call graphs for monorepos',
  'Raft consensus node clusters on heterogenous edge workers',
  'Procedural sound synthesis for dynamic UI micro-feedback'
]
</script>

<template>
  <section class="thinking-section">
    <div class="marquee-wrapper">
      <div class="marquee-track">
        <div v-for="n in 2" :key="n" class="marquee-group">
          <div 
            v-for="(item, index) in thoughts" 
            :key="index" 
            class="marquee-item font-mono"
          >
            <span class="pulse-dot" />
            <span class="item-text">{{ item }}</span>
            <span class="item-separator">/</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.thinking-section {
  padding: var(--space-8) 0;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
}

.marquee-wrapper {
  display: flex;
  width: 100%;
  overflow: hidden;
  user-select: none;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 60s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding-right: var(--space-8);
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background-color: var(--color-accent);
}

.item-text {
  color: var(--color-text);
}

.item-separator {
  color: var(--color-border-strong);
  margin-left: var(--space-4);
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
