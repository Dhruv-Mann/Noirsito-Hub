<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <section class="hero-section">
    <div class="container hero-container">
      <div class="hero-content" :class="{ 'animate-in': isMounted }">
        <div class="hero-eyebrow">
          <span class="status-indicator" />
          DIGITAL OPERATING SYSTEM
        </div>

        <h1 class="hero-headline">
          Building systems, AI models, and software that lasts.
        </h1>

        <p class="hero-subtext">
          B.Tech student crafting low-latency vector engines, spatial browser graphics, and distributed system architectures.
        </p>

        <div class="hero-actions">
          <NuxtLink to="/projects" class="btn btn-primary">
            Explore Projects
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          <NuxtLink to="/about" class="btn btn-secondary">
            About & Stack
          </NuxtLink>
        </div>
      </div>

      <div class="hero-visual" :class="{ 'animate-in': isMounted }">
        <div class="visual-card">
          <div class="card-grid-pattern" />
          <div class="card-glow" />
          <div class="card-content">
            <div class="terminal-header">
              <span class="term-dot red" />
              <span class="term-dot yellow" />
              <span class="term-dot green" />
              <span class="term-title">hub-kernel.sys</span>
            </div>
            <div class="terminal-body">
              <div class="term-line"><span class="prompt">$</span> init --arch x86_64 --mode production</div>
              <div class="term-line success"><span class="symbol">✓</span> Loaded vector DB index [0.42ms]</div>
              <div class="term-line success"><span class="symbol">✓</span> WebGPU compute context active</div>
              <div class="term-line success"><span class="symbol">✓</span> Distributed mesh online (6 nodes)</div>
              <div class="term-line highlight"><span class="prompt">></span> Ready for execution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  padding-top: var(--space-12);
  padding-bottom: var(--space-16);
  min-height: calc(100dvh - 64px);
  display: flex;
  align-items: center;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
}

@media (min-width: 992px) {
  .hero-container {
    grid-template-columns: 1.1fr 0.9fr;
    gap: var(--space-16);
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}

.hero-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
  background: var(--color-accent-dim);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(88, 166, 255, 0.2);
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background-color: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent);
}

.hero-headline {
  font-size: clamp(2.25rem, 4vw + 1rem, 4rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: var(--space-6);
  color: var(--color-text);
}

.hero-subtext {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 52ch;
  margin-bottom: var(--space-8);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  height: 44px;
  padding: 0 var(--space-6);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: all var(--duration-normal) var(--ease-out);
}

.btn-primary {
  background-color: var(--color-accent);
  color: #341514;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-accent);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}

.btn-secondary {
  background-color: var(--color-surface-2);
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
}

.btn-secondary:hover {
  background-color: var(--color-surface-3);
  border-color: var(--color-text-muted);
}

.btn-secondary:active {
  transform: scale(0.98);
}

/* Visual Terminal Card */
.hero-visual {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
  transition: opacity 0.8s var(--ease-out) 0.15s, transform 0.8s var(--ease-out) 0.15s;
}

.hero-visual.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.visual-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.card-grid-pattern {
  position: absolute;
  inset: 0;
  background-size: 24px 24px;
  background-image: 
    linear-gradient(to right, rgba(225, 120, 136, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(225, 120, 136, 0.05) 1px, transparent 1px);
  pointer-events: none;
}

.card-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%);
  pointer-events: none;
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.term-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
}
.term-dot.red { background: #E17888; }
.term-dot.yellow { background: #AE3B8B; }
.term-dot.green { background: #1C5789; }

.term-title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-subtle);
  margin-left: var(--space-2);
}

.terminal-body {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.8;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.term-line {
  color: var(--color-text-muted);
}
.term-line .prompt {
  color: var(--color-accent);
}
.term-line.success .symbol {
  color: #E17888;
  margin-right: 4px;
}
.term-line.highlight {
  color: var(--color-text);
  font-weight: 500;
}
</style>
