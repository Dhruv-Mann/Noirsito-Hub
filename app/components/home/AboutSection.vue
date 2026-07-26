<template>
  <section class="about-section">
    <div class="container about-container">
      <div class="about-main">
        <h2 class="h2">Architecture & Engineering Focus</h2>
        <div class="prose">
          <p>
            I am a B.Tech student focused on building software infrastructure, machine learning runtime environments, and desktop-grade browser web applications.
          </p>
          <p>
            My work centers around zero-dependency low-level abstractions, performance profiling, spatial visualization, and resilient distributed worker queues. Rather than building static portfolios, I treat code as a continuous digital operating system for experimentation.
          </p>
        </div>

        <div class="capabilities-grid">
          <div class="capability-item">
            <span class="cap-num font-mono">01</span>
            <h3 class="cap-title">AI & Compute Engines</h3>
            <p class="cap-desc">WebGPU shaders, PyTorch optimization, quantized vector search, and edge LLM runtime persistence.</p>
          </div>
          <div class="capability-item">
            <span class="cap-num font-mono">02</span>
            <h3 class="cap-title">Systems & Full-Stack</h3>
            <p class="cap-desc">Nuxt 4 architecture, TypeScript type safety, C++ WebAssembly modules, and Raft consensus queues.</p>
          </div>
          <div class="capability-item">
            <span class="cap-num font-mono">03</span>
            <h3 class="cap-title">Interaction Design</h3>
            <p class="cap-desc">60 FPS motion design, direct DOM bypass physics, custom token systems, and spatial typography.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: var(--space-20) 0;
  border-top: 1px solid var(--color-border);
}

.about-container {
  max-width: 1080px;
}

.about-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.prose {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.prose p {
  max-width: 72ch;
}

.capabilities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .capabilities-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.capability-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.cap-num {
  font-size: 0.8125rem;
  color: var(--color-accent);
}

.cap-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
}

.cap-desc {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}
</style>
