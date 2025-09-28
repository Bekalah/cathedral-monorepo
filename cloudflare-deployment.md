# Cathedral of Circuits - Cloudflare Pages Deployment Guide

## Free Hosting Strategy with Cloudflare Pages

### Why Cloudflare Pages?
- **100% Free** for static sites
- **Unlimited bandwidth** 
- **Global CDN** with 200+ locations
- **Custom domains** included
- **GitHub integration** for automatic deployments
- **Edge functions** for dynamic features

### Deployment Structure

```
cathedral-of-circuits/
├── cosmogenesis-learning-engine/     # App Package 1: Mind (Learning System)
├── circuitum99/                      # App Package 2: Soul (Story System)  
├── stone-cathedral/                  # App Package 3: Body (Realms System)
├── shared/                          # Shared assets and core system
│   ├── core-system/                 # Codex 144:99 data
│   ├── engines/                     # JavaScript engines
│   └── styles/                      # Shared stylesheets
└── _redirects                       # Cloudflare routing config
```

### Single Domain, Multiple Apps Setup

**Primary Domain**: `cathedral-of-circuits.pages.dev`
- `/` → Landing page with app selection
- `/mind` → Cosmogenesis Learning Engine
- `/soul` → Circuitum99 Story System  
- `/body` → Stone Cathedral Realms
- `/api/*` → Edge functions for dynamic features

### Cloudflare Pages Configuration

#### _redirects file:
```
/mind/*  /cosmogenesis-learning-engine/:splat  200
/soul/*  /circuitum99/:splat  200
/body/*  /stone-cathedral/:splat  200
/api/*   /functions/:splat  200
```

#### wrangler.toml (for edge functions):
```toml
name = "cathedral-of-circuits"
main = "./functions/_middleware.js"
compatibility_date = "2023-09-01"

[env.production]
route = { pattern = "cathedral-of-circuits.pages.dev", zone_name = "pages.dev" }
```

### Advantages of This Setup:
1. **Single URL** for all 3 apps
2. **Free forever** with Cloudflare
3. **Auto-deploy** from GitHub
4. **Global performance** via CDN
5. **Custom domain** support
6. **SSL certificates** automatic
7. **Analytics** included

### Next Steps:
1. Organize files into the 3 app packages
2. Create shared core system
3. Setup GitHub repository
4. Connect to Cloudflare Pages
5. Configure routing and domains

### Repository Structure for GitHub:
```
cathedral-monorepo/
├── packages/
│   ├── cosmogenesis-learning-engine/
│   ├── circuitum99/
│   └── stone-cathedral/
├── shared/
├── functions/           # Cloudflare edge functions
├── _redirects
├── package.json         # Monorepo config
└── cloudflare.yml       # Deployment config
```