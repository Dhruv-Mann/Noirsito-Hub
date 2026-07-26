<script setup lang="ts">
useSeoMeta({
  title: 'About & Stack • Dhruv Mann',
  description: 'Background, engineering philosophy, and technical stack of Dhruv Mann.'
})

const techStack = [
  { category: 'Languages', items: ['TypeScript', 'C++', 'Python', 'Go', 'Rust', 'WGSL'] },
  { category: 'Frontend & UI', items: ['Nuxt 4', 'Vue 3', 'WebGL / WebGPU', 'Three.js', 'Motion', 'CSS Tokens'] },
  { category: 'Backend & Compute', items: ['Nitro / H3', 'PyTorch', 'Vector Indexing (HNSW)', 'PostgreSQL', 'Raft Consensus', 'gRPC'] },
  { category: 'Tools & Workflow', items: ['Git', 'Docker', 'Vite', 'Valgrind', 'WebAudio API'] }
]
</script>

<template>
  <div class="page-about">
    <div class="container about-container">
      <header class="about-header">
        <h1 class="h1">Dhruv Mann</h1>
        <p class="subtitle font-mono">B.Tech Student · Systems & AI Builder</p>
      </header>

      <div class="about-grid">
        <div class="main-content">
          <section class="bio-section">
            <h2 class="h3">Philosophy</h2>
            <div class="prose">
              <p>
                I view software development as the craft of building durable, reliable digital machinery. My focus is on understanding computing principles from first principles rather than relying solely on high-level abstractions.
              </p>
              <p>
                Whether designing a SIMD vector index, tuning spatial WebGL canvas render cycles, or orchestrating microservices over custom Raft clusters, I prioritize long-term code health, zero unnecessary dependencies, and low-latency interaction.
              </p>
            </div>
          </section>

          <section class="stack-section">
            <h2 class="h3">Technical Capabilities</h2>
            <div class="stack-grid">
              <div v-for="group in techStack" :key="group.category" class="stack-card">
                <h3 class="stack-category font-mono">{{ group.category }}</h3>
                <div class="stack-items">
                  <span v-for="item in group.items" :key="item" class="stack-pill font-mono">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside class="sidebar-content">
          <div class="contact-card">
            <h3 class="card-title font-display">Connect</h3>
            <p class="card-desc">Open for engineering discussions, open-source collaborations, and research experiments.</p>
            
            <div class="link-list">
              <a href="https://github.com/Dhruv-Mann" target="_blank" rel="noopener noreferrer" class="social-link">
                GitHub
                <span class="handle font-mono">@Dhruv-Mann</span>
              </a>
              <a href="mailto:dhruv@example.com" class="social-link">
                Email
                <span class="handle font-mono">dhruv@example.com</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-about {
  padding: var(--space-12) 0 var(--space-20);
}

.about-container {
  max-width: 1040px;
}

.about-header {
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.subtitle {
  font-size: 0.9375rem;
  color: var(--color-accent);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
}

@media (min-width: 860px) {
  .about-grid {
    grid-template-columns: 2.2fr 1fr;
  }
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.prose {
  margin-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.stack-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.stack-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 600px) {
  .stack-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stack-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--space-5);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.stack-category {
  font-size: 0.75rem;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stack-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.stack-pill {
  font-size: 0.75rem;
  color: var(--color-text);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  padding: 3px 8px;
  border-radius: var(--radius-xs);
}

.contact-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--space-6);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.card-desc {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--color-text);
  transition: all var(--duration-fast) var(--ease-out);
}

.social-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.handle {
  font-size: 0.75rem;
  color: var(--color-text-subtle);
}
</style>
