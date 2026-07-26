<script setup lang="ts">
const route = useRoute()

const navLinks = [
  { label: 'Overview', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' }
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="app-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand-logo" aria-label="Dhruv Mann: Home">
        <span class="brand-symbol">DM</span>
        <span class="brand-name">Dhruv Mann</span>
        <span class="brand-badge">B.Tech</span>
      </NuxtLink>

      <nav class="nav-menu" aria-label="Main Navigation">
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.path" class="nav-item">
            <NuxtLink 
              :to="link.path" 
              class="nav-link" 
              :class="{ active: isActive(link.path) }"
            >
              {{ link.label }}
              <span v-if="isActive(link.path)" class="active-indicator" />
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a 
          href="https://github.com/Dhruv-Mann" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="action-btn"
          aria-label="GitHub Profile"
        >
          <svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: var(--z-nav);
  background-color: rgba(8, 10, 14, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-text);
  transition: opacity var(--duration-fast) var(--ease-out);
}

.brand-logo:hover {
  opacity: 0.85;
}

.brand-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-family: var(--font-mono);
  color: var(--color-accent);
}

.brand-name {
  font-size: 1rem;
  letter-spacing: -0.01em;
}

.brand-badge {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--color-text-subtle);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 1px 6px;
  border-radius: var(--radius-xs);
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  transition: color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out);
}

.nav-link:hover {
  color: var(--color-text);
  background-color: var(--color-surface);
}

.nav-link.active {
  color: var(--color-text);
  background-color: var(--color-surface-2);
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  background-color: var(--color-accent);
  border-radius: var(--radius-full);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out);
}

.action-btn:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

@media (max-width: 640px) {
  .brand-name, .brand-badge {
    display: none;
  }
}
</style>
