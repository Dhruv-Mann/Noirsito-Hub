import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt'
  ],

  googleFonts: {
    families: {
      'Space+Grotesk': [400, 500, 600, 700],
      'Inter': [300, 400, 500, 600, 700],
      'JetBrains+Mono': [400, 500]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true
  },

  css: [
    '~/assets/styles/reset.css',
    '~/assets/styles/tokens.css',
    '~/assets/styles/typography.css'
  ],

  app: {
    head: {
      title: 'Dhruv Mann • Digital Hub & OS',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal Operating System and Digital Hub of Dhruv Mann - AI Systems, Full-Stack Architecture, Research & Engineering Explorations.' },
        { name: 'theme-color', content: '#341514' },
        { property: 'og:title', content: 'Dhruv Mann • Digital Hub & OS' },
        { property: 'og:description', content: 'Central operating system for AI projects, research, systems engineering, and design explorations.' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  nitro: {
    compressPublicAssets: true
  }
})
