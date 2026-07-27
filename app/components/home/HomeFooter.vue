<template>
  <footer
    class="home-footer font-body select-none"
    :class="{ 'footer-hovered': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Background Reveal Layer (Dithered asset seamlessly blended on right side) -->
    <div class="reveal-bg-layer" aria-hidden="true">
      <img src="/ditherit.png" alt="" class="reveal-bg-img" />
    </div>

    <!-- Subtle noise texture overlay for background parity -->
    <div class="noise-overlay" aria-hidden="true" />

    <!-- Main Footer Container -->
    <div class="container footer-container">
      <!-- 4-Column Slashed Grid Section -->
      <div class="footer-grid">
        <!-- Column 1: Connects -->
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
              <a href="mailto:dhruvmann139@gmail.com" class="footer-link-btn">
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
              <a href="https://www.linkedin.com/in/dhruv-mann" target="_blank" rel="noopener" class="footer-link-btn">
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
              <a href="https://x.com/DhruvMann64" target="_blank" rel="noopener" class="footer-link-btn">
                <span class="cute-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </span>
                <span class="slash-prefix">/</span> TWITTER
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 2: Navigation -->
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
            <li>
              <a href="https://github.com/Dhruv-Mann/Noirsito-Hub" target="_blank" rel="noopener" class="footer-link-btn">
                <span class="slash-prefix">/</span> DIGITAL HUB
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Demo Column 3 -->
        <div class="footer-col font-mono">
          <ul class="footer-links">
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> DEMO 1
              </span>
            </li>
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> DEMO 2
              </span>
            </li>
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> DEMO 3
              </span>
            </li>
          </ul>
        </div>

        <!-- Column 4: Demo Column 4 -->
        <div class="footer-col font-mono">
          <ul class="footer-links">
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> DEMO 4
              </span>
            </li>
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> DEMO 5
              </span>
            </li>
            <li>
              <span class="footer-link-btn slot-item">
                <span class="slash-prefix">/</span> DEMO 6
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
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTransition } from '~/composables/usePageTransition'

const { startPinkSweep } = usePageTransition()

const isHovered = ref(false)

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
  min-height: 40vh;
  width: 100%;
  max-width: 100%;
  /* Matched exactly to the dithered PNG background colour so pixels blend invisibly */
  background: #050507;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  color: #FAFAFA;
  padding: 80px 0 40px 0;
  overflow: hidden;
  overflow-x: hidden;
  z-index: 20;
}

/* Background Reveal Layer — Dithered 1-bit asset, no glow, no transform, pure fade */
.reveal-bg-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 55%;
  max-width: 640px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0;
}

.home-footer.footer-hovered .reveal-bg-layer {
  opacity: 1;
}

.reveal-bg-img {
  max-width: 100%;
  max-height: 90%;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: right center;
  /* screen blend: only bright pixels (the dithered dots) show, pure black disappears */
  mix-blend-mode: screen;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  /* no drop-shadow — zero glow */
  filter: none;
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
  grid-template-columns: repeat(4, max-content);
  gap: 48px;
  padding-bottom: 64px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: repeat(2, max-content);
    gap: 32px;
  }
}

@media (max-width: 500px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
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
</style>
