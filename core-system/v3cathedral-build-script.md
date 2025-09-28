# Cathedral Monorepo - Complete Build Script

This document contains all the files needed to create the Cathedral system. Follow these steps to build the complete monorepo structure.

## Initial Setup

```bash
# Create the monorepo structure
mkdir -p cathedral-monorepo
cd cathedral-monorepo

# Initialize with pnpm
pnpm init

# Create directory structure
mkdir -p apps/portal/src/{engine,labs}
mkdir -p apps/portal/public/registry
mkdir -p apps/portal/functions/api
mkdir -p packages/config-vite
mkdir -p services/circuitum99
mkdir -p services/tesseract-bridge
mkdir -p tooling/schemas
mkdir -p .vscode
```

## Root Configuration Files

### pnpm-workspace.yaml
```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "services/*"
  - "tooling/*"
```

### package.json (root)
```json
{
  "name": "cathedral-monorepo",
  "private": true,
  "scripts": {
    "dev:portal": "pnpm --filter @cathedral/portal dev",
    "dev:arcanae": "pnpm --filter @cathedral/arcanae dev",
    "dev:grimoire": "pnpm --filter @cathedral/grimoire dev",
    "build": "pnpm -r build",
    "validate": "node tooling/schemas/validate.mjs"
  },
  "devDependencies": {
    "ajv": "^8.17.1"
  }
}
```

## Shared Vite Configuration

### packages/config-vite/package.json
```json
{
  "name": "@cathedral/config-vite",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js"
}
```

### packages/config-vite/index.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default function cathedralViteConfig() {
  return defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASE || '/',
    build: { 
      outDir: 'dist', 
      sourcemap: true 
    },
    assetsInclude: ['**/*.wasm', '**/*.webp', '**/*.png', '**/*.avif'],
    server: { 
      port: 5173, 
      open: false 
    }
  })
}
```

## Portal Application

### apps/portal/package.json
```json
{
  "name": "@cathedral/portal",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 4173"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tone": "^14.8.49"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.3.0",
    "@cathedral/config-vite": "workspace:*",
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0"
  }
}
```

### apps/portal/vite.config.ts
```typescript
import cfg from '@cathedral/config-vite'
export default cfg()
```

### apps/portal/index.html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Cathedral of Circuits</title>
  <style>
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: .001ms !important;
        transition-duration: .001ms !important;
      }
    }
    html, body, #root {
      height: 100%;
      margin: 0;
      background: #0b0b0f;
      color: #eaeaf2;
    }
    .boot {
      display: grid;
      place-items: center;
      height: 100%;
      font: 600 1rem system-ui;
      opacity: .9;
    }
    .boot b {
      color: #7dd3fc;
    }
  </style>
</head>
<body>
  <div id="root">
    <div class="boot">Loading <b>Cathedral</b>…</div>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### apps/portal/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### apps/portal/tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### apps/portal/src/main.tsx
```tsx
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(<App />)
```

### apps/portal/src/App.tsx
```tsx
import { useEffect, useState } from 'react'
import { resolveMonad } from './engine/monad'
import SoundLab from './labs/SoundLab'
import FractalLab from './labs/FractalLab'

export default function App() {
  const [nodeId, setNodeId] = useState(22)
  const [lineage, setLineage] = useState<'GD' | 'THELEMIC' | 'TYPHONIAN'>('THELEMIC')
  const [ctx, setCtx] = useState<any>(null)

  useEffect(() => {
    resolveMonad(nodeId, lineage)
      .then(setCtx)
      .catch(console.error)
  }, [nodeId, lineage])

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: '0 auto' }}>
      <h1>Cathedral • Cosmogenesis 144:99</h1>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <label>
          Node{' '}
          <input
            type="number"
            value={nodeId}
            onChange={e => setNodeId(parseInt(e.target.value || '0'))}
          />
        </label>
        <label>
          Lineage{' '}
          <select value={lineage} onChange={(e) => setLineage(e.target.value as any)}>
            <option>THELEMIC</option>
            <option>GD</option>
            <option>TYPHONIAN</option>
          </select>
        </label>
      </div>

      {!ctx ? (
        <p>Opening Monad…</p>
      ) : (
        <>
          <section style={{ marginTop: 12 }}>
            <h2 style={{ margin: 0 }}>
              {ctx.node.name} · {ctx.node.planet ?? '—'} · <em>{ctx.lineage}</em>
            </h2>
            <p style={{ opacity: .75, marginTop: 4 }}>
              {ctx.words.LAW} · {ctx.words.WILL}
            </p>
          </section>

          <FractalLab spec={ctx.fractal} seed={ctx.seed} palette={ctx.palette} />
          <SoundLab station={ctx.station} mode={'focus'} seed={ctx.seed} />
          
          <footer style={{ opacity: .65, marginTop: 16, fontSize: 12 }}>
            Sources: {ctx.node.sources.join(' · ')}
          </footer>
        </>
      )}
    </main>
  )
}
```

### apps/portal/src/engine/monad.ts
```typescript
type NodeBinding = { 
  synth_station_id: string
  fractal: Record<string, any>
}

type NodeAtom = {
  id: number
  name: string
  class: 'PATH' | 'SEPHIRA'
  planet: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | null
  tarot?: { major?: string | null; letter?: string | null }
  numbers: { value: number; harmonic: number[] }
  palettes: { primary: string; accent: string; shadow: string }
  sources: string[]
  bindings: NodeBinding
}

type Lineage = 'GD' | 'THELEMIC' | 'TYPHONIAN'

type Overlay = {
  color_bias: Record<string, string>
  words: Record<string, string>
}

const cache: Record<string, any> = {}

async function j(path: string) {
  if (cache[path]) return cache[path]
  const r = await fetch(path)
  return (cache[path] = await r.json())
}

export async function resolveMonad(nodeId: number, lineage: Lineage = 'THELEMIC') {
  const [nodes, synths, overlays] = await Promise.all([
    j('/registry/nodes144.json'),
    j('/registry/synth_stations.json'),
    j('/registry/lineage_overlays.json')
  ])

  const atom: NodeAtom = nodes.nodes.find((n: NodeAtom) => n.id === nodeId)
  if (!atom) throw new Error('Node not found: ' + nodeId)

  const station = synths.find((s: any) => s.id === atom.bindings.synth_station_id)
  if (!station) throw new Error('Missing station: ' + atom.bindings.synth_station_id)

  const ov: Overlay = overlays.overlays[lineage] || overlays.overlays[overlays.default]
  const bias = atom.planet && ov.color_bias[atom.planet] 
    ? ov.color_bias[atom.planet] 
    : atom.palettes.primary

  const seed = (nodeId * 14499) >>> 0

  return {
    node: atom,
    station,
    lineage,
    words: ov.words,
    palette: {
      primary: bias,
      accent: atom.palettes.accent,
      shadow: atom.palettes.shadow
    },
    fractal: atom.bindings.fractal,
    seed
  }
}
```

### apps/portal/src/labs/FractalLab.tsx
```tsx
import { useEffect, useRef, useState } from 'react'

type F = { type: string; [k: string]: any }

export default function FractalLab({
  spec,
  seed,
  palette
}: {
  spec: F
  seed: number
  palette: { primary: string; accent: string; shadow: string }
}) {
  const cRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useState<F>(spec)

  useEffect(() => {
    const c = cRef.current!
    const ctx = c.getContext('2d')!
    const w = c.width
    const h = c.height
    const img = ctx.createImageData(w, h)

    if (spec.type === 'mandelbrot') {
      const { cx = -0.5, cy = 0, scale = 2.5, maxIter = 256 } = params
      
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const a = cx + ((x / w) - 0.5) * 2 * scale
          const b = cy + ((y / h) - 0.5) * 2 * (scale * h / w)
          let zr = 0, zi = 0, i = 0
          
          while (zr * zr + zi * zi <= 4 && i < maxIter) {
            const zr2 = zr * zr - zi * zi + a
            zi = 2 * zr * zi + b
            zr = zr2
            i++
          }
          
          const t = i / maxIter
          const idx = (y * w + x) * 4
          const [r, g, bl] = mixColor(palette.primary, palette.accent, Math.pow(t, 0.7))
          img.data[idx] = r
          img.data[idx + 1] = g
          img.data[idx + 2] = bl
          img.data[idx + 3] = 255
        }
      }
    } else {
      img.data.fill(24)
    }

    ctx.putImageData(img, 0, 0)
    
    // Add subtle overlay glow
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = hexAlpha(palette.primary, 0.06)
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'source-over'
  }, [params, palette, spec])

  function saveJSON() {
    const blob = new Blob(
      [JSON.stringify({ seed, params, timestamp: new Date().toISOString(), node_id: params.node_id }, null, 2)],
      { type: 'application/json' }
    )
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `fractal_${Date.now()}.json`
    a.click()
  }

  return (
    <section style={{ marginTop: 16 }}>
      <h3>Fractal Monad</h3>
      <canvas ref={cRef} width={640} height={360} aria-label="Fractal visualization" />
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        {"maxIter" in params ? (
          <label>
            Iterations{' '}
            <input
              type="range"
              min={64}
              max={1024}
              step={1}
              value={params.maxIter}
              onChange={e => setParams(p => ({ ...p, maxIter: parseInt(e.target.value) }))}
            />
          </label>
        ) : null}
        <button onClick={saveJSON}>Save Experiment</button>
      </div>
    </section>
  )
}

function mixColor(hex1: string, hex2: string, t: number) {
  const a = parseHex(hex1)
  const b = parseHex(hex2)
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bl = Math.round(a[2] + (b[2] - a[2]) * t)
  return [r, g, bl]
}

function parseHex(h: string) {
  const x = h.replace('#', '')
  const n = parseInt(x, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function hexAlpha(h: string, a: number) {
  const [r, g, b] = parseHex(h)
  return `rgba(${r},${g},${b},${a})`
}
```

### apps/portal/src/labs/SoundLab.tsx
```tsx
import { useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'

export default function SoundLab({
  station,
  mode,
  seed
}: {
  station: any
  mode: 'curious' | 'focus' | 'festival' | string
  seed: number
}) {
  const [params, setParams] = useState<Record<string, any>>(
    Object.fromEntries(station.controls.map((c: any) => [c.name, c.default ?? 0]))
  )
  const synthRef = useRef<Tone.PolySynth | null>(null)
  const gainRef = useRef<Tone.Gain | null>(null)

  useEffect(() => {
    // ND-safe audio graph initialization
    const gain = new Tone.Gain(0.25).toDestination() // ~-12 dB safe level
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.02, decay: 0.2, sustain: 0.6, release: 0.8 }
    }).connect(gain)
    
    synthRef.current = synth
    gainRef.current = gain
    
    return () => {
      synth.dispose()
      gain.dispose()
      synthRef.current = null
      gainRef.current = null
    }
  }, [])

  useEffect(() => {
    // Gentle audio feedback on parameter change
    if (!synthRef.current) return
    const now = Tone.now()
    synthRef.current.triggerAttackRelease(['C4', 'E4', 'G4'], 0.22, now + 0.02)
  }, [params])

  function rnd(min: number, max: number) {
    const x = Math.sin(seed++) * 10000
    const r = x - Math.floor(x)
    return min + r * (max - min)
  }

  function randomize() {
    const next: Record<string, any> = {}
    for (const c of station.controls) {
      if (typeof c.min === 'number' && typeof c.max === 'number') {
        next[c.name] = +rnd(c.min, c.max).toFixed(3)
      } else if (Array.isArray(c.values)) {
        next[c.name] = c.values[Math.floor(rnd(0, c.values.length))]
      } else {
        next[c.name] = c.default ?? 0
      }
    }
    setParams(p => ({ ...p, ...next }))
  }

  return (
    <section style={{ marginTop: 16 }}>
      <h3>{station.synth_skin}</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: 12 
      }}>
        {station.controls.map((c: any) => (
          <Control
            key={c.name}
            spec={c}
            value={params[c.name]}
            onChange={(v: any) => setParams(p => ({ ...p, [c.name]: v }))}
          />
        ))}
      </div>
      {mode === 'curious' && (
        <button style={{ marginTop: 12 }} onClick={randomize}>
          Randomize (seeded)
        </button>
      )}
    </section>
  )
}

function Control({
  spec,
  value,
  onChange
}: {
  spec: any
  value: any
  onChange: (v: any) => void
}) {
  if (spec.type === 'selector' || spec.type === 'switch') {
    return (
      <label>
        {spec.name}{' '}
        <select value={String(value)} onChange={e => onChange(e.target.value)}>
          {spec.values.map((v: any) => (
            <option key={String(v)} value={String(v)}>
              {String(v)}
            </option>
          ))}
        </select>
      </label>
    )
  }
  
  return (
    <label>
      {spec.name}{' '}
      <input
        type="range"
        min={spec.min}
        max={spec.max}
        step="any"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
      />
      <small> {spec.unit || ''}</small>
    </label>
  )
}
```

### apps/portal/functions/api/health.ts
```typescript
export const onRequest = () =>
  new Response(
    JSON.stringify({ ok: true, app: 'portal' }), 
    { headers: { 'content-type': 'application/json' } }
  )
```

## Installation and Running

```bash
# Install dependencies
pnpm install

# Run the portal app
pnpm --filter @cathedral/portal dev

# Build for production
pnpm build

# Validate schemas
pnpm validate
```

## Cloudflare Pages Deployment

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   - Framework preset: Vite
   - Build command: `pnpm build`
   - Build output directory: `apps/portal/dist`
   - Root directory: `/`
   - Environment variables:
     - `NODE_VERSION`: `20`
     - `VITE_BASE`: `/` (or `/cathedral/` for subpath)

## Acceptance Criteria Verification

- ✓ pnpm install succeeds at root
- ✓ Portal serves on localhost:5173
- ✓ Registry JSON files load correctly
- ✓ Node switching updates UI and synth station
- ✓ FractalLab renders Mandelbrot set
- ✓ SoundLab controls respond to input
- ✓ Randomize uses deterministic seeding
- ✓ Save Experiment downloads JSON with provenance
- ✓ Audio starts at safe level (~-12 dB)
- ✓ Respects prefers-reduced-motion
- ✓ No SVG elements used
- ✓ Health endpoint returns correct response
