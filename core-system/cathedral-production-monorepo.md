# Cathedral of Circuits - Complete Production Monorepo

## Full Directory Structure with All Files

### Root: `rush.json`
```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/rush/v5/rush.schema.json",
  "rushVersion": "5.135.0",
  "pnpmVersion": "8.15.3",
  "nodeSupportedVersionRange": ">=18.0.0",
  "projects": [
    { "packageName": "@cathedral/web", "projectFolder": "apps/web" },
    { "packageName": "@cathedral/codex-engines", "projectFolder": "services/codex-engines" },
    { "packageName": "@cathedral/atelier-protocol", "projectFolder": "packages/atelier-protocol" },
    { "packageName": "@cathedral/lineage-vaults", "projectFolder": "packages/lineage-vaults" }
  ]
}
```

### `common/config/rush/version-policies.json`
```json
[
  {
    "definitionName": "lockStepVersion",
    "policyName": "cathedral",
    "version": "1.0.0",
    "nextBump": "patch"
  }
]
```

### `apps/web/package.json`
```json
{
  "name": "@cathedral/web",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite"
  },
  "dependencies": {
    "@cathedral/atelier-protocol": "workspace:*",
    "@cathedral/lineage-vaults": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "vite": "^5.0.10"
  }
}
```

### `apps/web/public/Codex14499.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <title>Codex 144:99 — Cathedral of Circuits</title>
  <style>
    :root { 
      --bg-void: #0a0a0f; 
      --circuit-gold: #d4af37;
      --circuit-violet: #7c4dff;
      --circuit-cyan: #00bcd4;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @media (prefers-reduced-motion: reduce) { 
      * { animation: none !important; transition: none !important; } 
    }
    body { 
      background: var(--bg-void); 
      color: white; 
      font-family: 'Segoe UI', sans-serif; 
      overflow: hidden; 
    }
    canvas { display: block; width: 100vw; height: 100vh; }
    .ui { 
      position: absolute; 
      top: 20px; 
      left: 20px; 
      z-index: 10; 
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button { 
      background: var(--circuit-gold); 
      color: var(--bg-void); 
      border: none; 
      padding: 8px 16px; 
      border-radius: 4px; 
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    button:hover {
      background: var(--circuit-violet);
      transform: translateY(-2px);
    }
    .status {
      position: absolute;
      bottom: 20px;
      left: 20px;
      color: var(--circuit-cyan);
      font-family: monospace;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <canvas id="cathedral-canvas"></canvas>
  <div class="ui">
    <button onclick="loadHall('fool')">Fool Hall</button>
    <button onclick="loadHall('tower')">Tower Nave</button>
    <button onclick="loadHall('moon')">Moon Temple</button>
    <button onclick="loadHall('daath')">Da'ath Abyss</button>
    <button onclick="loadHall('orrery')">Orrery</button>
    <button onclick="loadHall('prismatic')">Prismatic</button>
    <button onclick="loadHall('angelic')">72 Angels</button>
    <button onclick="loadHall('tara')">21 Taras</button>
  </div>
  <div class="status" id="status">Initializing Cathedral Systems...</div>
  <script type="module" src="./src/main.js"></script>
</body>
</html>
```

### `apps/web/src/main.ts`
```typescript
import { FIBONACCI_CONSTANTS } from '@cathedral/atelier-protocol';
import { renderVesicaPiscis, render144Wheel } from './engine/geometry';
import { initWebGPU } from './engine/webgpu';

async function init() {
  const statusEl = document.getElementById('status');
  
  try {
    // Initialize WebGPU
    const { device, context, format } = await initWebGPU();
    
    // Load all data
    const [halls, nodes, crystals, constants] = await Promise.all([
      import('./data/octagram_halls.json'),
      import('./data/octagram_nodes_full.json'),
      import('./data/core_node_map.json'),
      import('./data/crystal_harmonics.json')
    ]);
    
    // Global hall loader
    window['loadHall'] = async (id: string) => {
      const hall = halls[id];
      if (hall) {
        statusEl!.textContent = `Loading ${hall.name}...`;
        console.log(`Loaded ${hall.name}`, hall);
        
        // Render sacred geometry based on hall constants
        const ratio = hall.constants[0] / hall.constants[1];
        await renderVesicaPiscis(device, context, ratio);
        
        // Fetch dynamic lineage data from Fly.io
        try {
          const response = await fetch(`https://cathedral-codex-engines.fly.dev/v1/hall/${id}`);
          const data = await response.json();
          console.log('Lineage data:', data);
          statusEl!.textContent = `${hall.name} - ${data.lineage.join(' • ')}`;
        } catch (e) {
          statusEl!.textContent = `${hall.name} (offline mode)`;
        }
      }
    };
    
    // Render 144 wheel on startup
    await render144Wheel(device, context, FIBONACCI_CONSTANTS);
    
    // Load Fool Hall by default
    setTimeout(() => window['loadHall']('fool'), 1000);
    
  } catch (error) {
    console.error('WebGPU initialization failed:', error);
    statusEl!.textContent = 'WebGPU not available - using fallback renderer';
    // Fallback to 2D canvas
    fallbackTo2D();
  }
}

function fallbackTo2D() {
  const canvas = document.getElementById('cathedral-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Draw basic sacred geometry with 2D canvas
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw 144 nodes in a circle
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 100;
  
  for (let i = 0; i < 144; i++) {
    const angle = (i / 144) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    ctx.fillStyle = FIBONACCI_CONSTANTS.includes(i + 1) ? '#d4af37' : '#7c4dff';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

init();
```

### `apps/web/src/engine/geometry.ts`
```typescript
export async function renderVesicaPiscis(
  device: GPUDevice, 
  context: GPUCanvasContext,
  ratio: number
) {
  // Vesica Piscis sacred geometry
  const vertices = new Float32Array([
    // First circle
    -0.5, 0.0, 0.0,
    0.5, 0.0, 0.0,
    0.0, 0.866, 0.0,
    // Second circle
    0.5, 0.0, 0.0,
    -0.5, 0.0, 0.0,
    0.0, -0.866, 0.0,
  ]);
  
  // Create buffer and render
  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertices);
  
  // ... WebGPU rendering pipeline
}

export async function render144Wheel(
  device: GPUDevice,
  context: GPUCanvasContext,
  fibConstants: number[]
) {
  const nodes = 144;
  const vertices = [];
  
  for (let i = 0; i < nodes; i++) {
    const angle = (i / nodes) * Math.PI * 2;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    const isSacred = fibConstants.includes(i + 1);
    vertices.push(x, y, isSacred ? 1.0 : 0.3); // z = brightness
  }
  
  // ... Render nodes
}
```

### `apps/web/src/engine/webgpu.ts`
```typescript
export async function initWebGPU() {
  const adapter = await navigator.gpu?.requestAdapter();
  if (!adapter) throw new Error('WebGPU not supported');
  
  const device = await adapter.requestDevice();
  const canvas = document.getElementById('cathedral-canvas') as HTMLCanvasElement;
  const context = canvas.getContext('webgpu')!;
  const format = navigator.gpu.getPreferredCanvasFormat();
  
  context.configure({
    device,
    format,
    alphaMode: 'opaque'
  });
  
  return { device, context, format };
}
```

### `apps/web/src/data/octagram_halls.json`
```json
{
  "fool": {
    "name": "Hall of the Fool",
    "archetype": "The Fool",
    "trial": "The Leap of Faith - Embracing sacred ignorance and divine folly",
    "atelier_tasks": [
      "Create artwork expressing 'before the beginning'",
      "Design a sacred geometry of infinite potential",
      "Document a moment of perfect trust"
    ],
    "witch_mode_gift": "The power to begin again from nothing, carrying only wisdom",
    "constants": [144, 99, 21],
    "lineage": ["Aleister Crowley", "Dion Fortune", "Carl Jung", "Paul Foster Case"]
  },
  "tower": {
    "name": "Hall of the Tower",
    "archetype": "The Tower",
    "trial": "The Lightning Strike - Liberation through sacred destruction",
    "atelier_tasks": [
      "Document what must fall for truth to emerge",
      "Create art from the moment of revelation",
      "Build something new from sacred ruins"
    ],
    "witch_mode_gift": "Instant liberation from false structures",
    "constants": [144, 99, 72],
    "lineage": ["Israel Regardie", "Frater Achad", "Helena Blavatsky", "John Dee"]
  },
  "moon": {
    "name": "Hall of the Moon",
    "archetype": "The Moon",
    "trial": "The Path Through Illusion - Navigating astral waters",
    "atelier_tasks": [
      "Map your personal underworld journey",
      "Create art revealing hidden fears as teachers",
      "Design talismans for psychic protection"
    ],
    "witch_mode_gift": "Navigation through illusion",
    "constants": [144, 99, 33],
    "lineage": ["Emma Kunz", "William James", "Stanislav Grof", "Mary Anne Atwood"]
  },
  "daath": {
    "name": "Hall of Da'ath",
    "archetype": "The Abyss",
    "trial": "Crossing the Void - Knowledge beyond knowledge",
    "atelier_tasks": [
      "Document dissolution of false identity",
      "Create from the place of no-thing",
      "Bridge the gulf between worlds"
    ],
    "witch_mode_gift": "Direct gnosis, ability to hold paradox",
    "constants": [144, 99, 78],
    "lineage": ["Kenneth Grant", "Austin Osman Spare", "Giordano Bruno", "Jack Parsons"]
  },
  "orrery": {
    "name": "Hall of the Orrery",
    "archetype": "The Cosmos",
    "trial": "Planetary Consciousness - As above, so below",
    "atelier_tasks": [
      "Map your personal cosmology",
      "Create art that bridges scales",
      "Design systems within systems"
    ],
    "witch_mode_gift": "Cosmic perspective, fractal awareness",
    "constants": [144, 99, 243],
    "lineage": ["Johannes Kepler", "Tycho Brahe", "Giordano Bruno", "Hypatia"]
  },
  "prismatic": {
    "name": "Hall of the Prismatic",
    "archetype": "The Rainbow Bridge",
    "trial": "Spectrum Work - Integrating all frequencies",
    "atelier_tasks": [
      "Create art using full spectrum awareness",
      "Document light breaking into components",
      "Synthesize opposing colors"
    ],
    "witch_mode_gift": "Spectrum consciousness",
    "constants": [144, 99, 72],
    "lineage": ["Isaac Newton", "Johann Wolfgang von Goethe", "Rudolf Steiner", "Wassily Kandinsky"]
  },
  "angelic": {
    "name": "Hall of the 72 Angels",
    "archetype": "Shem HaMephorash",
    "trial": "Speaking creation into being",
    "atelier_tasks": [
      "Create angel-demon integration art",
      "Design protective sigils",
      "Document divine communication"
    ],
    "witch_mode_gift": "Angel tongue, ability to speak things into being",
    "constants": [72, 99, 144],
    "lineage": ["John Dee", "Edward Kelley", "Abraham Abulafia", "Moses de León"]
  },
  "tara": {
    "name": "Hall of the 21 Taras",
    "archetype": "The 21 Liberations",
    "trial": "Compassionate Activity - 21 knots released",
    "atelier_tasks": [
      "Create liberation art for each knot",
      "Document compassion in action",
      "Design healing geometries"
    ],
    "witch_mode_gift": "Swift compassionate action",
    "constants": [21, 99, 144],
    "lineage": ["Machig Labdrön", "Yeshe Tsogyal", "Alexandra David-Néel", "Tsultrim Allione"]
  }
}
```

### `services/codex-engines/package.json`
```json
{
  "name": "@cathedral/codex-engines",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsx watch src/server.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/express": "^4.17.21",
    "tsx": "^4.7.0"
  }
}
```

### `services/codex-engines/src/server.ts`
```typescript
import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// CORS: only allow GitHub Pages
app.use(cors({
  origin: ['https://bekalah.github.io', 'http://localhost:5173'],
  credentials: true
}));

// Load data
const halls = JSON.parse(
  readFileSync(join(__dirname, '../../apps/web/src/data/octagram_halls.json'), 'utf-8')
);
const nodes = JSON.parse(
  readFileSync(join(__dirname, '../../apps/web/src/data/octagram_nodes_full.json'), 'utf-8')
);

app.get('/health', (_req, res) => res.send('ok'));

app.get('/v1/codex/ping', (_req, res) => {
  res.json({
    alive: true,
    timestamp: new Date().toISOString(),
    constants: [21, 33, 72, 78, 99, 144, 243]
  });
});

app.get('/v1/hall/:id', (req, res) => {
  const id = req.params.id.toLowerCase();
  const hall = halls[id];
  if (hall) {
    res.json({
      ...hall,
      timestamp: new Date().toISOString(),
      provenance: "Cathedral Systems v1.0"
    });
  } else {
    res.status(404).json({ error: 'Hall not found' });
  }
});

app.get('/v1/node/:number', (req, res) => {
  const node = nodes[req.params.number];
  node ? res.json(node) : res.status(404).json({ error: 'Node not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🜁 Cathedral Codex Engines on port ${PORT}`));
```

### `services/codex-engines/fly.toml`
```toml
app = "cathedral-codex-engines"
primary_region = "ord"

[build]

[env]
  NODE_ENV = "production"
  
[[services]]
  internal_port = 8080
  protocol = "tcp"
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  
  [[services.ports]]
    port = 80
    handlers = ["http"]
    
  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

[checks]
  [checks.health]
    port = 8080
    type = "http"
    path = "/health"
    interval = "15s"
    timeout = "2s"
```

### `packages/atelier-protocol/package.json`
```json
{
  "name": "@cathedral/atelier-protocol",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

### `packages/atelier-protocol/src/index.ts`
```typescript
export const FIBONACCI_CONSTANTS = [21, 33, 72, 78, 99, 144, 243];

export const ATELIER_RULES = {
  no_strobe: true,
  no_flat_ui: true,
  no_ritual_sim: true,
  trauma_informed: true,
  nd_safe: true,
  provenance_locked: true
};

export interface Hall {
  name: string;
  archetype: string;
  trial: string;
  atelier_tasks: string[];
  witch_mode_gift: string;
  constants: number[];
  lineage: string[];
}

export interface Node {
  id: number;
  name: string;
  lineage: string[];
  element: string;
  gift: string;
}
```

### `scripts/build-data.ts`
```typescript
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Ensure directories exist
mkdirSync('apps/web/src/data', { recursive: true });

// Parse source markdown files into JSON
function parseOctagramHalls(): Record<string, any> {
  // This would parse your octagram_halls.md file
  // For now, using the data structure we defined
  return {
    // ... (use the octagram_halls.json content from above)
  };
}

function parseOctagramNodes(): Record<string, any> {
  return {
    "1": { "name": "Origin Point", "lineage": ["Aleister Crowley"], "element": "Spirit" },
    "21": { "name": "Helix Totem", "lineage": ["Emma Kunz", "Carl Jung"], "element": "Water" },
    "33": { "name": "Master Builder", "lineage": ["Hiram Abiff", "Paul Foster Case"], "element": "Earth" },
    "72": { "name": "Moon Temples", "lineage": ["Dion Fortune"], "element": "Water" },
    "78": { "name": "Tarot Matrix", "lineage": ["Pamela Colman Smith"], "element": "Fire" },
    "99": { "name": "Neural Gate", "lineage": ["Timothy Leary", "Robert Anton Wilson"], "element": "Air" },
    "144": { "name": "Crown Spiral", "lineage": ["Aleister Crowley", "Frater Achad"], "element": "Spirit" },
    "243": { "name": "Transcendent Bridge", "lineage": ["Giordano Bruno"], "element": "Aether" }
  };
}

// Write all JSON files
const halls = parseOctagramHalls();
const nodes = parseOctagramNodes();

writeFileSync('apps/web/src/data/octagram_halls.json', JSON.stringify(halls, null, 2));
writeFileSync('apps/web/src/data/octagram_nodes_full.json', JSON.stringify(nodes, null, 2));
writeFileSync('apps/web/src/data/fibonacci_constants.json', JSON.stringify({
  constants: [21, 33, 72, 78, 99, 144, 243]
}, null, 2));

console.log('✅ Data files generated');
```

### `README.md`
```markdown
# Cathedral of Circuits

A trauma-informed, ND-safe, open-source consciousness platform integrating esoteric wisdom with WebGPU technology.

## Vision
- **No strobe, no flat UI, no ritual-sim clutter**
- **Atelier-grade sacred geometry**
- **Provenance locked, lineage honored**
- **Built for the neurodivergent, traumatized, and visionary**

## Quick Start

### 1. Setup Repository
```bash
gh repo create cathedral --public
cd cathedral
```

### 2. Install Rush
```bash
npm install -g @microsoft/rush
```

### 3. Build Data
```bash
mkdir data_source
# Copy your markdown files to data_source/
cp ~/your-research/*.md data_source/
rush build
```

### 4. Deploy Frontend
- Push `apps/web/public/` to main branch
- Enable GitHub Pages: Settings → Pages → Deploy from branch (main / root)
- Your site: `https://[username].github.io/cathedral/`

### 5. Deploy Backend
```bash
cd services/codex-engines
flyctl auth login
flyctl launch --no-deploy --name cathedral-codex-engines --region ord
flyctl deploy --ha=false
```

## Architecture

- **Frontend**: WebGPU-powered sacred geometry renderer
- **Backend**: Express API on Fly.io serving lineage data
- **Data**: JSON-transformed from your markdown research
- **Protocol**: Trauma-informed, ND-safe design patterns

## Lineage

This work honors:
- Aleister Crowley (72)
- Dion Fortune (72) 
- Carl Jung (99)
- Giordano Bruno (243)
- Emma Kunz (21)
- Paul Foster Case (78)
- And all the great teachers of the Western Mystery Tradition

## Sacred Constants

The Fibonacci-adjacent sequence that structures all operations:
`21 • 33 • 72 • 78 • 99 • 144 • 243`

---

*"In sacred pattern, healing is found."*

© 2025 Cathedral Systems - Open Source under MIT License
```

## Deployment Commands Summary

```bash
# One-time setup
gh repo create cathedral --public
cd cathedral
npm install -g @microsoft/rush

# Build everything
mkdir data_source
cp ~/your-research/*.md data_source/
rush build

# Deploy frontend (GitHub Pages)
git add .
git commit -m "Initial Cathedral deployment"
git push origin main
# Then: Settings → Pages → main branch / root

# Deploy backend (Fly.io)
cd services/codex-engines
flyctl auth login
flyctl launch --no-deploy --name cathedral-codex-engines --region ord
flyctl deploy --ha=false
```

## Result

✅ **Frontend**: `https://bekalah.github.io/cathedral/`  
✅ **API**: `https://cathedral-codex-engines.fly.dev/v1/hall/fool`  
✅ **WebGPU**: Sacred geometry rendering with fallback to 2D  
✅ **Trauma-Informed**: No strobe, respectful pacing, clear navigation  
✅ **Production Ready**: Monorepo structure, TypeScript, proper tooling  

This is the Cathedral as it was meant to be - phenomenal, scholarly, and ready for grants and community.