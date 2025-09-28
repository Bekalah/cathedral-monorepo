# Cathedral Monorepo Merge Strategy

## Current Repository Status
✅ `cosmogenesis-learning-engine` - exists
✅ `circuitum99` - exists  
✅ `stone-cathedral` - exists
✅ `liber-arcanae` - exists

## Monorepo Target Structure

```
cathedral-monorepo/
├── packages/
│   ├── cosmogenesis-learning-engine/    # Move existing repo here
│   ├── circuitum99/                     # Move existing repo here
│   ├── stone-cathedral/                 # Move existing repo here
│   └── liber-arcanae/                   # Move existing repo here
├── shared/
│   ├── core-system/                     # Unified datasets
│   │   ├── codex_144_nodes_template.json
│   │   ├── angels72.json
│   │   ├── alchemy.json
│   │   └── CATHEDRAL_SCROLL_FULL.md
│   ├── engines/                         # Shared JS engines
│   │   ├── cathedral-engine.js
│   │   ├── alchemy-engine.js
│   │   ├── ambient-engine.js
│   │   └── style-engine.js
│   └── styles/                          # Shared CSS
│       ├── stylepacks.json
│       └── palette.css
├── apps/                                # Deployment builds
│   ├── codex-portal/                    # Main interface
│   ├── stone-realms/                    # 3D environments
│   └── circuit-grimoire/                # Story system
├── tools/
│   ├── build-scripts/
│   └── deployment/
├── docs/
│   ├── README.md
│   └── deployment-guide.md
├── package.json                         # Monorepo root
├── pnpm-workspace.yaml                  # Workspace config
├── _redirects                           # Cloudflare routing
└── cloudflare.toml                      # Deployment config
```

## Git Merge Commands

### Step 1: Create Monorepo
```bash
# Create new monorepo structure
mkdir cathedral-monorepo
cd cathedral-monorepo
git init

# Create directory structure
mkdir -p packages shared/{core-system,engines,styles} apps tools docs
```

### Step 2: Merge Existing Repos
```bash
# Add existing repos as git subtrees
git subtree add --prefix=packages/cosmogenesis-learning-engine \
  https://github.com/yourusername/cosmogenesis-learning-engine.git main

git subtree add --prefix=packages/circuitum99 \
  https://github.com/yourusername/circuitum99.git main

git subtree add --prefix=packages/stone-cathedral \
  https://github.com/yourusername/stone-cathedral.git main

git subtree add --prefix=packages/liber-arcanae \
  https://github.com/yourusername/liber-arcanae.git main
```

### Step 3: Extract Shared Code
```bash
# Move common files to shared directory
mv packages/*/engines/*.js shared/engines/
mv packages/*/data/*.json shared/core-system/
mv packages/*/styles/*.css shared/styles/
```

## Cloudflare Pages Deployment

### Single Domain Strategy:
- **Main**: `cathedral.pages.dev` 
- **Routes**:
  - `/` → Landing page
  - `/mind` → cosmogenesis-learning-engine
  - `/soul` → circuitum99  
  - `/body` → stone-cathedral
  - `/companions` → liber-arcanae

### Build Configuration:
```json
{
  "build": {
    "command": "pnpm build:all",
    "output": "dist",
    "environment": {
      "NODE_VERSION": "20",
      "PNPM_VERSION": "8"
    }
  }
}
```

## Package.json Root Config
```json
{
  "name": "cathedral-monorepo",
  "private": true,
  "scripts": {
    "build:all": "pnpm -r build",
    "dev": "pnpm -r dev",
    "deploy": "pnpm build:all && wrangler pages publish dist"
  },
  "devDependencies": {
    "pnpm": "^8.0.0",
    "wrangler": "^3.0.0"
  }
}
```

## Workspace Config (pnpm-workspace.yaml)
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'shared/*'
```

## Benefits of This Structure:
1. **Preserve git history** from all repos
2. **Shared dependencies** in one place
3. **Single deployment** pipeline
4. **Cross-package imports** possible
5. **Unified versioning** and releases
6. **Free Cloudflare hosting** for everything

## Next Steps:
1. Review this merge strategy
2. Backup existing repos
3. Execute the merge commands
4. Test the unified build
5. Deploy to Cloudflare Pages