<template>
  <div class="layout-wrapper">
    <!-- Requirement 3: Full Page Background holding Hero_section.png without modifying the image -->
    <div class="page-background-image" aria-hidden="true" />
    <AppGrain />
    <AppNav />
    <main class="layout-main">
      <slot />
    </main>
    <footer class="app-footer">
      <div class="container footer-inner">
        <div class="footer-left">
          <span class="copyright">© 2026 Dhruv Mann. Digital OS & Systems.</span>
        </div>
        <div class="footer-right">
          <a href="https://github.com/Dhruv-Mann" target="_blank" rel="noopener noreferrer" class="footer-link">
            GitHub
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
  position: relative;
  background-color: #341514;
}

/* Full page background layer with Hero_section.png directly included */
.page-background-image {
  position: fixed;
  top: 0;
  left: 0;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.app-footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--color-border);
  padding: var(--space-8) 0;
  background-color: rgba(52, 21, 20, 0.9);
  backdrop-filter: blur(8px);
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
  color: var(--color-text);
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
