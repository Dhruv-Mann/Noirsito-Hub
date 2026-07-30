// scripts/route-fuzz-crawler.spec.ts
//
// Randomized multi-hop navigation stress test for Nuxt/Vue SPAs.
//
// Goal: reproduce "button/link worked on first visit, stopped routing
// correctly after N other navigations" bugs. A single manual click will
// never catch this — it only shows up after enough random hops, including
// deliberately revisiting pages already seen, which is exactly what this
// script does.
//
// Usage:
//   npm i -D @playwright/test
//   npx playwright test scripts/route-fuzz-crawler.spec.ts
//
// Env vars:
//   NAV_FUZZ_BASE_URL  - default http://localhost:3000 (your Nuxt dev server)
//   NAV_FUZZ_HOPS      - default 40
//   NAV_FUZZ_SEED      - set this to an exact number to replay a failing run

import { test, expect, Page } from '@playwright/test'

const BASE_URL = process.env.NAV_FUZZ_BASE_URL ?? 'http://localhost:3000'
const HOPS = Number(process.env.NAV_FUZZ_HOPS ?? 40)
const SEED = Number(process.env.NAV_FUZZ_SEED ?? Date.now())

// Seeded PRNG so a failing run can be reproduced exactly via NAV_FUZZ_SEED.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(SEED)

// Selector for anything meant to trigger navigation. ADAPT THIS to match
// your actual component conventions. If custom button/link components
// don't expose a stable attribute, add a shared `data-nav` attribute to
// them first — it makes this test (and future debugging) far more
// reliable than guessing by class name or tag.
const NAV_SELECTOR = 'a[href], [data-nav], button:not([data-nav="false"])'

interface NavTarget {
  index: number
  text: string
  disabled: boolean
}

async function collectNavTargets(page: Page): Promise<NavTarget[]> {
  const els = await page.locator(NAV_SELECTOR).all()
  const targets: NavTarget[] = []
  for (let i = 0; i < els.length; i++) {
    const el = els[i]
    const [text, disabled] = await Promise.all([
      el.innerText().catch(() => ''),
      el.isDisabled().catch(() => false),
    ])
    targets.push({ index: i, text: text.trim().slice(0, 40), disabled })
  }
  return targets
}

test('random multi-hop navigation does not break routing', async ({ page }) => {
  const visited: string[] = []
  const failures: string[] = []

  page.on('console', (msg) => {
    if (msg.type() === 'error' || /hydration/i.test(msg.text())) {
      failures.push(`Console ${msg.type()} at ${page.url()}: ${msg.text()}`)
    }
  })

  await page.goto(BASE_URL)
  visited.push(page.url())

  for (let hop = 0; hop < HOPS; hop++) {
    const targets = await collectNavTargets(page)
    const clickable = targets.filter((t) => !t.disabled)

    if (clickable.length === 0) {
      failures.push(
        `Hop ${hop} on ${page.url()}: no enabled nav elements found ` +
          `(${targets.length} total, all disabled). If this page had working ` +
          `buttons before, this IS the bug — check for a stuck lock/loading flag.`
      )
      break
    }

    const choice = clickable[Math.floor(rand() * clickable.length)]
    const urlBefore = page.url()
    const el = page.locator(NAV_SELECTOR).nth(choice.index)

    let navigated = true
    try {
      await Promise.all([
        page.waitForURL(() => true, { timeout: 3000 }).catch(() => {
          navigated = false
        }),
        el.click({ timeout: 3000 }),
      ])
    } catch (err) {
      failures.push(
        `Hop ${hop}: clicking "${choice.text}" on ${urlBefore} threw: ${(err as Error).message}`
      )
      continue
    }

    const urlAfter = page.url()
    if (!navigated || urlAfter === urlBefore) {
      const revisits = visited.filter((u) => u === urlBefore).length
      failures.push(
        `Hop ${hop}: clicking "${choice.text}" on ${urlBefore} did NOT change ` +
          `the route (stayed on ${urlAfter}). This page had been visited ` +
          `${revisits} time(s) before this click — likely a stale-state bug ` +
          `that only appears on revisit, not first load.`
      )
    }
    visited.push(urlAfter)
  }

  if (failures.length) {
    console.error(
      `\nNav fuzz failures (seed=${SEED}). Re-run with NAV_FUZZ_SEED=${SEED} to reproduce exactly:\n` +
        failures.join('\n')
    )
  }
  expect(failures, `Navigation broke during fuzz run — see console output above. Seed: ${SEED}`).toEqual([])
})
