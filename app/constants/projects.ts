import type { Project } from '~/types/project'

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'lumina-neural-canvas',
    title: 'Lumina Neural Canvas',
    subtitle: 'Low-latency real-time generative canvas engine driven by localized WebGL shaders',
    category: 'AI & Systems',
    description: 'Direct DOM bypassing canvas system executing spatial attention models directly in the browser via WebGPU compute shaders.',
    longDescription: 'Built to solve input latency in interactive AI drawing applications. Lumina decouples user brush stroke capture from GPU tensor evaluation using shared memory buffers. Features sub-16ms latency rendering pipelines and responsive canvas tiling.',
    tags: ['WebGPU', 'TypeScript', 'WGSL', 'React/Vue', 'PyTorch'],
    year: '2026',
    featured: true,
    bentoSize: 'large',
    accentColor: '#AE3B8B',
    githubUrl: 'https://github.com/Dhruv-Mann/lumina-canvas',
    liveUrl: 'https://lumina-canvas.demo',
    metrics: [
      { label: 'Latency', value: '11.4ms' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'GPU Memory', value: '140MB' }
    ],
    highlights: [
      'Custom WGSL compute pipeline for spatial attention',
      'Zero-copy memory sharing between WebGL and WebGPU contexts',
      'Adaptive precision fallback for integrated graphics GPUs'
    ],
    imageSeed: 'lumina-neural'
  },
  {
    id: 'proj-2',
    slug: 'hyper-vector-db',
    title: 'HyperVector',
    subtitle: 'Embedded SIMD-accelerated vector database engine for localized LLM memory',
    category: 'Dev Tools & APIs',
    description: 'Zero-dependency C++/WASM vector index using HNSW graph algorithm and AVX-512 optimizations for sub-millisecond similarity lookups.',
    longDescription: 'HyperVector delivers high-density vector search natively inside Node.js and browser edge runtimes without relying on external cloud vector databases. Designed for edge AI agent persistence and local RAG workflows.',
    tags: ['C++', 'WebAssembly', 'HNSW', 'Vector Index', 'SIMD'],
    year: '2025',
    featured: true,
    bentoSize: 'wide',
    accentColor: '#E17888',
    githubUrl: 'https://github.com/Dhruv-Mann/hyper-vector-db',
    metrics: [
      { label: 'Recall@10', value: '98.4%' },
      { label: 'Query Time', value: '0.42ms' }
    ],
    highlights: [
      'Quantized scalar 8-bit index compression reduces memory footprint by 75%',
      'Single-header integration for C++ and WebAssembly bindings'
    ],
    imageSeed: 'hyper-vector'
  },
  {
    id: 'proj-3',
    slug: 'quantum-memory-allocator',
    title: 'Sub-Ns Cache Allocator',
    subtitle: 'Research on cache line aligned zero-fragmentation memory pool for high-frequency kernel loops',
    category: 'Research & Paper',
    description: 'Benchmarking lock-free slab allocation strategies under heavy multi-threaded contention in Linux systems software.',
    longDescription: 'An empirical investigation into thread-local allocation caching for microsecond-scale network packet processors. Published research paper with formal benchmark analysis.',
    tags: ['Rust', 'Linux Kernel', 'Memory Management', 'Benchmarking'],
    year: '2025',
    featured: true,
    bentoSize: 'tall',
    accentColor: '#1C5789',
    githubUrl: 'https://github.com/Dhruv-Mann/sub-ns-allocator',
    metrics: [
      { label: 'Throughput', value: '42M ops/s' },
      { label: 'Jitter', value: '< 2ns' }
    ],
    highlights: [
      'Lock-free lockless ring buffers with cache-line padding',
      'Valgrind and ThreadSanitizer verified thread safety'
    ],
    imageSeed: 'cache-allocator'
  },
  {
    id: 'proj-4',
    slug: 'pulse-distributed-orchestrator',
    title: 'Pulse Orchestrator',
    subtitle: 'Lightweight distributed worker mesh for async task queue evaluation',
    category: 'Full-Stack Apps',
    description: 'Raft consensus powered micro-orchestrator that handles failovers and job scheduling across hybrid edge networks.',
    longDescription: 'Pulse orchestrates compute tasks across heterogenous node clusters with automatic leader election, TLS mesh encryption, and heartbeat telemetry visualizer.',
    tags: ['Go', 'Raft Consensus', 'gRPC', 'Vue 3', 'Nuxt 4'],
    year: '2025',
    featured: true,
    bentoSize: 'normal',
    accentColor: '#AE3B8B',
    githubUrl: 'https://github.com/Dhruv-Mann/pulse-orchestrator',
    metrics: [
      { label: 'Cluster Sync', value: '1.2ms' },
      { label: 'Fault Recovery', value: '< 50ms' }
    ],
    highlights: [
      'Self-healing Raft cluster protocol',
      'Real-time WebSocket telemetry dashboard built with Nuxt 4'
    ],
    imageSeed: 'pulse-mesh'
  },
  {
    id: 'proj-5',
    slug: 'spatial-code-graph',
    title: 'Spatial Code Graph',
    subtitle: 'Interactive 3D AST visualization system for large monorepo call trees',
    category: 'Design Explorations',
    description: 'Visualizing code dependency topology in 3D force-directed layouts with real-time lint and type dependency highlighting.',
    longDescription: 'Exploring how spatial computing and 3D node graphs improve system comprehendibility for multi-million line codebases.',
    tags: ['Three.js', 'TypeScript', 'AST Parser', 'WebGL'],
    year: '2026',
    featured: true,
    bentoSize: 'normal',
    accentColor: '#E17888',
    githubUrl: 'https://github.com/Dhruv-Mann/spatial-code-graph',
    metrics: [
      { label: 'Nodes Rendered', value: '50,000+' }
    ],
    highlights: [
      'Instanced mesh rendering for 50k nodes at 60 FPS',
      'Tree-sitter integration for multi-language syntax parsing'
    ],
    imageSeed: 'spatial-code'
  },
  {
    id: 'proj-6',
    slug: 'synth-audio-dsp',
    title: 'Spectral DSP Playground',
    subtitle: 'Browser-based procedural sound synthesis and FFT spectrum analyzer',
    category: 'Playground',
    description: 'WebAudio worklet implementation of additive synthesis algorithms with customizable ADSR envelopes and low-pass filters.',
    longDescription: 'Experimenting with high-frequency procedural audio feedback for desktop-grade web user interfaces.',
    tags: ['WebAudio API', 'AudioWorklet', 'TypeScript', 'DSP'],
    year: '2024',
    featured: false,
    bentoSize: 'normal',
    accentColor: '#1C5789',
    githubUrl: 'https://github.com/Dhruv-Mann/spectral-dsp',
    imageSeed: 'audio-dsp'
  }
]
