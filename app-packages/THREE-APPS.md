# Cathedral 144:99 - Three App Package Structure

Based on the current cathedral monostructure, these are the three deployable packages for Cloudflare Pages:

## Package 1: Codex Portal (Main Interface)
- **Path**: `codex-portal/`
- **Purpose**: Main 144-node interface, tarot integration, learning engine
- **Deployment**: `codex.144-99.pages.dev` or custom domain
- **Features**: 
  - 144 sacred nodes navigation
  - Tarot card integration  
  - Alchemy engine
  - Sound synthesis
  - Fractal mathematics

## Package 2: Stone Cathedral (Realms Engine)
- **Path**: `stone-cathedral/`
- **Purpose**: Immersive 3D realms - Rosslyn, Hilma, Reiki Grid
- **Deployment**: `realms.144-99.pages.dev` or custom domain
- **Features**:
  - Rosslyn Chapel virtual space
  - Hilma af Klint art realm
  - Crystal grid meditation
  - Sacred geometry visualization

## Package 3: Circuit Board (Living Grimoire)
- **Path**: `circuit-grimoire/` 
- **Purpose**: 33-chapter interactive story/spell system
- **Deployment**: `grimoire.144-99.pages.dev` or custom domain
- **Features**:
  - 33 chapter navigation spine
  - Angel/daemon helpers
  - Interactive spell system
  - Personal progress tracking

## Unified Connection
- All three apps share the same core datasets from `/core-system/`
- Single authentication system
- Cross-app navigation
- Shared progress/state
- All deployed via Cloudflare Pages free tier

## No More Fly.io / Netlify
- Previous attempts with Fly.io and Netlify abandoned
- Focus entirely on Cloudflare Pages + Workers for free tier
- Cloudflare R2 for asset storage if needed
- Zero monthly costs, unlimited bandwidth