<template>
  <div
    class="inception-screen"
    :style="{
      width: `${W}px`,
      height: `${H}px`,
      '--inception-border': `${accentColor}33`,
    }"
  >
    <!-- Browser chrome bar -->
    <div
      class="inception-screen__chrome"
      :style="{ height: `${BAR}px`, opacity: 'var(--ek-bar, 1)' }"
    >
      <div class="inception-screen__dots">
        <span class="inception-screen__dot inception-screen__dot--red" />
        <span class="inception-screen__dot inception-screen__dot--yellow" />
        <span class="inception-screen__dot inception-screen__dot--green" />
      </div>
      <div class="inception-screen__url-bar">
        <svg
          class="inception-screen__lock-icon"
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        <span>{{ url }}</span>
        <span class="inception-screen__depth-tag">×{{ screenIndex }}</span>
      </div>
      <span class="inception-screen__chrome-spacer" />
    </div>

    <!-- Page content -->
    <div class="inception-screen__page" :style="pageStyle">
      <div class="inception-screen__content">
        <p class="inception-screen__eyebrow" :style="{ color: accentColor }">
          {{ currentScreen.eyebrow }}
        </p>

        <h3 class="inception-screen__heading">
          {{ currentScreen.heading }}
        </h3>

        <p v-if="currentScreen.sub" class="inception-screen__sub">
          {{ currentScreen.sub }}
        </p>

        <!-- Tech stack pills (level 0 only) -->
        <div v-if="currentScreen.techStack?.length" class="inception-screen__pills">
          <span
            v-for="tech in currentScreen.techStack"
            :key="tech"
            class="inception-screen__pill"
            :style="{
              borderColor: `${accentColor}44`,
              color: accentColor,
            }"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Fire button or facsimile -->
        <div class="inception-screen__btn-area">
          <PixelFireButton
            v-if="level < 2"
            :accent-color="accentColor"
          >
            {{ buttonLabel }}
          </PixelFireButton>
          <div v-else class="inception-screen__btn-faux" :style="fauxBtnStyle" />
        </div>

        <!-- Project image (if present) -->
        <div v-if="currentScreen.image" class="inception-screen__image-frame">
          <img
            :src="currentScreen.image"
            :alt="currentScreen.heading"
            class="inception-screen__image"
          />
        </div>

        <!-- Action links (last screen) -->
        <div v-if="currentScreen.actions" class="inception-screen__actions">
          <a
            v-for="action in actionLinks"
            :key="action.label"
            :href="action.href"
            target="_blank"
            rel="noopener"
            class="inception-screen__action-link"
            :style="{ color: accentColor }"
          >
            [ {{ action.label }} ]
          </a>
        </div>
      </div>

      <!-- Nested child screen (recursive) -->
      <div
        v-if="level + 1 < LEVELS"
        class="inception-screen__child"
        :style="childContainerStyle"
      >
        <div :style="childScaleStyle">
          <InceptionScreen
            :key="`child-${level + 1}-depth-${depth}`"
            :level="level + 1"
            :depth="depth"
            :screens="screens"
            :url="url"
            :button-label="buttonLabel"
            :accent-color="accentColor"
            :surface-bg="surfaceBg"
            :action-links="actionLinks"
          />
        </div>
      </div>

      <!-- Terminal leaf placeholder -->
      <div
        v-else
        class="inception-screen__leaf"
        :style="leafStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * InceptionScreen — A single "browser window" level in the recursive Droste zoom.
 *
 * Renders fake browser chrome, project content for the current level,
 * and a scaled-down copy of itself (until LEVELS depth is reached).
 * Deep copies (level ≥ 2) use simplified facsimile rendering to keep
 * the recursive DOM cheap.
 */
import { computed } from 'vue'
import PixelFireButton from './PixelFireButton.vue'

defineOptions({ name: 'InceptionScreen' })

export interface InceptionScreenData {
  eyebrow: string
  heading: string
  sub?: string
  techStack?: string[]
  image?: string
  actions?: boolean
}

export interface ActionLink {
  label: string
  href: string
}

interface Props {
  level: number
  depth: number
  screens: InceptionScreenData[]
  url?: string
  buttonLabel?: string
  accentColor?: string
  surfaceBg?: string
  actionLinks?: ActionLink[]
}

const props = withDefaults(defineProps<Props>(), {
  url: 'hub.dhruvmann.com',
  buttonLabel: 'Explore Project',
  accentColor: '#00A19B',
  surfaceBg: '#031413',
  actionLinks: () => [],
})

// ─── Layout constants (must match ScrollInception) ───
const W = 1200
const H = 760
const BAR = 48
const K = 2.8
const D_Y = 180
const LEVELS = 4

const innerW = W / K
const innerH = H / K

// ─── Computed content ───
const screenIndex = computed(() => (props.depth + props.level) % props.screens.length)
const currentScreen = computed(() => props.screens[screenIndex.value]!)

const pageStyle = computed(() => {
  // Each level gets a progressively lighter tint so recursion is visible
  const lightness = Math.min(props.level * 4, 12)
  return {
    background: props.surfaceBg,
    filter: lightness > 0 ? `brightness(${1 + lightness / 100})` : undefined,
  }
})

const childContainerStyle = computed(() => ({
  position: 'absolute' as const,
  zIndex: 10,
  left: `${(W - innerW) / 2}px`,
  top: `${H / 2 + D_Y - BAR - innerH / 2}px`,
  width: `${innerW}px`,
  height: `${innerH}px`,
}))

const childScaleStyle = computed(() => ({
  width: `${W}px`,
  height: `${H}px`,
  transform: `scale(${1 / K})`,
  transformOrigin: 'top left',
}))

const leafStyle = computed(() => ({
  position: 'absolute' as const,
  left: `${(W - innerW) / 2}px`,
  top: `${H / 2 + D_Y - BAR - innerH / 2}px`,
  width: `${innerW}px`,
  height: `${innerH}px`,
  borderRadius: '8px',
  background: `color-mix(in srgb, ${props.surfaceBg} 80%, ${props.accentColor} 20%)`,
  boxShadow: `0 0 0 1px ${props.accentColor}22`,
}))

const fauxBtnStyle = computed(() => ({
  background: '#2a2a2a',
  borderRadius: '6px',
  width: '150px',
  height: '38px',
  position: 'relative' as const,
  overflow: 'hidden',
}))
</script>

<style scoped>
.inception-screen {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--inception-border, rgba(255, 255, 255, 0.12));
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 24px 80px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Browser chrome */
.inception-screen__chrome {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.04);
}

.inception-screen__dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.inception-screen__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.inception-screen__dot--red { background: #ff5f57; }
.inception-screen__dot--yellow { background: #febc2e; }
.inception-screen__dot--green { background: #28c840; }

.inception-screen__url-bar {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 28px;
  width: 320px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-mono, monospace);
}

.inception-screen__lock-icon {
  color: rgba(255, 255, 255, 0.35);
}

.inception-screen__depth-tag {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  opacity: 0.6;
}

.inception-screen__chrome-spacer {
  width: 40px;
}

/* Page content */
.inception-screen__page {
  position: relative;
  flex: 1;
  min-height: 0;
}

.inception-screen__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px 0;
  text-align: center;
}

.inception-screen__eyebrow {
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0;
}

.inception-screen__heading {
  margin: 12px 0 0;
  max-width: 700px;
  font-size: 44px;
  line-height: 1.05;
  font-weight: 400;
  color: #ffffff;
  text-wrap: balance;
  font-family: var(--font-display, 'Space Grotesk', sans-serif);
}

.inception-screen__sub {
  margin: 16px 0 0;
  max-width: 500px;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.55);
  text-wrap: pretty;
}

.inception-screen__pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.inception-screen__pill {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid;
  background: rgba(255, 255, 255, 0.04);
  font-family: var(--font-mono, monospace);
}

.inception-screen__btn-area {
  margin-top: 24px;
}

.inception-screen__btn-faux {
  position: relative;
  overflow: hidden;
}

.inception-screen__btn-faux::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 10px;
  background: linear-gradient(to top, currentColor, transparent);
  opacity: 0.3;
}

.inception-screen__image-frame {
  margin-top: 24px;
  width: 80%;
  max-width: 560px;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.inception-screen__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.inception-screen__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 28px;
}

.inception-screen__action-link {
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: opacity 0.2s ease;
  font-family: var(--font-body, sans-serif);
}

.inception-screen__action-link:hover {
  opacity: 0.7;
}
</style>
