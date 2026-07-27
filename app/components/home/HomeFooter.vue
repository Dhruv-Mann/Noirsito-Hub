<template>
  <footer class="home-footer font-body select-none">
    <!-- Subtle noise texture overlay for background parity -->
    <div class="noise-overlay" aria-hidden="true" />

    <!-- Main Footer Container -->
    <div class="container footer-container">
      <!-- Top Grid Section -->
      <div class="footer-grid">
        <!-- Col 1: Brand & Philosophy -->
        <div class="footer-col brand-col">
          <div class="brand-header">
            <span class="brand-title font-display">DHRUV MANN</span>
            <span class="brand-tag font-mono">aka Noirsito</span>
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

        <!-- Col 2: Navigation Links -->
        <div class="footer-col font-mono">
          <h4 class="col-heading">NAVIGATION</h4>
          <ul class="footer-links">
            <li>
              <button class="footer-link-btn" @click="scrollToTop">
                <span class="link-index">[01]</span> TOP OF PAGE
              </button>
            </li>
            <li>
              <button class="footer-link-btn" @click="triggerPinkSweep">
                <span class="link-index">[02]</span> TECH STACK SHOWCASE
              </button>
            </li>
            <li>
              <a href="https://github.com/Dhruv-Mann/Noirsito-Hub" target="_blank" rel="noopener" class="footer-link-btn">
                <span class="link-index">[03]</span> DIGITAL HUB REPOSITORY
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Direct Connect & Socials -->
        <div class="footer-col font-mono">
          <h4 class="col-heading">CONNECT</h4>
          <ul class="footer-links">
            <li>
              <a href="https://github.com/Dhruv-Mann" target="_blank" rel="noopener" class="footer-link-btn">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </span>
                GITHUB / @Dhruv-Mann
              </a>
            </li>
            <li>
              <a href="mailto:dhruvmann.dev@gmail.com" class="footer-link-btn">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                EMAIL / DHRUVMANN.DEV@GMAIL.COM
              </a>
            </li>
            <li>
              <span class="location-text">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                NEW DELHI, INDIA (UTC+05:30)
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
  grid-template-columns: 2fr 1fr 1.2fr;
  gap: 48px;
  padding-bottom: 64px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

.brand-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brand-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.brand-title {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
}

.brand-tag {
  font-size: 0.78rem;
  color: #AE3B8B;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.brand-description {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.65;
  max-width: 460px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  border-radius: 999px;
  align-self: flex-start;
  margin-top: 8px;
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

.col-heading {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.link-index {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
}

.link-icon {
  display: inline-flex;
  align-items: center;
  color: #AE3B8B;
}

.location-text {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
