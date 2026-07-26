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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: var(--z-nav);
  background-color: rgba(52, 21, 20, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  pointer-events: none;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  pointer-events: auto;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.brand-symbol {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.875rem;
  color: #ffffff;
  background-color: #AE3B8B;
  padding: 4px 8px;
  border-radius: var(--radius-xs);
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.brand-badge {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  color: #E17888;
  background-color: rgba(174, 59, 139, 0.15);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(174, 59, 139, 0.3);
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  list-style: none;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 4px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 var(--space-4);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: #E17888;
  border-radius: var(--radius-full);
  transition: all var(--duration-fast) var(--ease-out);
}

.nav-link:hover {
  color: #ffffff;
  background-color: rgba(225, 120, 136, 0.1);
}

.nav-link.active {
  color: #ffffff;
  background-color: #AE3B8B;
  font-weight: 600;
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
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  color: #ffffff;
  background-color: rgba(225, 120, 136, 0.1);
  border: 1px solid var(--color-border);
  transition: all var(--duration-fast) var(--ease-out);
}

.action-btn:hover {
  color: #ffffff;
  background-color: #AE3B8B;
  border-color: #AE3B8B;
  transform: translateY(-1px);
}
</style>
