# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: route-fuzz-crawler.spec.ts >> random multi-hop navigation does not break routing
- Location: scripts\route-fuzz-crawler.spec.ts:65:1

# Error details

```
Error: Navigation broke during fuzz run — see console output above. Seed: 1785443518132

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 89

- Array []
+ Array [
+   "Console error at http://localhost:3000/: Failed to load resource: the server responded with a status of 500 (Vite Error)",
+   "Hop 0: clicking \"⟲Show error overlay\" on http://localhost:3000/ threw: locator.click: Timeout 3000ms exceeded.
+ Call log:
+   - waiting for locator('a[href], [data-nav], button:not([data-nav=\"false\"])').nth(1)
+     - locator resolved to <button hidden=\"\" type=\"button\" id=\"pip-restore\" aria-label=\"Show error overlay\">…</button>
+   - attempting click action
+     2 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+     - waiting 20ms
+     2 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+       - waiting 100ms
+     6 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+       - waiting 500ms
+ ",
+   "Hop 1: clicking \"×\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 1 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 2: clicking \"×\" on http://localhost:3000/ threw: locator.click: Timeout 3000ms exceeded.
+ Call log:
+   - waiting for locator('a[href], [data-nav], button:not([data-nav=\"false\"])').first()
+     - locator resolved to <button hidden=\"\" type=\"button\" id=\"pip-close\" aria-label=\"Hide error page preview\">×</button>
+   - attempting click action
+     2 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+     - waiting 20ms
+     2 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+       - waiting 100ms
+     6 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+       - waiting 500ms
+ ",
+   "Hop 3: clicking \"\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 2 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 4: clicking \"\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 3 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 5: clicking \"\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 4 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 6: clicking \"\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 5 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 7: clicking \"×\" on http://localhost:3000/ threw: locator.click: Timeout 3000ms exceeded.
+ Call log:
+   - waiting for locator('a[href], [data-nav], button:not([data-nav=\"false\"])').first()
+     - locator resolved to <button hidden=\"\" type=\"button\" id=\"pip-close\" aria-label=\"Hide error page preview\">×</button>
+   - attempting click action
+     2 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+     - waiting 20ms
+     2 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+       - waiting 100ms
+     6 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+       - waiting 500ms
+ ",
+   "Hop 8: clicking \"\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 6 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 9: clicking \"⟲
+ Show error page\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 7 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 10: clicking \"×\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 8 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 11: clicking \"\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 9 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 12: clicking \"×\" on http://localhost:3000/ threw: locator.click: Timeout 3000ms exceeded.
+ Call log:
+   - waiting for locator('a[href], [data-nav], button:not([data-nav=\"false\"])').first()
+     - locator resolved to <button hidden=\"\" type=\"button\" id=\"pip-close\" aria-label=\"Hide error page preview\">×</button>
+   - attempting click action
+     2 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+     - waiting 20ms
+     2 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+       - waiting 100ms
+     5 × waiting for element to be visible, enabled and stable
+       - element is not visible
+     - retrying click action
+       - waiting 500ms
+     - waiting for element to be visible, enabled and stable
+ ",
+   "Hop 13: clicking \"\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 10 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+   "Hop 14: clicking \"⟲
+ Show error page\" on http://localhost:3000/ did NOT change the route (stayed on http://localhost:3000/). This page had been visited 11 time(s) before this click — likely a stale-state bug that only appears on revisit, not first load.",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e5]:
    - heading "500" [level=1] [ref=e6]
    - paragraph [ref=e7]: /components/core/PageTransitionSheet.vue — Identifier 'useRouter' has already been declared. (7:19)
  - status [ref=e8]
  - iframe [ref=e9]:
    - generic [ref=f1e2]:
      - banner [ref=f1e3]:
        - generic [ref=f1e5]:
          - checkbox [ref=f1e6]
          - generic "Light mode" [ref=f1e8] [cursor=pointer]
      - generic [ref=f1e13]:
        - heading "Error" [level=4] [ref=f1e14]
        - heading "An error has occurred" [level=1] [ref=f1e15]
      - heading "/components/core/PageTransitionSheet.vue — Identifier 'useRouter' has already been declared. (7:19) Copy error with stack trace to clipboard" [level=2] [ref=f1e19]:
        - generic [ref=f1e23]: /components/core/PageTransitionSheet.vue — Identifier 'useRouter' has already been declared. (7:19)
        - button "Copy error with stack trace to clipboard" [ref=f1e24] [cursor=pointer]
      - generic [ref=f1e30]:
        - heading "Stack Trace" [level=3] [ref=f1e33]
        - generic [ref=f1e35]:
          - generic [ref=f1e36]:
            - generic [ref=f1e38]:
              - checkbox "View All Frames" [ref=f1e39]
              - generic [ref=f1e40]: View All Frames
            - generic [ref=f1e42]:
              - button "Pretty" [ref=f1e43]
              - button "Raw" [ref=f1e44]
          - list [ref=f1e47]:
            - listitem [ref=f1e48]:
              - generic [ref=f1e49]:
                - button [ref=f1e50]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e51] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:365
                  - generic [ref=f1e52]:
                    - text: in
                    - code [ref=f1e53]: constructor
                  - generic [ref=f1e54]:
                    - text: at line
                    - code [ref=f1e55]: 365:19
                - button [ref=f1e57]
              - code [ref=f1e62]:
                - generic [ref=f1e63]: "}; if (oldReasonCodes[reasonCode]) { reasonCode = oldReasonCodes[reasonCode]; } return function constructor(loc, details) { const error = new SyntaxError(); error.code = code; error.reasonCode = reasonCode; error.loc = loc; error.pos = loc.index; error.syntaxPlugin = syntaxPlugin;"
            - listitem [ref=f1e77]:
              - generic [ref=f1e78]:
                - button [ref=f1e79]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e80] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:6616
                  - generic [ref=f1e81]:
                    - text: in
                    - code [ref=f1e82]: TypeScriptParserMixin.raise
                  - generic [ref=f1e83]:
                    - text: at line
                    - code [ref=f1e84]: 6616:19
                - button [ref=f1e86]
            - listitem [ref=f1e89]:
              - generic [ref=f1e90]:
                - button [ref=f1e91]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e92] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:4878
                  - generic [ref=f1e93]:
                    - text: in
                    - code [ref=f1e94]: TypeScriptScopeHandler.declareName
                  - generic [ref=f1e95]:
                    - text: at line
                    - code [ref=f1e96]: 4878:21
                - button [ref=f1e98]
            - listitem [ref=f1e101]:
              - generic [ref=f1e102]:
                - button [ref=f1e103]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e104] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:7584
                  - generic [ref=f1e105]:
                    - text: in
                    - code [ref=f1e106]: TypeScriptParserMixin.declareNameFromIdentifier
                  - generic [ref=f1e107]:
                    - text: at line
                    - code [ref=f1e108]: 7584:16
                - button [ref=f1e110]
            - listitem [ref=f1e113]:
              - generic [ref=f1e114]:
                - button [ref=f1e115]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e116] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:7580
                  - generic [ref=f1e117]:
                    - text: in
                    - code [ref=f1e118]: TypeScriptParserMixin.checkIdentifier
                  - generic [ref=f1e119]:
                    - text: at line
                    - code [ref=f1e120]: 7580:12
                - button [ref=f1e122]
            - listitem [ref=f1e125]:
              - generic [ref=f1e126]:
                - button [ref=f1e127]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e128] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:7517
                  - generic [ref=f1e129]:
                    - text: in
                    - code [ref=f1e130]: TypeScriptParserMixin.checkLVal
                  - generic [ref=f1e131]:
                    - text: at line
                    - code [ref=f1e132]: 7517:12
                - button [ref=f1e134]
            - listitem [ref=f1e137]:
              - generic [ref=f1e138]:
                - button [ref=f1e139]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e140] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:14283
                  - generic [ref=f1e141]:
                    - text: in
                    - code [ref=f1e142]: TypeScriptParserMixin.finishImportSpecifier
                  - generic [ref=f1e143]:
                    - text: at line
                    - code [ref=f1e144]: 14283:10
                - button [ref=f1e146]
            - listitem [ref=f1e149]:
              - generic [ref=f1e150]:
                - button [ref=f1e151]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e152] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:14436
                  - generic [ref=f1e153]:
                    - text: in
                    - code [ref=f1e154]: TypeScriptParserMixin.parseImportSpecifier
                  - generic [ref=f1e155]:
                    - text: at line
                    - code [ref=f1e156]: 14436:17
                - button [ref=f1e158]
            - listitem [ref=f1e161]:
              - generic [ref=f1e162]:
                - button [ref=f1e163]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e164] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:10165
                  - generic [ref=f1e165]:
                    - text: in
                    - code [ref=f1e166]: TypeScriptParserMixin.parseImportSpecifier
                  - generic [ref=f1e167]:
                    - text: at line
                    - code [ref=f1e168]: 10165:18
                - button [ref=f1e170]
            - listitem [ref=f1e173]:
              - generic [ref=f1e174]:
                - button [ref=f1e175]:
                  - link "D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js" [ref=f1e176] [cursor=pointer]:
                    - /url: vscode://file/D:/GitHub/HUB/node_modules/@babel/parser/lib/index.js:14415
                  - generic [ref=f1e177]:
                    - text: in
                    - code [ref=f1e178]: TypeScriptParserMixin.parseNamedImportSpecifiers
                  - generic [ref=f1e179]:
                    - text: at line
                    - code [ref=f1e180]: 14415:36
                - button [ref=f1e182]
      - generic [ref=f1e186]:
        - heading "Error Cause" [level=3] [ref=f1e189]
        - code [ref=f1e194]:
          - generic [ref=f1e195]:
            - text: "Error {"
            - button "▼" [ref=f1e196]
            - text: "}"
      - generic [ref=f1e199]:
        - heading "Request" [level=3] [ref=f1e201]
        - generic [ref=f1e202]:
          - generic [ref=f1e203]:
            - heading "url" [level=4] [ref=f1e204]
            - text: http://localhost:3000/
          - generic [ref=f1e205]:
            - heading "method" [level=4] [ref=f1e206]
            - text: GET
          - generic [ref=f1e207]:
            - heading "headers" [level=4] [ref=f1e208]
            - table [ref=f1e209]:
              - rowgroup [ref=f1e210]:
                - row [ref=f1e211]:
                  - cell "host" [ref=f1e212]
                  - cell "localhost:3000" [ref=f1e213]
                - row [ref=f1e214]:
                  - cell "connection" [ref=f1e215]
                  - cell "keep-alive" [ref=f1e216]
                - row [ref=f1e217]:
                  - cell "sec-ch-ua" [ref=f1e218]
                  - cell "\"Not=A?Brand\";v=\"99\", \"HeadlessChrome\";v=\"151\", \"Chromium\";v=\"151\"" [ref=f1e219]
                - row [ref=f1e220]:
                  - cell "sec-ch-ua-mobile" [ref=f1e221]
                  - cell "?0" [ref=f1e222]
                - row [ref=f1e223]:
                  - cell "sec-ch-ua-platform" [ref=f1e224]
                  - cell "\"Windows\"" [ref=f1e225]
                - row [ref=f1e226]:
                  - cell "upgrade-insecure-requests" [ref=f1e227]
                  - cell "1" [ref=f1e228]
                - row [ref=f1e229]:
                  - cell "user-agent" [ref=f1e230]
                  - cell "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.7922.34 Safari/537.36" [ref=f1e231]
                - row [ref=f1e232]:
                  - cell "accept-language" [ref=f1e233]
                  - cell "en-US" [ref=f1e234]
                - row [ref=f1e235]:
                  - cell "accept" [ref=f1e236]
                  - cell "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7" [ref=f1e237]
                - row [ref=f1e238]:
                  - cell "sec-fetch-site" [ref=f1e239]
                  - cell "none" [ref=f1e240]
                - row [ref=f1e241]:
                  - cell "sec-fetch-mode" [ref=f1e242]
                  - cell "navigate" [ref=f1e243]
                - row [ref=f1e244]:
                  - cell "sec-fetch-user" [ref=f1e245]
                  - cell "?1" [ref=f1e246]
                - row [ref=f1e247]:
                  - cell "sec-fetch-dest" [ref=f1e248]
                  - cell "document" [ref=f1e249]
                - row [ref=f1e250]:
                  - cell "accept-encoding" [ref=f1e251]
                  - cell "gzip, deflate, br, zstd" [ref=f1e252]
                - row [ref=f1e253]:
                  - cell "x-forwarded-for" [ref=f1e254]
                  - cell "::1" [ref=f1e255]
                - row [ref=f1e256]:
                  - cell "x-forwarded-port" [ref=f1e257]
                  - cell "3000" [ref=f1e258]
                - row [ref=f1e259]:
                  - cell "x-forwarded-proto" [ref=f1e260]
                  - cell "http" [ref=f1e261]
  - iframe [ref=e10]:
    - generic [ref=f2e5]:
      - heading "500" [level=1] [ref=f2e6]
      - paragraph [ref=f2e7]: /components/core/PageTransitionSheet.vue — Identifier 'useRouter' has already been declared. (7:19)
  - button "Toggle detailed error view Hide error page preview" [expanded] [ref=e11]:
    - generic [ref=e12]: Toggle detailed error view
    - button "Hide error page preview" [ref=e13] [cursor=pointer]: ×
  - generic [ref=e14]:
    - button "Toggle Nuxt DevTools" [ref=e15] [cursor=pointer]
    - generic "App load time" [ref=e19]:
      - generic [ref=e20]: "173"
      - generic [ref=e21]: ms
    - button "Toggle Component Inspector" [ref=e23] [cursor=pointer]
```

# Test source

```ts
  29  |     seed |= 0
  30  |     seed = (seed + 0x6d2b79f5) | 0
  31  |     let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  32  |     t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  33  |     return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  34  |   }
  35  | }
  36  | const rand = mulberry32(SEED)
  37  | 
  38  | // Selector for anything meant to trigger navigation. ADAPT THIS to match
  39  | // your actual component conventions. If custom button/link components
  40  | // don't expose a stable attribute, add a shared `data-nav` attribute to
  41  | // them first — it makes this test (and future debugging) far more
  42  | // reliable than guessing by class name or tag.
  43  | const NAV_SELECTOR = 'a[href], [data-nav], button:not([data-nav="false"])'
  44  | 
  45  | interface NavTarget {
  46  |   index: number
  47  |   text: string
  48  |   disabled: boolean
  49  | }
  50  | 
  51  | async function collectNavTargets(page: Page): Promise<NavTarget[]> {
  52  |   const els = await page.locator(NAV_SELECTOR).all()
  53  |   const targets: NavTarget[] = []
  54  |   for (let i = 0; i < els.length; i++) {
  55  |     const el = els[i]
  56  |     const [text, disabled] = await Promise.all([
  57  |       el.innerText().catch(() => ''),
  58  |       el.isDisabled().catch(() => false),
  59  |     ])
  60  |     targets.push({ index: i, text: text.trim().slice(0, 40), disabled })
  61  |   }
  62  |   return targets
  63  | }
  64  | 
  65  | test('random multi-hop navigation does not break routing', async ({ page }) => {
  66  |   const visited: string[] = []
  67  |   const failures: string[] = []
  68  | 
  69  |   page.on('console', (msg) => {
  70  |     if (msg.type() === 'error' || /hydration/i.test(msg.text())) {
  71  |       failures.push(`Console ${msg.type()} at ${page.url()}: ${msg.text()}`)
  72  |     }
  73  |   })
  74  | 
  75  |   await page.goto(BASE_URL)
  76  |   visited.push(page.url())
  77  | 
  78  |   for (let hop = 0; hop < HOPS; hop++) {
  79  |     const targets = await collectNavTargets(page)
  80  |     const clickable = targets.filter((t) => !t.disabled)
  81  | 
  82  |     if (clickable.length === 0) {
  83  |       failures.push(
  84  |         `Hop ${hop} on ${page.url()}: no enabled nav elements found ` +
  85  |           `(${targets.length} total, all disabled). If this page had working ` +
  86  |           `buttons before, this IS the bug — check for a stuck lock/loading flag.`
  87  |       )
  88  |       break
  89  |     }
  90  | 
  91  |     const choice = clickable[Math.floor(rand() * clickable.length)]
  92  |     const urlBefore = page.url()
  93  |     const el = page.locator(NAV_SELECTOR).nth(choice.index)
  94  | 
  95  |     let navigated = true
  96  |     try {
  97  |       await Promise.all([
  98  |         page.waitForURL(() => true, { timeout: 3000 }).catch(() => {
  99  |           navigated = false
  100 |         }),
  101 |         el.click({ timeout: 3000 }),
  102 |       ])
  103 |     } catch (err) {
  104 |       failures.push(
  105 |         `Hop ${hop}: clicking "${choice.text}" on ${urlBefore} threw: ${(err as Error).message}`
  106 |       )
  107 |       continue
  108 |     }
  109 | 
  110 |     const urlAfter = page.url()
  111 |     if (!navigated || urlAfter === urlBefore) {
  112 |       const revisits = visited.filter((u) => u === urlBefore).length
  113 |       failures.push(
  114 |         `Hop ${hop}: clicking "${choice.text}" on ${urlBefore} did NOT change ` +
  115 |           `the route (stayed on ${urlAfter}). This page had been visited ` +
  116 |           `${revisits} time(s) before this click — likely a stale-state bug ` +
  117 |           `that only appears on revisit, not first load.`
  118 |       )
  119 |     }
  120 |     visited.push(urlAfter)
  121 |   }
  122 | 
  123 |   if (failures.length) {
  124 |     console.error(
  125 |       `\nNav fuzz failures (seed=${SEED}). Re-run with NAV_FUZZ_SEED=${SEED} to reproduce exactly:\n` +
  126 |         failures.join('\n')
  127 |     )
  128 |   }
> 129 |   expect(failures, `Navigation broke during fuzz run — see console output above. Seed: ${SEED}`).toEqual([])
      |                                                                                                  ^ Error: Navigation broke during fuzz run — see console output above. Seed: 1785443518132
  130 | })
  131 | 
```