<script lang="ts" setup>
interface Props {
  text?: string
  wide?: boolean
  to?: string
  href?: string
  accentColor?: string
}

withDefaults(defineProps<Props>(), {
  text: 'Button',
  wide: false,
  to: undefined,
  href: undefined,
  accentColor: '#00A19B'
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="interactive-hover-btn group"
    :class="{ 'min-w-56': wide }"
    :style="{ '--btn-accent': accentColor }"
  >
    <div class="btn-dot-expand" aria-hidden="true" />
    
    <div class="btn-content-default">
      <slot name="default">
        <span>{{ text }}</span>
      </slot>
    </div>

    <div class="btn-content-hover">
      <slot name="hover">
        <slot name="default">
          <span>{{ text }}</span>
        </slot>
      </slot>
    </div>
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="interactive-hover-btn group"
    :class="{ 'min-w-56': wide }"
    :style="{ '--btn-accent': accentColor }"
  >
    <div class="btn-dot-expand" aria-hidden="true" />
    
    <div class="btn-content-default">
      <slot name="default">
        <span>{{ text }}</span>
      </slot>
    </div>

    <div class="btn-content-hover">
      <slot name="hover">
        <slot name="default">
          <span>{{ text }}</span>
        </slot>
      </slot>
    </div>
  </a>

  <button
    v-else
    type="button"
    class="interactive-hover-btn group"
    :class="{ 'min-w-56': wide }"
    :style="{ '--btn-accent': accentColor }"
  >
    <div class="btn-dot-expand" aria-hidden="true" />
    
    <div class="btn-content-default">
      <slot name="default">
        <span>{{ text }}</span>
      </slot>
    </div>

    <div class="btn-content-hover">
      <slot name="hover">
        <slot name="default">
          <span>{{ text }}</span>
        </slot>
      </slot>
    </div>
  </button>
</template>

<style scoped>
.interactive-hover-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.interactive-hover-btn:hover {
  border-color: var(--btn-accent, #00A19B);
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.interactive-hover-btn:active {
  transform: translateY(0) scale(0.98);
}

/* Expanding Dot Background */
.btn-dot-expand {
  position: absolute;
  left: 12px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--btn-accent, #00A19B);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              left 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-radius 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  pointer-events: none;
}

.interactive-hover-btn:hover .btn-dot-expand {
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
}

/* Default Content State */
.btn-content-default {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.interactive-hover-btn:hover .btn-content-default {
  opacity: 0;
  transform: translateX(12px);
}

/* Hover Content State */
.btn-content-hover {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #000000;
  font-weight: 800;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1) 0.04s,
              transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) 0.04s;
}

.interactive-hover-btn:hover .btn-content-hover {
  opacity: 1;
  transform: translateX(0);
}

.interactive-hover-btn:hover :deep(.m5-key-tag),
.interactive-hover-btn:hover :deep(.m5-esc-hint) {
  color: #000000 !important;
}
</style>
