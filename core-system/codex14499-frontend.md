<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Codex 144:99 — Cathedral of Indra's Net</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Codex 144:99 — a living digital grimoire: numerology 0–144, Tarot, angels/demons/Taras, lineage research, monorepo circuit board, and crystal harmonics." />
  <!-- REQUIRED: PicoCSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css" />
  <style>
    :root{
      --noir:#0c0f14; --gold:#d4af37; --muted:#9aa3b2; --veil:#11131a; --ring:#c0c0c0;
      --ok:#8ef5a9; --bad:#ff9aa2; --radius:14px;
    }
    body{ background: radial-gradient(1100px 700px at 50% -10%, rgba(212,175,55,.08), transparent 55%), linear-gradient(180deg, #0d1016, #0a0c12); color:#e9ecf1; }
    /* Panels */
    .panel{ border:1px solid rgba(255,255,255,.09); border-radius:var(--radius); padding:1.25rem; background:linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.00)); }
    .muted{ color:var(--muted) }
    /* Codex wheel */
    .codex-wrap{ position:relative; aspect-ratio:1/1; max-width:820px; margin:auto }
    #codexCanvas{ width:100%; height:auto; display:block; border-radius:50%; border:1px solid rgba(255,255,255,.08);
      box-shadow: 0 0 0 1px rgba(212,175,55,.12), 0 30px 120px rgba(212,175,55,.08);
      background: radial-gradient(55% 55% at 50% 50%, #101217 0%, #0a0c11 45%, #07090d 100%); }
    .legend{ display:flex; gap:.6rem; flex-wrap:wrap; justify-content:center; margin-top:1rem; }
    .badge{ padding:.25rem .6rem; border:1px solid rgba(255,255,255,.12); border-radius:999px; font-size:.85rem; }
    .badge.gold{ border-color:var(--gold); color:var(--gold) }
    /* KV grid */
    .kv{ display:grid; grid-template-columns: 160px 1fr; gap:.25rem .75rem; margin:.25rem 0 }
    .kv b{ color:#f4f6fb }
    .btn{ border:1px solid var(--gold); color:var(--gold); background:transparent }
    .btn:is(:hover,:focus){ background:var(--gold); color:#101010 }
    .ok{ color:var(--ok) } .bad{ color:var(--bad) }
    figure{ border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,.08); }
    figure img{ width:100%; height:auto; display:block }
    code{ color:#fff; background:#121520; padding:.08rem .35rem; border-radius:6px }
  </style>
</head>

<body>
  <!-- REQUIRED NAV STRUCTURE -->
  <nav class="container-fluid">
    <ul><li><strong>Codex 144:99</strong></li></ul>
    <ul>
      <li><a href="#seal">Seal</a></li>
      <li><a href="#monorepo">Circuit Board</a></li>
      <li><a href="#harmonics" role="button">Crystal Harmonics</a></li>
    </ul>
  </nav>

  <!-- REQUIRED MAIN STRUCTURE -->
  <main class="container">
    <div class="grid">
      <section id="seal" class="panel">
        <hgroup>
          <h2>Codex Abyssiae — Interface</h2>
          <h3 class="muted">Apple-clean controls, atelier geometry, real correspondences only</h3>
        </hgroup>
        <p class="muted">Click any point on the wheel (0–144). This page shows **only** what exists in your JSON/MD. Missing fields display "—".</p>

        <div class="codex-wrap" aria-label="Codex 0–144 phyllotaxis wheel">
          <canvas id="codexCanvas" width="1024" height="1024"></canvas>
        </div>
        <div class="legend">
          <span class="badge gold">Fibonacci emphasis</span>
          <span class="badge">Numerology 0–144</span>
          <span class="badge">Tarot / Angels / Demons / Taras (when provided)</span>
        </div>

        <h3 style="margin-top:1rem">Mode</h3>
        <p>
          <button class="btn" data-mode="art">Art</button>
          <button class="btn" data-mode="story">Story</button>
          <button class="btn" data-mode="rpg">RPG</button>
          <button class="btn" data-mode="research">Research</button>
          <span class="muted" id="modeStatus" style="margin-left:.5rem">Current: Research</span>
        </p>

        <h3>Details</h3>
        <div id="infoPane" class="panel" style="background:rgba(255,255,255,.02)">
          <p class="muted">Select a number to load correspondences from <code>/data/octagram_nodes_full.json</code>.</p>
        </div>

        <h3>Live Data Sources</h3>
        <div class="kv"><b>octagram_nodes_full.json</b><span id="ds-octagram">Checking…</span></div>
        <div class="kv"><b>core_node_map.json</b><span id="ds-coremap">Checking…</span></div>
        <div class="kv"><b>circuit_board_map.json</b><span id="ds-circuit">Checking…</span></div>
        <div class="kv"><b>crystal_harmonics.json</b><span id="ds-crystal">Checking…</span></div>

        <figure style="margin-top:1rem">
          <img src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop" alt="Starfield Manuscript Texture (Unsplash)" />
          <figcaption><a href="https://unsplash.com/photos/blue-and-black-galaxy-artwork-m3hn2Kn5Bns" target="_blank">Unsplash texture: calm, manuscript-like</a></figcaption>
        </figure>

        <h3>Atelier Protocol</h3>
        <p class="muted">Octagram / Tesseract / Hexagram / Antahkarana guides render only if the dataset requests them. No fabrication.</p>

        <h3>Lineage Vaults</h3>
        <p class="muted">When <code>core_node_map.json</code> is present, selecting a lineage opens quotes/citations (Fortune, Agrippa, Dee, RAW, Leary, Hilma, Kunz, …).</p>
      </section>
    </div>

    <!-- Circuit Board (Monorepo map) -->
    <div class="grid" id="monorepo" style="margin-top:1.5rem">
      <section class="panel">
        <hgroup>
          <h2>Monorepo Circuit Board</h2>
          <h3 class="muted">Live map of modules → endpoints (Fly.io) → pages (this UI)</h3>
        </hgroup>
        <p class="muted">Data comes from <code>/data/circuit_board_map.json</code>. This is a **status mirror**; if empty, it just shows "Not loaded".</p>
        <div id="circuitBoard" class="panel" style="background:rgba(255,255,255,.02)">
          <p class="muted">Circuit board not loaded.</p>
        </div>
      </section>
    </div>

    <!-- Crystal Harmonics -->
    <div class="grid" id="harmonics" style="margin-top:1.5rem">
      <section class="panel">
        <hgroup>
          <h2>Crystal Harmonics Matrix</h2>
          <h3 class="muted">Numbers ↔ pigments ↔ frequencies ↔ crystals (display only what you provide)</h3>
        </hgroup>
        <p class="muted">Data comes from <code>/data/crystal_harmonics.json</code>. No guesses. Missing = "—".</p>
        <div id="crystalGrid" class="panel" style="background:rgba(255,255,255,.02)">
          <p class="muted">Crystal harmonics not loaded.</p>
        </div>
      </section>
    </div>
  </main>

  <!-- REQUIRED SUBSCRIBE SECTION -->
  <section aria-label="Subscribe example">
    <div class="container">
      <article class="panel">
        <hgroup>
          <h2>Stay in the loop</h2>
          <h3 class="muted">Notify me when new vaults / research engines go live</h3>
        </hgroup>
        <form class="grid">
          <input type="text" id="firstname" name="firstname" placeholder="Your name" aria-label="Your name" required />
          <input type="email" id="email" name="email" placeholder="you@example.com" aria-label="Your email" required />
          <button type="submit" class="btn" onclick="event.preventDefault()">Notify me</button>
        </form>
      </article>
    </div>
  </section>

  <!-- REQUIRED FOOTER -->
  <footer class="container">
    <small><a href="#seal">Seal</a> • <a href="#monorepo">Circuit Board</a></small>
  </footer>

  <script>
    // Strict: show only real data from /data/*.json; where missing, show "Not loaded".
    const STATUS={ mode:'research', datasets:{ octagram:{loaded:false,data:null}, coremap:{loaded:false,data:null}, circuit:{loaded:false,data:null}, crystal:{loaded:false,data:null} } };
    const modeStatus=document.getElementById('modeStatus'), infoPane=document.getElementById('infoPane');

    document.querySelectorAll('button.btn[data-mode]').forEach(b=>b.addEventListener('click',()=>{
      STATUS.mode=b.dataset.mode; modeStatus.textContent='Current: '+STATUS.mode.charAt(0).toUpperCase()+STATUS.mode.slice(1);
      if(STATUS.currentNumber!==undefined) renderInfo(STATUS.currentNumber);
    }));

    async function tryLoad(paths){ for(const p of paths){ try{ const r=await fetch(p,{cache:'no-store'}); if(r.ok) return await r.json(); }catch(e){} } return null; }

    async function loadDatasets(){
      const el=(id)=>document.getElementById(id);

      const oct=await tryLoad(['data/octagram_nodes_full.json','octagram_nodes_full.json']);
      if(oct){ STATUS.datasets.octagram={loaded:true,data:oct}; el('ds-octagram').textContent=`Loaded (${Array.isArray(oct)?oct.length:Object.keys(oct).length} entries)`; }
      else el('ds-octagram').textContent='Not loaded';

      const map=await tryLoad(['data/core_node_map.json','core_node_map.json']);
      if(map){ STATUS.datasets.coremap={loaded:true,data:map}; el('ds-coremap').textContent=`Loaded (${(map.nodes?.length||Object.keys(map).length)} entries)`; }
      else el('ds-coremap').textContent='Not loaded';

      const circuit=await tryLoad(['data/circuit_board_map.json','circuit_board_map.json']);
      if(circuit){ STATUS.datasets.circuit={loaded:true,data:circuit}; el('ds-circuit').textContent=`Loaded (${(circuit.modules?.length||0)} modules)`; renderCircuitBoard(circuit); }
      else el('ds-circuit').textContent='Not loaded';

      const crystal=await tryLoad(['data/crystal_harmonics.json','crystal_harmonics.json']);
      if(crystal){ STATUS.datasets.crystal={loaded:true,data:crystal}; el('ds-crystal').textContent=`Loaded (${(crystal.entries?.length||0)} entries)`; renderCrystalGrid(crystal); }
      else el('ds-crystal').textContent='Not loaded';
    }

    // — Phyllotaxis wheel (0–144), Fibonacci emphasis purely visual
    const canvas=document.getElementById('codexCanvas'), ctx=canvas.getContext('2d');
    const W=canvas.width,H=canvas.height,CX=W/2,CY=H/2, MAX_N=144, GOLDEN_ANGLE=Math.PI*(3-Math.sqrt(5));
    const HARMONICS=new Set([0,1,2,3,5,8,13,21,33,34,55,72,77,78,89,99,111,128,133,144]);
    const wheel=[];

    function layoutWheel(){
      wheel.length=0; const maxR=Math.min(CX,CY)-60;
      for(let n=0;n<=MAX_N;n++){
        const r=Math.sqrt(n/MAX_N)*maxR, t=n*GOLDEN_ANGLE;
        wheel.push({n, x:CX+r*Math.cos(t), y:CY+r*Math.sin(t)});
      }
    }
    function drawWheel(){
      ctx.clearRect(0,0,W,H);
      ctx.beginPath(); ctx.arc(CX,CY,Math.min(CX,CY)-48,0,Math.PI*2); ctx.strokeStyle='rgba(212,175,55,.28)'; ctx.lineWidth=2; ctx.stroke();
      [0.82,0.64,0.46,0.30].forEach(m=>{ ctx.beginPath(); ctx.arc(CX,CY,(Math.min(CX,CY)-48)*m,0,Math.PI*2); ctx.strokeStyle='rgba(255,255,255,.06)'; ctx.lineWidth=1; ctx.stroke(); });
      wheel.forEach(pt=>{ const emph=HARMONICS.has(pt.n); ctx.beginPath(); ctx.arc(pt.x,pt.y, emph?6:3,0,Math.PI*2); ctx.fillStyle=emph?'#d4af37':'#bbc7d9'; ctx.fill(); if(emph){ ctx.strokeStyle='rgba(212,175,55,.75)'; ctx.lineWidth=1.25; ctx.stroke(); }});
    }
    function nodeAt(clientX,clientY){
      const r=canvas.getBoundingClientRect(); const x=(clientX-r.left)*(canvas.width/r.width); const y=(clientY-r.top)*(canvas.height/r.height);
      for(const pt of wheel){ const hit=HARMONICS.has(pt.n)?10:7; if(Math.hypot(pt.x-x,pt.y-y)<=hit) return pt; } return null;
    }
    canvas.addEventListener('click',(e)=>{ const p=nodeAt(e.clientX,e.clientY); if(!p) return; STATUS.currentNumber=p.n; renderInfo(p.n); ctx.beginPath(); ctx.arc(p.x,p.y,12,0,Math.PI*2); ctx.strokeStyle='rgba(212,175,55,.45)'; ctx.lineWidth=2; ctx.stroke(); });

    function safe(v){ return (v===undefined||v===null||v==='') ? '—' : v; }
    function findRecord(num, ds){
      if(!ds) return null;
      if(Array.isArray(ds)) return ds.find(d => (d.number===num) || (Number(String(d.id||'').match(/\d+/)?.[0])===num));
      if(typeof ds==='object'){
        const direct=ds[String(num)]||ds[num]; if(direct) return direct;
        for(const k of Object.keys(ds)){ const v=ds[k]; if(v && (v.number===num || Number(String(v.id||'').match(/\d+/)?.[0])===num)) return v; }
      }
      return null;
    }
    function renderInfo(num){
      const o=STATUS.datasets.octagram.data; const rec=findRecord(num,o); const mode=STATUS.mode;
      const lines=[];
      lines.push(`<div class="kv"><b>Number</b><span>${num}</span></div>`);
      if(rec){
        lines.push(`<div class="kv"><b>Type</b><span>${safe(rec.type)}</span></div>`);
        lines.push(`<div class="kv"><b>Name</b><span>${safe(rec.name||rec.title)}</span></div>`);
        lines.push(`<div class="kv"><b>Tarot</b><span>${safe(rec.tarot)}</span></div>`);
        lines.push(`<div class="kv"><b>Angel</b><span>${safe(rec.angel||rec.shem||rec['shem-angel'])}</span></div>`);
        lines.push(`<div class="kv"><b>Demon</b><span>${safe(rec.demon||rec.goetia)}</span></div>`);
        lines.push(`<div class="kv"><b>Tara</b><span>${safe(rec.tara)}</span></div>`);
        lines.push(`<div class="kv"><b>Geometry</b><span>${safe(rec.geometry)}</span></div>`);
        lines.push(`<div class="kv"><b>Pigment</b><span>${safe(rec.pigment)}</span></div>`);
        lines.push(`<div class="kv"><b>Frequency</b><span>${safe(rec.frequency)}</span></div>`);
        if(mode==='story'){ lines.push(`<hr/><h4>Story</h4><p>${safe(rec.story)}</p>`); }
        if(mode==='rpg' && rec.stats){ lines.push(`<hr/><h4>RPG</h4>`); for(const [k,v] of Object.entries(rec.stats)){ lines.push(`<div class="kv"><b>${k}</b><span>${safe(v)}</span></div>`); } }
        if(mode==='research' && rec.bibliography){ lines.push(`<hr/><h4>Bibliography</h4>`); const bib=Array.isArray(rec.bibliography)?rec.bibliography:[]; if(bib.length===0){ lines.push(`<p class="muted">No citations attached.</p>`);} else { lines.push('<ul>'); bib.slice(0,8).forEach(b=>{ const label=[b.author,b.work,b.year].filter(Boolean).join(' — '); lines.push(`<li>${label} ${b.link?`<a href="${b.link}" target="_blank">source</a>`:''}</li>`); }); lines.push('</ul>'); } }
        if(mode==='art'){ lines.push(`<hr/><h4>Art Render</h4><p class="muted">Client-side geometry/pigment is rendered only if provided in your dataset.</p>`); }
      } else {
        lines.push(`<p class="muted">No entry for ${num} in <code>/data/octagram_nodes_full.json</code>.</p>`);
      }
      infoPane.innerHTML=`<h4 style="color:var(--gold)">Node</h4>${lines.join('')}`;
    }

    // Circuit board
    function renderCircuitBoard(circuit){
      const root=document.getElementById('circuitBoard');
      const mods = Array.isArray(circuit.modules)?circuit.modules:[];
      if(mods.length===0){ root.innerHTML='<p class="muted">No modules listed yet.</p>'; return; }
      const rows = mods.map(m=>`
        <article class="panel">
          <h4>${safe(m.name)}</h4>
          <div class="kv"><b>Repo</b><span>${safe(m.repo)}</span></div>
          <div class="kv"><b>Status</b><span>${safe(m.status)}</span></div>
          <div class="kv"><b>Fly Endpoint</b><span>${m.endpoint?`<code>${m.endpoint}</code>`:'—'}</span></div>
          <div class="kv"><b>Contracts</b><span>${Array.isArray(m.contracts)?m.contracts.map(c=>`<code>${c.method} ${c.path}</code>`).join(' ') : '—'}</span></div>
        </article>
      `).join('');
      root.innerHTML = rows;
    }

    // Crystal harmonics
    function renderCrystalGrid(crystal){
      const root=document.getElementById('crystalGrid');
      const rows = (crystal.entries||[]).map(e=>`
        <article class="panel">
          <h4>Number ${safe(e.number)}</h4>
          <div class="kv"><b>Crystal</b><span>${safe(e.crystal)}</span></div>
          <div class="kv"><b>Pigment</b><span>${safe(e.pigment)}</span></div>
          <div class="kv"><b>Frequency</b><span>${safe(e.frequency)}</span></div>
          <div class="kv"><b>Notes</b><span>${safe(e.notes)}</span></div>
        </article>
      `).join('');
      root.innerHTML = rows || '<p class="muted">No entries.</p>';
    }

    // Init
    (async function init(){
      layoutWheel(); drawWheel(); await loadDatasets(); renderInfo(0);
      window.addEventListener('keydown',(e)=>{ const k=e.key.toLowerCase();
        if(k==='r') document.querySelector('[data-mode="research"]').click();
        if(k==='a') document.querySelector('[data-mode="art"]').click();
        if(k==='s') document.querySelector('[data-mode="story"]').click();
        if(k==='g') document.querySelector('[data-mode="rpg"]').click();
      });
    })();
  </script>
</body>
</html>