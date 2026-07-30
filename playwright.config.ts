import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './scripts',
  timeout: 120_000,
  // Use a standalone tsconfig that is not entangled with Nuxt's
  // .nuxt/tsconfig.json (which uses "bundler" moduleResolution incompatible
  // with Playwright's CommonJS worker process).
  tsconfig: './scripts/tsconfig.json',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
})
