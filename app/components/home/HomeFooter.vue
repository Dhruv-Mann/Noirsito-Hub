<template>
  <footer class="home-footer font-body select-none">
    <!-- Subtle noise texture overlay for background parity -->
    <div class="noise-overlay" aria-hidden="true" />

    <!-- Main Footer Container -->
    <div class="container footer-container">
      <!-- 4-Column Top Grid Section -->
      <div class="footer-grid">
        <!-- Column 1: Connects (GitHub, Email, LinkedIn, Twitter/X) -->
        <div class="footer-col font-mono">
          <ul class="footer-links">
            <li>
              <a href="https://github.com/Dhruv-Mann" target="_blank" rel="noopener" class="footer-link-btn">
                <span class="cute-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </span>
                <span class="slash-prefix">/</span> GITHUB
              </a>
            </li>
            <li>
              <a href="mailto:dhruvmann.dev@gmail.com" class="footer-link-btn">
                <span class="cute-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="3"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                </span>
                <span class="slash-prefix">/</span> EMAIL
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/dhruv-mann" target="_blank" rel="noopener" class="footer-link-btn">
                <span class="cute-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </span>
                <span class="slash-prefix">/</span> LINKEDIN
              </a>
            </li>
            <li>
              <a href="https://x.com" target="_blank" rel="noopener" class="footer-link-btn">
                <span class="cute-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </span>
                <span class="slash-prefix">/</span> TWITTER
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 2: Navigation Links -->
        <div class="footer-col font-mono">
          <ul class="footer-links">
            <li>
              <button class="footer-link-btn" @click="scrollToTop">
                <span class="slash-prefix">/</span> HOME
              </button>
            </li>
            <li>
              <button class="footer-link-btn" @click="triggerPinkSweep">
                <span class="slash-prefix">/</span> TECH STACK
              </button>
            </li>
          </ul>
        </div>

        <!-- Column 3: Brand & Bio -->
        <div class="footer-col brand-col">
          <div class="brand-header">
            <span class="brand-title font-display">DHRUV MANN</span>
          </div>
          
          <p class="brand-description font-mono">
            Systems Architect &amp; AI Engineer building high-throughput backend infrastructure,
            desktop tools, and 60fps web applications.
          </p>

          <div class="status-badge font-mono">
            <span class="status-dot" />
            <span>AVAILABLE FOR SELECT ROLES &amp; PROJECTS</span>
          </div>
        </div>

        <!-- Column 4: Architecture & Extended Links -->
        <div class="footer-col font-mono">
          <ul class="footer-links">
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> ARCHITECTURE DOCS
              </span>
            </li>
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> SYSTEM BENCHMARKS
              </span>
            </li>
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> EXPERIMENTAL LAB
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar Divider & Meta Info -->
      <div class="footer-bottom font-mono">
        <div class="bottom-left">
          <span>© 2026 DHRUV MANN • ALL RIGHTS RESERVED</span>
        </div>

        <div class="bottom-right">
          <button class="back-to-top-btn" aria-label="Scroll back to top" @click="scrollToTop">
            <span>BACK TO TOP</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { usePageTransition } from '~/composables/usePageTransition'

const { startPinkSweep } = usePageTransition()

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function triggerPinkSweep() {
  startPinkSweep()
}
</script>

<style scoped>
.home-footer {
  position: relative;
  min-height: 45vh;
  width: 100%;
  max-width: 100%;
  background: linear-gradient(160deg, #111215 0%, #090a0d 60%, #040507 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #FAFAFA;
  padding: 80px 0 40px 0;
  overflow: hidden;
  overflow-x: hidden;
  z-index: 20;
}

/* Subtle noise overlay */
.noise-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

.footer-container {
  position: relative;
  z-index: 10;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  padding-bottom: 64px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}

.brand-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brand-header {
  display: flex;
  align-items: center;
}

.brand-title {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
}

.brand-description {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.65;
  max-width: 320px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  border-radius: 999px;
  align-self: flex-start;
  margin-top: 4px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
  animation: pulse-green 2s ease-in-out infinite;
}

@keyframes pulse-green {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 4px;
}

.footer-link-btn {
  background: transparent;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-link-btn:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.cute-icon {
  display: inline-flex;
  align-items: center;
  color: #AE3B8B;
  transition: transform 0.2s ease, color 0.2s ease;
}

.footer-link-btn:hover .cute-icon {
  color: #ffffff;
  transform: scale(1.15);
}

.slot-item {
  color: rgba(255, 255, 255, 0.45);
  cursor: default;
}

.slot-item:hover {
  transform: none;
  color: rgba(255, 255, 255, 0.7);
}

.slash-prefix {
  font-weight: 700;
  color: #AE3B8B;
  margin-right: 2px;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 32px;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.08em;
}

.back-to-top-btn {
  background: transparent;
  border: none;
  padding: 0;
  color: rgba(255, 255, 255, 0.6);
  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-to-top-btn:hover {
  color: #ffffff;
  transform: translateY(-2px);
}
</style>
