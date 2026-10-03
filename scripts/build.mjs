// Generates every SVG in ../assets. Run: npm install && npm run build
// Each section is ONE dark panel (heading inside, so it reads on GitHub light and dark)
// with a desktop (880) and a phone (380) layout. The README swaps them with <picture>.
import fs from 'node:fs'
import path from 'node:path'
import { C, r1, tw, text, wrap, para, icon, panel, chipRow, arrowCircle, kf, EASE_OUT, svg, write, pulse, OUT } from './lib.mjs'

const GREY = '#4A5059'
const P = 20 // outer panel padding
const TOP = 74 // content start under the section title
const W_OF = (m) => (m ? 380 : 880)
const sfx = (m) => (m ? 'm-' : '')

const frame = (W, H, title) => panel(0.5, 0.5, W - 1, H - 1, { r: 24, fill: C.bg }) + text(title, { x: P + 8, y: 48, size: 22, d: true, w: 700, track: -0.03 })

function cellBase(x, y, w, h, accent = false) {
  if (!accent) return panel(x, y, w, h, { r: 16 })
  const id = `ac${Math.round(x)}${Math.round(y)}`
  return (
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.amber}" stop-opacity=".2"/><stop offset=".7" stop-color="${C.amber}" stop-opacity="0.03"/></linearGradient></defs>` +
    panel(x, y, w, h, { r: 16, fill: C.panel, stroke: 'rgba(240,165,58,.38)' }) +
    `<rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" rx="15" fill="url(#${id})"/>`
  )
}

// ============================== HERO ==============================
function hero(m) {
  const W = W_OF(m)
  const H = m ? 410 : 276
  const T = 7
  let css = ''
  let b = `<defs><radialGradient id="glow" cx=".85" cy="1" r=".75"><stop offset="0" stop-color="${C.amber}" stop-opacity=".15"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient></defs>`
  b += panel(0.5, 0.5, W - 1, H - 1, { r: 24, fill: C.bg })
  b += `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="23" fill="url(#glow)"/>`

  const x0 = m ? 26 : 44
  const eb = 'AI & SOFTWARE ENGINEER'
  const ebo = { size: 9.5, mono: true, w: 500, track: 0.1 }
  const ebw = tw(eb, ebo)
  const ey = m ? 26 : 34
  b += `<rect x="${x0}" y="${ey}" width="${r1(ebw + 24)}" height="24" rx="12" fill="${C.amber}" fill-opacity=".08" stroke="${C.amber}" stroke-opacity=".35"/>`
  b += text(eb, { ...ebo, x: x0 + 12, y: ey + 15.5, fill: C.amber })

  const ns = m ? 36 : 46
  const ny = ey + (m ? 70 : 76)
  b += text('Hasin Mahtab', { x: x0, y: ny, size: ns, d: true, w: 800, track: -0.04 })
  b += text('Alvee', { x: x0, y: ny + ns + 4, size: ns, d: true, w: 800, track: -0.04 })
  b += para('I build voice, LLM and verifiable systems that turn raw signals into structured, trustworthy output.', {
    x: x0, y: ny + ns + 40, size: m ? 13 : 13.5, fill: C.mute, maxW: m ? 328 : 400, lh: m ? 19 : 21,
  }).svg

  // signal -> structure panel
  const [vx, vy, vw, vh] = m ? [20, 222, 340, 168] : [504, 24, 352, 228]
  b += panel(vx, vy, vw, vh, { r: 16, fill: C.panel })
  const cy = vy + vh / 2
  const ip = 24
  const bw = (vw - ip * 2) * 0.5
  const pitch = bw / 16
  const hs = [34, 70, 52, 112, 76, 142, 96, 58, 126, 88, 44, 104, 64, 30, 54, 24]
  const maxH = vh * 0.6
  hs.forEach((h0, i) => {
    const h = (h0 / 142) * maxH
    const a = 0.2 + 0.18 * i
    css += kf(`sc${i}`, T, [[0, `fill:${GREY}`], [a, `fill:${GREY}`], [a + 0.3, `fill:${C.amber}`], [a + 2.2, `fill:${C.amber}`], [a + 2.9, `fill:${GREY}`], [T, `fill:${GREY}`]])
    css += `.b${i}{animation:sc${i} ${T}s linear infinite,br ${r1(1.3 + ((i * 7) % 11) * 0.12)}s cubic-bezier(.45,.05,.55,.95) ${r1(-i * 0.37)}s infinite alternate}`
    b += `<rect class="bar b${i}" x="${r1(vx + ip + i * pitch)}" y="${r1(cy - h / 2)}" width="${r1(pitch * 0.45)}" height="${r1(h)}" rx="${r1(pitch * 0.225)}" fill="${GREY}"/>`
  })
  css += `.bar{transform-origin:50% 50%}@keyframes br{from{transform:scaleY(.4)}to{transform:scaleY(1)}}`
  const ax = vx + ip + bw + 8
  css += kf('arr', T, [[0, 'opacity:.25'], [1, 'opacity:.25'], [3.2, 'opacity:1'], [5.4, 'opacity:1'], [6.4, 'opacity:.25']]) + `.arr{animation:arr ${T}s linear infinite}`
  b += `<path class="arr" d="M${r1(ax)} ${r1(cy)} h14 m-5 -5 l5 5 l-5 5" fill="none" stroke="${C.amber}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
  const lx = ax + 26
  const lw = vx + vw - ip - lx
  const lines = [1, 0.76, 0.94, 0.56, 0.86, 0.42]
  const lp = vh * 0.085
  lines.forEach((f, j) => {
    const a = 0.8 + 0.5 * j
    css += kf(`ln${j}`, T, [[0, 'opacity:0;transform:scaleX(0)'], [a, 'opacity:1;transform:scaleX(0)', EASE_OUT], [a + 0.7, 'opacity:1;transform:scaleX(1)'], [6.3, 'opacity:1;transform:scaleX(1)'], [6.7, 'opacity:0;transform:scaleX(1)'], [T, 'opacity:0;transform:scaleX(0)']])
    css += `.l${j}{transform-origin:0 50%;animation:ln${j} ${T}s linear infinite}`
    const y = cy - (lp * 6) / 2 + j * lp
    b += `<g class="l${j}"><rect x="${r1(lx)}" y="${r1(y)}" width="13" height="6" rx="3" fill="${j % 2 ? C.text : C.amber}"/><rect x="${r1(lx + 18)}" y="${r1(y)}" width="${r1((lw - 18) * f)}" height="6" rx="3" fill="#3A4048"/></g>`
  })
  write(`${sfx(m)}hero.svg`, svg(W, H, 'Hasin Mahtab Alvee, AI and software engineer. A waveform resolves into a speaker-labelled transcript.', b, css))
}

// ============================== LINK PILLS ==============================
function pillLink(file, label, ic, primary) {
  const size = 13
  const h = 38
  const lw = tw(label, { size, w: 600 })
  const w = Math.ceil(16 + (ic ? 26 : 0) + lw + 14 + 26 + 6)
  let b = `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${h / 2 - 0.5}" fill="${primary ? C.amber : C.panel}" stroke="${primary ? C.amber : C.line2}"/>`
  let x = 16
  if (ic === 'in' || ic === 'K') {
    b += `<rect x="${x}" y="11" width="16" height="16" rx="4" fill="${C.mute}"/>` + text(ic, { x: x + 8, y: 23, size: 10.5, w: 700, fill: C.bg, anchor: 'middle' })
    x += 24
  } else if (ic) {
    b += icon(ic, x, 11, 16, primary ? C.bg : C.mute)
    x += 24
  }
  b += text(label, { x, y: 24, size, w: 600, fill: primary ? C.bg : C.text })
  b += arrowCircle(w - 6 - 13, h / 2, 13, primary ? 'rgba(11,12,14,.12)' : C.panel2, primary ? 'rgba(11,12,14,.25)' : C.line2, primary ? C.bg : C.amber)
  write(file, svg(w, h, label, b))
}

// ============================== BENTO ==============================
const CELLS = [
  { k: 'voice', t: 'Voice and speech AI', d: 'Real-time voice agents, streaming transcription with diarization, and Bangla TTS tooling.', chips: [['WebRTC'], ['Whisper'], ['Soniox'], ['NeMo']] },
  { k: 'llm', t: 'LLMs and RAG', stat: '70%', d: 'lower cost-per-token than the Gemini API, with QLoRA-tuned Gemma 3 served as GGUF.', chips: [['Qdrant', 'qdrant'], ['Hugging Face', 'huggingface']], accent: true },
  { k: 'cloud', t: 'Cloud systems', d: 'OpenShift, AWS and GCP services, with Nginx tuned for live TTS streaming.', chips: [['Kubernetes', 'k8s'], ['Docker', 'docker'], ['OpenShift', 'openshift']] },
  { k: 'trust', t: 'Verifiable systems', d: 'SHUTRA notarizes trade events on Hyperledger Fabric and issues a verifiable product passport.', chips: [['Hyperledger'], ['Go', 'go'], ['Fastify', 'fastify']] },
  { k: 'embed', t: 'Apps and embedded', d: 'Next.js, React Native and FastAPI apps, plus Arduino and ESP32 tooling.', chips: [['TypeScript', 'typescript'], ['Next.js', 'nextjs'], ['ESP32', 'espressif']] },
]

function bento(m) {
  const W = W_OF(m)
  const cw = W - 2 * P
  const gap = 10
  const pad = 18
  const css = []
  const DO = { size: 12, fill: C.mute }

  const measure = (c, w) => {
    const iw = w - 2 * pad
    const lines = wrap(c.d, iw, DO).length
    const ds = c.stat ? 112 : 58
    return ds + (lines - 1) * 17 + 17 + chipRow(c.chips, { x: 0, y: 0, maxW: iw }).h + pad
  }

  let rows
  if (m) rows = CELLS.map((c) => [[c, cw]])
  else {
    const w1 = Math.round((cw - gap) * 0.6)
    const a = Math.round((cw - 2 * gap) * 0.3)
    const bb = Math.round((cw - 2 * gap) * 0.38)
    rows = [[[CELLS[0], w1], [CELLS[1], cw - gap - w1]], [[CELLS[2], a], [CELLS[3], bb], [CELLS[4], cw - 2 * gap - a - bb]]]
  }

  let b = ''
  let y = TOP
  for (const row of rows) {
    const h = Math.max(...row.map(([c, w]) => measure(c, w)))
    let x = P
    for (const [c, w] of row) {
      b += cellBase(x, y, w, h, c.accent)
      b += text(c.t, { x: x + pad, y: y + 34, size: 16, d: true, w: 700, track: -0.02 })
      let ds = 58
      if (c.stat) {
        b += text(c.stat, { x: x + pad - 2, y: y + 88, size: 46, d: true, w: 800, track: -0.05, fill: C.amber })
        ds = 112
      }
      b += para(c.d, { x: x + pad, y: y + ds, size: 12, fill: C.mute, maxW: w - 2 * pad, lh: 17 }).svg
      const ch = chipRow(c.chips, { x: 0, y: 0, maxW: w - 2 * pad }).h
      b += chipRow(c.chips, { x: x + pad, y: y + h - pad - ch, maxW: w - 2 * pad }).svg
      if (!m && c.k === 'voice') b += bigWave(x + w - pad - 190, y + h / 2 + 6, css)
      else b += visual(c.k, x + w - pad - 56, y + 16, css)
      x += w + gap
    }
    y += h + gap
  }
  const H = y - gap + P
  write(`${sfx(m)}build.svg`, svg(W, H, 'What I build: voice and speech AI, LLMs and RAG, cloud systems, verifiable systems, apps and embedded.', frame(W, H, 'What I build') + b, css.join('')))
}

// large waveform for the wide desktop voice cell
function bigWave(vx, cy, css) {
  const hs = [18, 40, 28, 64, 44, 84, 52, 30, 72, 48, 24, 58, 36, 18]
  css.push(`.bw{transform-origin:50% 50%}@keyframes bw{from{transform:scaleY(.4)}to{transform:scaleY(1)}}`)
  return hs.map((h, i) => {
    css.push(`.q${i}{animation:bw ${r1(1.3 + ((i * 5) % 7) * 0.2)}s cubic-bezier(.45,.05,.55,.95) ${r1(-i * 0.33)}s infinite alternate}`)
    return `<rect class="bw q${i}" x="${vx + i * 13.5}" y="${cy - h / 2}" width="5" height="${h}" rx="2.5" fill="${i % 3 === 1 ? C.amber : GREY}"/>`
  }).join('')
}

// 56x26 mini visuals, top-right of each cell
function visual(k, vx, vy, css) {
  const cy = vy + 13
  if (k === 'voice') {
    const hs = [8, 16, 12, 24, 18, 26, 14, 10]
    css.push(`.wv{transform-origin:50% 50%}@keyframes wv{from{transform:scaleY(.35)}to{transform:scaleY(1)}}`)
    return hs.map((h, i) => {
      css.push(`.w${i}{animation:wv ${r1(1.2 + ((i * 5) % 7) * 0.2)}s cubic-bezier(.45,.05,.55,.95) ${r1(-i * 0.31)}s infinite alternate}`)
      return `<rect class="wv w${i}" x="${vx + i * 7}" y="${cy - h / 2}" width="3" height="${h}" rx="1.5" fill="${i % 3 === 1 ? C.amber : GREY}"/>`
    }).join('')
  }
  if (k === 'cloud') {
    css.push(`@keyframes pk{0%{transform:translateX(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(23px);opacity:0}}.pk{animation:pk 2.2s linear infinite}`)
    let s = `<path d="M${vx + 5} ${cy} H${vx + 51}" stroke="${C.line2}" stroke-width="1.5"/>`
    for (let i = 0; i < 3; i++) s += `<rect x="${vx + i * 23}" y="${cy - 5}" width="10" height="10" rx="3" fill="${C.panel2}" stroke="${C.line2}"/>`
    s += `<circle class="pk" cx="${vx + 10}" cy="${cy}" r="2.2" fill="${C.amber}"/><circle class="pk" style="animation-delay:-1.1s" cx="${vx + 33}" cy="${cy}" r="2.2" fill="${C.amber}"/>`
    return s
  }
  if (k === 'trust') {
    let s = ''
    for (let i = 0; i < 3; i++) {
      const a = i * 0.9
      css.push(kf(`bk${i}`, 3.6, [[0, `stroke:${C.line2};fill:${C.panel2}`], [a, `stroke:${C.line2};fill:${C.panel2}`], [a + 0.3, `stroke:${C.amber};fill:rgba(240,165,58,.16)`], [a + 0.9, `stroke:${C.amber};fill:rgba(240,165,58,.16)`], [a + 1.3, `stroke:${C.line2};fill:${C.panel2}`], [3.6, `stroke:${C.line2};fill:${C.panel2}`]]) + `.bk${i}{animation:bk${i} 3.6s linear infinite}`)
      if (i) s += `<path d="M${vx + i * 21 - 7} ${cy} H${vx + i * 21}" stroke="${C.line2}" stroke-width="1.5"/>`
      s += `<rect class="bk${i}" x="${vx + i * 21}" y="${cy - 10}" width="14" height="20" rx="4" fill="${C.panel2}" stroke="${C.line2}"/>`
    }
    return s
  }
  if (k === 'embed') {
    css.push(`@keyframes cp{to{stroke-dashoffset:-32}}.cp{stroke-dasharray:5 11;animation:cp 1.4s linear infinite}`)
    const ds = [`M${vx} ${cy - 5} H${vx + 20}`, `M${vx} ${cy + 5} H${vx + 20}`, `M${vx + 36} ${cy - 5} H${vx + 56}`, `M${vx + 36} ${cy + 5} H${vx + 56}`]
    return (
      ds.map((d, i) => `<path d="${d}" stroke="${C.line2}" stroke-width="1.5" fill="none"/><path class="cp" style="animation-delay:${r1(-i * 0.35)}s" d="${d}" stroke="${C.amber}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`).join('') +
      `<rect x="${vx + 20}" y="${cy - 10}" width="16" height="20" rx="4" fill="${C.panel2}" stroke="${C.amber}" stroke-opacity=".6"/>`
    )
  }
  return ''
}

// ============================== WORK ==============================
const PROJECTS = [
  { name: 'SHUTRA', date: 'Sep 2026', desc: 'Trade-integrity platform for RMG exports: notarizes workflow events on Hyperledger Fabric and issues a verifiable passport.', tech: ['Hyperledger Fabric', 'Go', 'React'] },
  { name: 'ClimBarta', date: 'Dec 2025', desc: 'Real-time audio transcription and data extraction for disaster-affected communities in Bangladesh.', tech: ['NeMo', 'Silero VAD', 'FastAPI'] },
  { name: 'CircuitLM', date: 'Aug 2025', desc: 'Multi-agent LLM framework that turns natural language prompts into verified circuit schematics.', tech: ['Wokwi', 'ChromaDB', 'NextJS'] },
  { name: 'RoboLink', date: 'Aug 2025', desc: 'Robot control ecosystem: custom interfaces, Arduino and ESP32 code generation, real-time hardware link.', tech: ['NextJS', 'React Native', 'MongoDB'] },
  { name: 'Discord LLMWiki', date: 'May 2026', desc: 'Discord community manager that builds a self-maintaining wiki from conversations and answers FAQs.', tech: ['Qdrant', 'Gemini', 'Docker'] },
  { name: 'Silent Voice', date: 'Jun - Aug 2024', desc: 'Real-time American Sign Language to text and speech, with a built-in ASL dictionary.', tech: ['NextJS', 'FastAPI'] },
]

function work(m) {
  const W = W_OF(m)
  const cw = W - 2 * P
  const gap = 10
  const cols = m ? 1 : 3
  const w = Math.floor((cw - gap * (cols - 1)) / cols)
  const pad = 16
  const DO = { size: 11.5, fill: C.mute }
  const tech = (p) => p.tech.map((t) => [t])
  const co = { size: 9, h: 20 }
  const hOf = (p) => 56 + (wrap(p.desc, w - 2 * pad, DO).length - 1) * 16 + 16 + chipRow(tech(p), { x: 0, y: 0, maxW: w - 2 * pad, ...co }).h + pad
  const h = Math.max(...PROJECTS.map(hOf))
  let b = ''
  PROJECTS.forEach((p, i) => {
    const x = P + (i % cols) * (w + gap)
    const y = TOP + Math.floor(i / cols) * (h + gap)
    b += cellBase(x, y, w, h)
    b += text(p.name, { x: x + pad, y: y + 30, size: 15.5, d: true, w: 700, track: -0.02 })
    b += text(p.date, { x: x + w - pad, y: y + 29.5, size: 9, mono: true, fill: C.dim, anchor: 'end' })
    b += para(p.desc, { x: x + pad, y: y + 54, size: 11.5, fill: C.mute, maxW: w - 2 * pad, lh: 16 }).svg
    const ch = chipRow(tech(p), { x: 0, y: 0, maxW: w - 2 * pad, ...co }).h
    b += chipRow(tech(p), { x: x + pad, y: y + h - pad - ch, maxW: w - 2 * pad, ...co }).svg
  })
  const rows = Math.ceil(PROJECTS.length / cols)
  const H = TOP + rows * h + (rows - 1) * gap + P
  write(`${sfx(m)}work.svg`, svg(W, H, 'Selected work: ' + PROJECTS.map((p) => p.name).join(', ') + '.', frame(W, H, 'Selected work') + b))
}

// ============================== RESEARCH ==============================
const PAPERS = [
  { title: 'CircuitLM: A Multi-Agent LLM-Aided Design Framework for Generating Circuit Schematics from Natural Language Prompts', big: '100', cap: 'embedded-system designs evaluated across six LLMs', venue: '2026 IEEE International Conference on LLM-Aided Design (ICLAD)' },
  { title: 'Evaluating CoAtNet for Multiclass Lung Cancer Classification on CT Images: A Benchmark Study on the IQ-OTH/NCCD Dataset', big: '98.17%', cap: 'accuracy and 97.12% F1 across benign, malignant and normal cases', venue: 'IEEE 15th International Conference on Communication Systems and Network Technologies' },
]

function research(m) {
  const W = W_OF(m)
  const cw = W - 2 * P
  const gap = 10
  const cols = m ? 1 : 2
  const w = Math.floor((cw - gap * (cols - 1)) / cols)
  const pad = 18
  const TO = { size: 14, d: true, w: 600, track: -0.015 }
  const parts = (p) => {
    const bw = tw(p.big, { size: 30, d: true, w: 800, track: -0.045 })
    return {
      bw,
      t: wrap(p.title, w - 2 * pad, TO),
      cap: wrap(p.cap, w - 2 * pad - bw - 12, { size: 11 }),
      v: wrap(p.venue, w - 2 * pad, { size: 9, mono: true }),
    }
  }
  const hOf = (p) => {
    const q = parts(p)
    return 44 + q.t.length * 19 + 14 + Math.max(36, q.cap.length * 15) + 12 + q.v.length * 14 + pad
  }
  const h = Math.max(...PAPERS.map(hOf))
  let b = ''
  PAPERS.forEach((p, i) => {
    const x = P + (i % cols) * (w + gap)
    const y = TOP + Math.floor(i / cols) * (h + gap)
    const q = parts(p)
    b += cellBase(x, y, w, h)
    b += text('IEEE 2026', { x: x + pad, y: y + 28, size: 9, mono: true, w: 500, track: 0.1, fill: C.amber })
    b += q.t.map((l, k) => text(l, { ...TO, x: x + pad, y: y + 54 + k * 19 })).join('')
    const sy = y + 54 + q.t.length * 19 + 34
    b += text(p.big, { x: x + pad - 1, y: sy, size: 30, d: true, w: 800, track: -0.045, fill: C.amber })
    b += q.cap.map((l, k) => text(l, { x: x + pad + q.bw + 12, y: sy - 16 + k * 15, size: 11, fill: C.mute })).join('')
    b += q.v.map((l, k) => text(l, { x: x + pad, y: y + h - pad - (q.v.length - 1 - k) * 14, size: 9, mono: true, fill: C.dim })).join('')
  })
  const rows = Math.ceil(PAPERS.length / cols)
  const H = TOP + rows * h + (rows - 1) * gap + P
  write(`${sfx(m)}research.svg`, svg(W, H, 'Research: two IEEE conference papers from 2026, CircuitLM and CoAtNet lung cancer classification.', frame(W, H, 'Research') + b))
}

// ============================== TIMELINE ==============================
const EVENTS = [
  { d: 'Jun - Sep 2024', t: 'Honorable Mention', s: 'Blockchain Olympiad Bangladesh, AI category. Nominated internationally.' },
  { d: 'Feb - Mar 2025', t: 'Top 8 of 100+', s: 'Youth Startup Summit, as Team Agronova.' },
  { d: 'Aug 2025', t: '2nd Runner-Up', s: 'IUT AutoMech Hackathon, as Team Robolink.' },
  { d: 'Dec 2025', t: '1st Runner-Up', s: 'Oxfam AI Meets Climate Action, with ClimBarta.' },
  { d: 'Aug - Sep 2026', t: 'Top 5 Finalist', s: 'Blockchain Olympiad Bangladesh, blockchain category. Nominated internationally.' },
]

function timeline(m) {
  const W = W_OF(m)
  const css = []
  let b = ''
  let H
  if (!m) {
    const x0 = P + 8
    const x1 = W - P - 8
    const px = (mo) => x0 + (mo / 49) * (x1 - x0) // months since Aug 2022
    b += text('2022', { x: x0, y: TOP + 6, size: 9, mono: true, fill: C.dim })
    for (let yr = 2023; yr <= 2026; yr++) b += text(String(yr), { x: px((yr - 2022) * 12 - 8), y: TOP + 6, size: 9, mono: true, fill: C.dim })
    b += `<rect x="${x0}" y="${TOP + 16}" width="${x1 - x0}" height="28" rx="10" fill="${C.panel2}" stroke="${C.line2}"/>`
    b += text('B.Sc. Software Engineering, Islamic University of Technology', { x: x0 + 14, y: TOP + 34.5, size: 12, w: 600, fill: C.text })
    const bar = (m0, m1, y, label) => {
      const xa = px(m0)
      const xb = px(m1)
      return `<rect x="${r1(xa)}" y="${y}" width="${r1(xb - xa)}" height="22" rx="8" fill="${C.amber}" fill-opacity=".14" stroke="${C.amber}" stroke-opacity=".55"/>` + text(label, { x: xa - 10, y: y + 15, size: 11.5, w: 500, fill: C.mute, anchor: 'end' })
    }
    b += bar(33, 37, TOP + 54, 'AI Intern, Orange Business Development')
    b += bar(38, 42, TOP + 82, 'Associate Software Engineer, Vivasoft')
    const by = TOP + 150
    const T = 9
    const col = (x1 - x0) / 5
    b += `<path d="M${x0} ${by} H${x1}" stroke="${C.line2}" stroke-width="1.5"/>`
    EVENTS.forEach((e, i) => {
      const cx = x0 + col * i + col / 2 - 6
      const a = ((cx - x0) / (x1 - x0)) * (T - 1)
      css.push(kf(`ev${i}`, T, [[0, `stroke:${GREY}`], [a, `stroke:${GREY}`], [a + 0.25, `stroke:${C.amber}`], [a + 2.6, `stroke:${C.amber}`], [a + 3.4, `stroke:${GREY}`], [T, `stroke:${GREY}`]]) + `.ev${i}{animation:ev${i} ${T}s linear infinite}`)
      b += `<path class="ev${i}" d="M${r1(cx - 18)} ${by} ${pulse(cx, by, 30, 20)} H${r1(cx + 20)}" fill="none" stroke="${GREY}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`
      const lx = x0 + col * i
      b += text(e.d, { x: lx, y: by + 46, size: 9, mono: true, fill: C.amber })
      b += text(e.t, { x: lx, y: by + 66, size: 13.5, d: true, w: 700, track: -0.015 })
      b += para(e.s, { x: lx, y: by + 84, size: 11, fill: C.mute, maxW: col - 16, lh: 15 }).svg
    })
    css.push(kf('cur', T, [[0, 'transform:translateX(0);opacity:0'], [0.4, 'opacity:.9'], [T - 1.4, 'opacity:.9'], [T - 1, `transform:translateX(${x1 - x0}px);opacity:0`], [T, 'transform:translateX(0);opacity:0']]) + `.cur{animation:cur ${T}s linear infinite}`)
    b += `<rect class="cur" x="${x0}" y="${by - 38}" width="1.5" height="76" fill="${C.amber}"/>`
    H = by + 84 + 15 * 4 + 12
  } else {
    const rows = [
      { g: 'EDUCATION' },
      { d: 'Aug 2022 - Sep 2026', t: 'B.Sc. Software Engineering', s: 'Islamic University of Technology' },
      { g: 'WORK' },
      { d: 'Oct 2025 - Jan 2026', t: 'Associate Software Engineer', s: 'Vivasoft Limited' },
      { d: 'May - Aug 2025', t: 'AI Intern', s: 'Orange Business Development Ltd.' },
      { g: 'RECOGNITION' },
      ...EVENTS.map((e) => ({ ...e, hot: true })),
    ]
    const w = W - 2 * P
    let y = TOP - 4
    let k = 0
    for (const r of rows) {
      if (r.g) {
        b += text(r.g, { x: P + 8, y: y + 14, size: 8.5, mono: true, w: 500, track: 0.12, fill: C.dim })
        y += 22
        continue
      }
      const sl = wrap(r.s, w - 40, { size: 11 })
      const h = 68 + (sl.length - 1) * 15
      b += cellBase(P, y, w, h)
      if (r.hot) {
        css.push(kf(`ev${k}`, 9, [[0, `fill:${GREY}`], [k * 1.1, `fill:${GREY}`], [k * 1.1 + 0.3, `fill:${C.amber}`], [k * 1.1 + 1.6, `fill:${C.amber}`], [k * 1.1 + 2.2, `fill:${GREY}`], [9, `fill:${GREY}`]]) + `.ev${k}{animation:ev${k} 9s linear infinite}`)
        b += `<rect class="ev${k}" x="${P + 14}" y="${y + 14}" width="3" height="${h - 28}" rx="1.5" fill="${GREY}"/>`
        k++
      }
      b += text(r.d, { x: P + 28, y: y + 20, size: 8.5, mono: true, fill: C.amber })
      b += text(r.t, { x: P + 28, y: y + 38, size: 13.5, d: true, w: 700, track: -0.015 })
      b += sl.map((l, i) => text(l, { x: P + 28, y: y + 54 + i * 15, size: 11, fill: C.mute })).join('')
      y += h + 6
    }
    H = y - 6 + P
  }
  write(`${sfx(m)}path.svg`, svg(W, H, 'Trajectory: B.Sc. in Software Engineering at IUT, AI internship at Orange Business Development, associate software engineer at Vivasoft, and five competition results from 2024 to 2026.', frame(W, H, 'Trajectory') + b, css.join('')))
}

// ============================== RUN ==============================
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.svg')) fs.unlinkSync(path.join(OUT, f))
for (const m of [false, true]) {
  hero(m)
  bento(m)
  work(m)
  research(m)
  timeline(m)
}
pillLink('link-email.svg', 'Email me', 'gmail', true)
pillLink('link-linkedin.svg', 'LinkedIn', 'in', false)
pillLink('link-kaggle.svg', 'Kaggle', 'K', false)
