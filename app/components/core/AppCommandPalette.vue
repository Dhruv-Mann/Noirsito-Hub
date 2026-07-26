<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isOpen = ref(false)
const searchQuery = ref('')
const selectedIndex = ref(0)
const copiedMessage = ref('')

const actions = [
  {
    id: 'github',
    title: 'Open GitHub Profile',
    handler: () => {
      window.open('https://github.com/Dhruv-Mann', '_blank')
    }
  },
  {
    id: 'copy-email',
    title: 'Copy Contact Email',
    handler: () => {
      navigator.clipboard.writeText('dhruv.mann.dev@gmail.com')
      showToast('Email copied to clipboard!')
    }
  },
  {
    id: 'copy-github',
    title: 'Copy GitHub Repository URL',
    handler: () => {
      navigator.clipboard.writeText('https://github.com/Dhruv-Mann/Noir-Hub')
      showToast('GitHub URL copied to clipboard!')
    }
  },
  {
    id: 'stack',
    title: 'Inspect System Architecture Stack',
    handler: () => {
      showToast('Nuxt 4 • Vue 3 • WebGL • SIMD C++ WASM • Raft Consensus')
    }
  }
]

const filteredActions = computed(() => {
  if (!searchQuery.value.trim()) return actions
  const q = searchQuery.value.toLowerCase().trim()
  return actions.filter(a => a.title.toLowerCase().includes(q))
})

function showToast(msg: string) {
  copiedMessage.value = msg
  setTimeout(() => {
    copiedMessage.value = ''
  }, 2200)
}

function handleKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      searchQuery.value = ''
      selectedIndex.value = 0
    }
    return
  }

  if (!isOpen.value) return

  if (e.key === 'Escape') {
    isOpen.value = false
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % filteredActions.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value =
      (selectedIndex.value - 1 + filteredActions.value.length) % filteredActions.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const selected = filteredActions.value[selectedIndex.value]
    if (selected) {
      selected.handler()
      isOpen.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div>
    <!-- Floating Ctrl+K Trigger Badge -->
    <button class="cmd-k-trigger font-mono" @click="isOpen = true">
      <span>Ctrl+K</span>
      <span class="cmd-k-label">Command Palette</span>
    </button>

    <!-- Command Palette Modal -->
    <Transition name="palette-fade">
      <div v-if="isOpen" class="palette-backdrop" @click.self="isOpen = false">
        <div class="palette-modal font-body">
          <div class="palette-header">
            <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35" stroke-linecap="round"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search commands, links, stack, actions... (ESC to close)"
              class="palette-input font-body"
              autoFocus
            />
            <kbd class="esc-badge font-mono">ESC</kbd>
          </div>

          <div class="palette-body">
            <div v-if="filteredActions.length > 0" class="actions-list">
              <div
                v-for="(action, index) in filteredActions"
                :key="action.id"
                class="action-item"
                :class="{ selected: selectedIndex === index }"
                @click="action.handler(); isOpen = false;"
                @mouseenter="selectedIndex = index"
              >
                <span class="action-title">{{ action.title }}</span>
              </div>
            </div>
            <div v-else class="no-results font-mono">
              No matching commands found
            </div>
          </div>

          <div class="palette-footer font-mono">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast Notification -->
    <Transition name="toast-fade">
      <div v-if="copiedMessage" class="toast-notification font-mono">
        {{ copiedMessage }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.cmd-k-trigger {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: var(--space-phi-sm);
  background: rgba(45, 17, 16, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(174, 59, 139, 0.4);
  color: #E17888;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all var(--duration-fast) var(--ease-out);
}

.cmd-k-trigger:hover {
  color: #ffffff;
  border-color: #AE3B8B;
  background: rgba(174, 59, 139, 0.25);
  transform: translateY(-2px);
}

.palette-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
}

.palette-modal {
  width: 100%;
  max-width: 580px;
  background: #1e0b0b;
  border: 1px solid rgba(174, 59, 139, 0.4);
  border-radius: var(--radius-md);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.8), 0 0 30px rgba(174, 59, 139, 0.25);
  overflow: hidden;
}

.palette-header {
  display: flex;
  align-items: center;
  padding: var(--space-phi-md) var(--space-phi-lg);
  border-bottom: 1px solid rgba(225, 120, 136, 0.2);
  gap: var(--space-phi-sm);
}

.search-icon {
  color: #AE3B8B;
}

.palette-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 1rem;
}

.esc-badge {
  font-size: 0.6875rem;
  color: rgba(225, 120, 136, 0.7);
  background: rgba(225, 120, 136, 0.15);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
}

.palette-body {
  max-height: 320px;
  overflow-y: auto;
  padding: var(--space-phi-sm) 0;
}

.action-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px var(--space-phi-lg);
  cursor: pointer;
  transition: background 0.15s ease;
}

.action-item.selected {
  background: rgba(174, 59, 139, 0.25);
}

.action-title {
  font-size: 0.9375rem;
  color: #ffffff;
}

.no-results {
  padding: var(--space-phi-lg);
  text-align: center;
  color: rgba(225, 120, 136, 0.6);
  font-size: 0.875rem;
}

.palette-footer {
  display: flex;
  align-items: center;
  gap: var(--space-phi-lg);
  padding: 8px var(--space-phi-lg);
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(225, 120, 136, 0.15);
  font-size: 0.75rem;
  color: rgba(225, 120, 136, 0.7);
}

.toast-notification {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;
  background: #AE3B8B;
  color: #ffffff;
  padding: 8px 20px;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 6px 24px rgba(174, 59, 139, 0.5);
}

.palette-fade-enter-active,
.palette-fade-leave-active {
  transition: opacity 0.25s var(--ease-out);
}
.palette-fade-enter-from,
.palette-fade-leave-to {
  opacity: 0;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s var(--ease-out);
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}
</style>
