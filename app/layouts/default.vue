<template>
  <div class="layout-wrapper">
    <AppGrain />
    <AppNav />
    <main class="layout-main">
      <slot />
    </main>
    <footer class="app-footer">
      <div class="container footer-inner">
        <div class="footer-left">
          <span class="copyright">© 2026 Dhruv Mann. Crafted with Nuxt 4.</span>
        </div>
        <div class="footer-right">
          <a href="https://github.com/Dhruv-Mann/Noir-Hub" target="_blank" rel="noopener noreferrer" class="footer-link">
            Source Code
          </a>
          <span class="dot-separator">•</span>
          <a href="mailto:dhruv@example.com" class="footer-link">
            Contact
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.app-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-8) 0;
  background-color: var(--color-bg);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-text-subtle);
}

.footer-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.footer-link {
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-out);
}

.footer-link:hover {
  color: var(--color-accent);
}

.dot-separator {
  color: var(--color-border-strong);
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    gap: var(--space-3);
    text-align: center;
  }
}
</style>
