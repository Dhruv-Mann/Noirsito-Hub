<script setup lang="ts">
import { provide } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useSmoothScroll } from '~/composables/useSmoothScroll'

const isTouch = useMediaQuery('(pointer: coarse)')
provide('isTouch', isTouch)

useSmoothScroll()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
