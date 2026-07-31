# ⚡ Noirsito Hub — Interactive Systems & Tech Stack Laboratory

> **An executive engineering stage and interactive showcase hub built with Nuxt 4, Vue 3, and 5-Column Layout Modernism.**

[![Framework](https://img.shields.io/badge/Framework-Nuxt_4.0+-00DC82?style=flat-square&logo=nuxt.js)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Core-Vue_3.5+-4FC08D?style=flat-square&logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript_5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-00A19B?style=flat-square)](LICENSE)

---

## 🏛️ Overview

**Noirsito Hub** is an out-of-distribution engineering laboratory designed to showcase production-grade desktop applications, AI file context engines, and zero-dependency Vue 3 component registries. 

Rather than a static portfolio, Noirsito Hub functions as an interactive system stage where visitors explore technical telemetry, SQLite transaction logs, and high-fashion modernist project read pages.

---

## ✨ Key Features & Architecture

* **📐 5-Column Layout Modernism:** High-contrast editorial layouts featuring Waverly Display typography, bracketed section telemetry (`[01]`–`[04]`), and uncropped screenshot bezels.
* **🎨 Viewport Palette Morphing:** Smooth background canvas transitions (`transition: background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)`) that dynamically morph as visitors cycle between projects.
* **🎛️ Dynamic Island Navigation:** Expandable floating navbar themed to dynamically match each project's accent color palette (#00A19B Teal, #DC2626 Crimson, #EA580C Amber).
* **⌨️ Raycast-Style `Ctrl+K` Command Palette:** Instant keyboard-first navigation with color-coded category headers, live search filtering, and custom scrollbars.
* **🎹 Direct Keyboard Cycling (`J` / `K` Keys):** Press `J` or `K` on any read page to cycle seamlessly through projects without returning to the index, complete with `[ESC]` return triggers.
* **📱 Mobile Tabbed Modernism & Haptics:** Automatic mobile tab selector on `< 640px` viewports with native touch vibration feedback (`navigator.vibrate(12)`).

---

## 📦 Featured Systems Showcase

| Project | Domain | Architecture Stack | Description |
| :--- | :--- | :--- | :--- |
| **[Noirsito UI](https://github.com/Dhruv-Mann/Noirsito-UI)** | Component Registry & CLI | Nuxt 4 • Vue 3 • Node CLI • Direct DOM | Zero-dependency Vue 3 component registry and CLI (`npx noirsito-ui add <component>`). |
| **[Filemind](https://github.com/Dhruv-Mann/filemind)** | AI / ML Desktop System | Tauri v2 • Rust • React 18 • Ollama AI • SQLite | Local desktop engine that categorizes Downloads using embedded Ollama LLM and reversible undo logs. |
| **[Sentinel Vision](https://github.com/Dhruv-Mann/Sentinel-Vision)** | Full Stack Telemetry | Next.js 16 • React 19 • Supabase RLS | Resume tracking platform with viewer geolocation, reading duration metrics, and 1-click link kill switch. |

---

## 🛠️ Technology Stack

* **Core Framework:** [Nuxt 4](https://nuxt.com) + [Vue 3](https://vuejs.org) (Composition API, `<script setup>`)
* **State Management:** Custom Composables (`usePageTransition`, `useSystemState`) + Direct Reactive Binding
* **Styling & Themeing:** Vanilla CSS, Dynamic CSS Custom Properties (`var(--m5-paper-bg)`), Zero Heavy Utility Frameworks
* **Typography:** Waverly Display Serif, Abril Fatface, Archivo, Fira Code
* **Deployment & Hosting:** [Vercel Serverless Platform](https://vercel.com) (`vercel.json` optimized)

---

## 🚀 Local Development Setup

### Prerequisites
* Node.js v18.0.0 or higher
* npm or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/Dhruv-Mann/Noirsito-Hub.git
cd Noirsito-Hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE). Built with craft by **Dhruv Mann**.
