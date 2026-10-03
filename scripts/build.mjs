// Generates every SVG in ../assets. Run: npm install && npm run build
import { C, r1, r2, tw, text, para, icon, panel, chip, chipRow, arrowCircle, kf, EASE_OUT, svg, write, pulse } from './lib.mjs'

const W = 840
const GREY = '#4A5059'

// ============================== HERO ==============================
function hero() {
  const H = 352
  const T = 7
  let css = ''
  let b = ''
  b += `<defs><radialGradient id="glow" cx=".85" cy="1" r=".75"><stop offset="0" stop-color="${C.amber}" stop-opacity=".15"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient></defs>`
  b += panel(0.5, 0.5, W - 1, H - 1, { r: 24, fill: C.bg })
  b += `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="23" fill="url(#glow)"/>`

  // eyebrow pill
  const eb = 'AI & SOFTWARE ENGINEER'
  const ebo = { size: 11, mono: true, w: 500, track: 0.14 }
  const ebw = tw(eb, ebo)
  b += `<rect x="48" y="40" width="${r1(ebw + 28)}" height="26" rx="13" fill="${C.amber}" fill-opacity=".08" stroke="${C.amber}" stroke-opacity=".35"/>`
  b += text(eb, { ...ebo, x: 62, y: 57, fill: C.amber })

  b += text('Hasin Mahtab', { x: 48, y: 128, size: 56, w: 600, track: -0.035 })
  b += text('Alvee', { x: 48, y: 184, size: 56, w: 600, track: -0.035 })
  b += para('I build voice, LLM and verifiable systems that turn raw signals into structured, trustworthy output.', {
    x: 48, y: 224, size: 16.5, fill: C.mute, maxW: 350, lh: 25, track: -0.005,
  }).svg

  // rotating "recently" line
  b += text('RECENTLY', { x: 48, y: 304, size: 10.5, mono: true, w: 500, track: 0.14, fill: C.amber })
  const items = [
    'Real-time voice agent: WebRTC + Qdrant RAG',
    'Gemma 3 QLoRA fine-tune, served as GGUF',
    'Self-hosted LLMs at 70% lower token cost',
    'SHUTRA: trade passports on Hyperledger',
  ]
  const RT = 16
  items.forEach((s, k) => {
    const a = k * 4
    const stops =
      k === 0
        ? [[0, 'opacity:1;transform:translateY(0)'], [3.5, 'opacity:1;transform:translateY(0)'], [4, 'opacity:0;transform:translateY(-6px)'], [15.5, 'opacity:0;transform:translateY(6px)'], [16, 'opacity:1;transform:translateY(0)', EASE_OUT]]
        : [[0, 'opacity:0;transform:translateY(6px)'], [a, 'opacity:0;transform:translateY(6px)'], [a + 0.5, 'opacity:1;transform:translateY(0)', EASE_OUT], [a + 3.5, 'opacity:1;transform:translateY(0)'], [a + 4, 'opacity:0;transform:translateY(-6px)'], [16, 'opacity:0;transform:translateY(-6px)']]
    css += kf(`rt${k}`, RT, stops) + `.rt${k}{animation:rt${k} ${RT}s linear infinite}`
    b += `<g opacity="${k === 0 ? 1 : 0}" class="rt${k}">${text(s, { x: 48, y: 328, size: 14.5, fill: C.text })}</g>`
  })

  // right: signal -> structure panel
  b += panel(432, 28, 380, 296, { r: 16, fill: C.panel })
  b += text('VOICE', { x: 456, y: 62, size: 10, mono: true, track: 0.14, fill: C.dim })
  b += text('TRANSCRIPT', { x: 668, y: 62, size: 10, mono: true, track: 0.14, fill: C.dim })

  const hs = [34, 70, 52, 112, 76, 142, 96, 58, 126, 88, 44, 104, 64, 30, 54, 24]
  const cy = 176
  css += `.bar{transform-origin:50% 50%}`
  hs.forEach((h, i) => {
    const a = 0.2 + 0.18 * i
    css += kf(`sc${i}`, T, [[0, `fill:${GREY}`], [a, `fill:${GREY}`], [a + 0.3, `fill:${C.amber}`], [a + 2.2, `fill:${C.amber}`], [a + 2.9, `fill:${GREY}`], [T, `fill:${GREY}`]])
    const d = r1(1.3 + ((i * 7) % 11) * 0.12)
    css += `.b${i}{animation:sc${i} ${T}s linear infinite,br ${d}s cubic-bezier(.45,.05,.55,.95) ${r1(-i * 0.37)}s infinite alternate}`
    b += `<rect class="bar b${i}" x="${456 + i * 11}" y="${cy - h / 2}" width="5" height="${h}" rx="2.5" fill="${GREY}"/>`
  })
  css += `@keyframes br{from{transform:scaleY(.4)}to{transform:scaleY(1)}}`

  css += kf('arr', T, [[0, 'opacity:.25'], [1, 'opacity:.25'], [3.2, 'opacity:1'], [5.4, 'opacity:1'], [6.4, 'opacity:.25']]) + `.arr{animation:arr ${T}s linear infinite}`
  b += `<path class="arr" d="M636 176 H652 M647 170 L653 176 L647 182" fill="none" stroke="${C.amber}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`

  const lines = [124, 96, 118, 70, 108, 52]
  lines.forEach((lw, j) => {
    const a = 0.8 + 0.5 * j
    css += kf(`ln${j}`, T, [[0, 'opacity:0;transform:scaleX(0)'], [a, 'opacity:1;transform:scaleX(0)', EASE_OUT], [a + 0.7, 'opacity:1;transform:scaleX(1)'], [6.3, 'opacity:1;transform:scaleX(1)'], [6.7, 'opacity:0;transform:scaleX(1)'], [T, 'opacity:0;transform:scaleX(0)']])
    css += `.l${j}{transform-origin:0 50%;animation:ln${j} ${T}s linear infinite}`
    const y = 122 + j * 22
    const tag = j % 2 === 0 ? C.amber : C.text
    b += `<g class="l${j}"><rect x="668" y="${y}" width="16" height="7" rx="3.5" fill="${tag}"/><rect x="690" y="${y}" width="${lw - 22}" height="7" rx="3.5" fill="#3A4048"/></g>`
  })
  b += text('2 SPEAKERS', { x: 668, y: 306, size: 10, mono: true, track: 0.14, fill: C.dim })
  b += text('LIVE', { x: 456, y: 306, size: 10, mono: true, track: 0.14, fill: C.dim })
  write('hero.svg', svg(W, H, 'Hasin Mahtab Alvee, AI and software engineer. A waveform resolves into a speaker-labelled transcript.', b, css))
}

// ============================== LINK PILLS ==============================
function pillLink(file, label, ic, primary) {
  const size = 15
  const lw = tw(label, { size, w: 500 })
  const iconW = ic ? 18 + 10 : 0
  const w = Math.ceil(20 + iconW + lw + 14 + 30 + 6)
  const h = 44
  const fg = primary ? C.bg : C.text
  let b = `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${h / 2 - 0.5}" fill="${primary ? C.amber : C.panel}" stroke="${primary ? C.amber : C.line2}"/>`
  let x = 20
  if (ic === 'in' || ic === 'K') {
    b += `<rect x="${x}" y="13" width="18" height="18" rx="4.5" fill="${C.mute}"/>` + text(ic, { x: x + 9, y: 26.5, size: 11.5, w: 700, fill: C.bg, anchor: 'middle' })
    x += 28
  } else if (ic) {
    b += icon(ic, x, 13, 18, primary ? C.bg : C.mute)
    x += 28
  }
  b += text(label, { x, y: 27.5, size, w: 500, fill: fg, track: -0.005 })
  const cx = w - 6 - 16
  b += arrowCircle(cx, h / 2, 16, primary ? 'rgba(11,12,14,.12)' : C.panel2, primary ? 'rgba(11,12,14,.25)' : C.line2, primary ? C.bg : C.amber)
  write(file, svg(w, h, label, b))
}

// ============================== SECTION HEAD ==============================
function head(file, title, sub) {
  // Headings sit directly on the page (no panel), so ship ink for both GitHub themes via <picture>.
  for (const [suffix, ink, mute] of [['-dark', C.text, C.mute], ['', '#1F2328', '#59636E']]) {
    let b = text(title, { x: 0, y: 40, size: 34, w: 600, track: -0.035, fill: ink })
    const p = para(sub, { x: 0, y: 72, size: 16, fill: mute, maxW: 600, lh: 24 })
    b += p.svg
    write(file.replace('.svg', `${suffix}.svg`), svg(W, 72 + p.h + 6, title, b))
  }
}

// ============================== BENTO ==============================
function cellBase(x, y, w, h, { accent = false } = {}) {
  let b = ''
  if (accent) {
    const id = `ac${x}${y}`
    b += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.amber}" stop-opacity=".2"/><stop offset=".7" stop-color="${C.amber}" stop-opacity=".03"/></linearGradient></defs>`
    b += panel(x, y, w, h, { fill: C.panel, stroke: 'rgba(240,165,58,.38)' })
    b += `<rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" rx="19" fill="url(#${id})"/>`
  } else b += panel(x, y, w, h)
  return b
}

function bento() {
  const gap = 12
  const rows = [292, 262, 208]
  const y1 = rows[0] + gap
  const y2 = y1 + rows[1] + gap
  const H = y2 + rows[2]
  const pad = 28
  let css = ''
  let b = ''

  const title = (s, x, y) => text(s, { x: x + pad, y: y + 54, size: 22, w: 600, track: -0.025 })
  const desc = (s, x, y, maxW, dy = 86) => para(s, { x: x + pad, y: y + dy, size: 15, fill: C.mute, maxW, lh: 22 }).svg
  const chips = (items, x, y, w, h) => {
    const probe = chipRow(items, { x: 0, y: 0, maxW: w - pad * 2 })
    return chipRow(items, { x: x + pad, y: y + h - pad - probe.h, maxW: w - pad * 2 }).svg
  }

  // A: voice
  {
    const [x, y, w, h] = [0, 0, 516, rows[0]]
    b += cellBase(x, y, w, h) + title('Voice and speech AI', x, y)
    b += desc('Real-time voice agents over WebRTC, streaming transcription with speaker diarization, and phoneme coverage analysis for Bangla TTS.', x, y, 270)
    b += chips([['WebRTC'], ['Whisper'], ['Soniox'], ['NeMo'], ['Silero VAD'], ['eSpeak']], x, y, w, h)
    const hs = [26, 58, 40, 92, 64, 112, 76, 46, 98, 70, 36, 60]
    css += `.wv{transform-origin:50% 50%}@keyframes wv{from{transform:scaleY(.35)}to{transform:scaleY(1)}}`
    hs.forEach((hh, i) => {
      css += `.w${i}{animation:wv ${r1(1.2 + ((i * 5) % 7) * 0.2)}s cubic-bezier(.45,.05,.55,.95) ${r1(-i * 0.31)}s infinite alternate}`
      b += `<rect class="wv w${i}" x="${w - 36 - hs.length * 11.5 + i * 11.5}" y="${86 - hh / 2 + 60}" width="5" height="${hh}" rx="2.5" fill="${i % 3 === 1 ? C.amber : GREY}"/>`
    })
  }
  // B: LLMs (accent cell)
  {
    const [x, y, w, h] = [528, 0, 312, rows[0]]
    b += cellBase(x, y, w, h, { accent: true }) + title('LLMs and RAG', x, y)
    b += text('70%', { x: x + pad - 3, y: y + 142, size: 80, w: 600, track: -0.05, fill: C.amber })
    b += para('lower cost-per-token than the Gemini API, using Gemma 3 fine-tuned with QLoRA and quantized to GGUF.', { x: x + pad, y: y + 170, size: 14, fill: C.mute, maxW: w - pad * 2, lh: 20 }).svg
    b += chipRow([['Qdrant', 'qdrant'], ['Hugging Face', 'huggingface']], { x: x + pad, y: y + h - pad - 26, maxW: w - pad * 2 }).svg
  }
  // C: cloud
  {
    const [x, y, w, h] = [0, y1, 360, rows[1]]
    b += cellBase(x, y, w, h) + title('Cloud and real-time', x, y)
    b += desc('Services on OpenShift, AWS and GCP. Nginx tuned to remove stutter from live TTS streaming.', x, y, w - pad * 2)
    b += chips([['Kubernetes', 'k8s'], ['OpenShift', 'openshift'], ['Docker', 'docker'], ['n8n', 'n8n']], x, y, w, h)
    // packets travelling between three nodes
    const nx = [w - 28 - 64, w - 28 - 32, w - 28]
    const ny = y + 36
    b += `<path d="M${nx[0]} ${ny} H${nx[2]}" stroke="${C.line2}" stroke-width="1.5"/>`
    nx.forEach((cx) => (b += `<rect x="${cx - 8}" y="${ny - 8}" width="16" height="16" rx="5" fill="${C.panel2}" stroke="${C.line2}"/>`))
    css += `@keyframes pk{0%{transform:translateX(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(var(--d));opacity:0}}.pk{animation:pk 2.2s linear infinite}`
    b += `<circle class="pk" style="--d:32px" cx="${nx[0] + 8}" cy="${ny}" r="3" fill="${C.amber}"/>`
    b += `<circle class="pk" style="--d:32px;animation-delay:-1.1s" cx="${nx[1] + 8}" cy="${ny}" r="3" fill="${C.amber}"/>`
  }
  // D: blockchain
  {
    const [x, y, w, h] = [372, y1, 468, rows[1]]
    b += cellBase(x, y, w, h) + title('Verifiable trust systems', x, y)
    b += desc('SHUTRA notarizes every trade workflow event on a Hyperledger Fabric ledger and publishes a verifiable product passport.', x, y, 250)
    b += chips([['Hyperledger Fabric'], ['Go', 'go'], ['Fastify', 'fastify'], ['PostgreSQL', 'postgres']], x, y, w, h)
    const bx0 = x + w - pad - (4 * 32 + 3 * 12)
    const by = y + 98
    for (let i = 0; i < 4; i++) {
      const bx = bx0 + i * 44
      const a = i * 0.9
      css += kf(`bk${i}`, 4, [[0, `stroke:${C.line2};fill:${C.panel2}`], [a, `stroke:${C.line2};fill:${C.panel2}`], [a + 0.3, `stroke:${C.amber};fill:rgba(240,165,58,.14)`], [a + 1, `stroke:${C.amber};fill:rgba(240,165,58,.14)`], [a + 1.4, `stroke:${C.line2};fill:${C.panel2}`], [4, `stroke:${C.line2};fill:${C.panel2}`]])
      css += `.bk${i}{animation:bk${i} 4s linear infinite}`
      if (i) b += `<path d="M${bx - 12} ${by + 20} H${bx}" stroke="${C.line2}" stroke-width="1.5"/>`
      b += `<rect class="bk${i}" x="${bx}" y="${by}" width="32" height="40" rx="8" fill="${C.panel2}" stroke="${C.line2}" stroke-width="1.2"/>`
      b += `<path d="M${bx + 8} ${by + 14} H${bx + 24} M${bx + 8} ${by + 21} H${bx + 20} M${bx + 8} ${by + 28} H${bx + 22}" stroke="${C.dim}" stroke-width="1.5" stroke-linecap="round"/>`
    }
  }
  // E: full-stack + embedded
  {
    const [x, y, w, h] = [0, y2, 840, rows[2]]
    b += cellBase(x, y, w, h) + title('Full-stack, mobile and embedded', x, y)
    b += desc('Next.js and React Native apps on FastAPI backends. RoboLink drives Arduino and ESP32 hardware, and CircuitLM designs circuits with LLMs.', x, y, 410, 82)
    b += chipRow([['TypeScript', 'typescript'], ['Next.js', 'nextjs'], ['FastAPI', 'fastapi'], ['Arduino', 'arduino'], ['ESP32', 'espressif']], { x: x + pad, y: y + h - pad - 26, maxW: 560 }).svg
    // circuit: IC with traces, current pulses
    const cx = 648
    const cy = y + h / 2
    const traces = [
      `M${cx - 28} ${cy - 14} H${cx - 80} V${cy - 36} H${cx - 150}`,
      `M${cx - 28} ${cy} H${cx - 170}`,
      `M${cx - 28} ${cy + 14} H${cx - 80} V${cy + 36} H${cx - 140}`,
      `M${cx + 28} ${cy - 14} H${cx + 80} V${cy - 36} H${cx + 130}`,
      `M${cx + 28} ${cy} H${cx + 150}`,
      `M${cx + 28} ${cy + 14} H${cx + 70} V${cy + 36} H${cx + 120}`,
    ]
    css += `@keyframes cp{to{stroke-dashoffset:-64}}.cp{stroke-dasharray:8 24;animation:cp 1.6s linear infinite}`
    traces.forEach((d, i) => {
      b += `<path d="${d}" fill="none" stroke="${C.line2}" stroke-width="1.5" stroke-linejoin="round"/>`
      b += `<path class="cp" style="animation-delay:${r1(-i * 0.4)}s" d="${d}" fill="none" stroke="${C.amber}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>`
    })
    b += `<rect x="${cx - 28}" y="${cy - 28}" width="56" height="56" rx="10" fill="${C.panel2}" stroke="${C.amber}" stroke-opacity=".6"/>`
    b += text('MCU', { x: cx, y: cy + 4, size: 11, mono: true, w: 500, track: 0.1, fill: C.amber, anchor: 'middle' })
  }
  write('bento.svg', svg(W, H, 'What I build: voice and speech AI, LLMs and RAG, cloud and real-time systems, verifiable trust systems, full-stack mobile and embedded.', b, css))
}

// ============================== PROJECT CARDS ==============================
const CW = 414
const CH = 272
const PROJECTS = [
  { f: 'p-shutra.svg', name: 'SHUTRA', date: 'Sep 2026', desc: 'Trade-integrity platform for Bangladesh RMG exports. Notarizes every workflow event on a Hyperledger Fabric ledger and publishes a verifiable product passport.', tech: ['Hyperledger Fabric', 'Go', 'Fastify', 'PostgreSQL', 'React', 'TypeScript', 'Zod'] },
  { f: 'p-climbarta.svg', name: 'ClimBarta', date: 'Dec 2025', award: '1st Runner-Up, Oxfam', link: true, desc: 'Real-time audio transcription and data extraction designed for communities affected by disasters in Bangladesh.', tech: ['NeMo Conformer', 'Silero VAD', 'Soketi', 'NextJS', 'FastAPI', 'Hugging Face'] },
  { f: 'p-circuitlm.svg', name: 'CircuitLM', date: 'Aug 2025', award: 'IEEE ICLAD 2026', desc: 'Multi-agent LLM framework that turns natural language prompts into verified circuit schematics.', tech: ['Wokwi', 'OpenRouter', 'Replicate', 'ChromaDB', 'NextJS'] },
  { f: 'p-robolink.svg', name: 'RoboLink', date: 'Aug 2025', award: '2nd Runner-Up, AutoMech', desc: 'Robot control ecosystem: build custom control interfaces, generate Arduino and ESP32 code, and connect to hardware in real time.', tech: ['NextJS', 'React Native', 'Soniox STT', 'OpenRouter', 'MongoDB'] },
  { f: 'p-llmwiki.svg', name: 'Discord LLMWiki', date: 'May 2026', link: true, desc: 'Memory-augmented Discord community manager that builds a self-maintaining wiki from server conversations and handles onboarding and FAQs.', tech: ['Mem0', 'Qdrant', 'Google Gemini', 'discord.py', 'SQLite', 'Docker'] },
  { f: 'p-silentvoice.svg', name: 'Silent Voice', date: 'Jun - Aug 2024', link: true, desc: 'Translates American Sign Language into text and speech in real time, with a built-in ASL dictionary.', tech: ['NextJS', 'FastAPI', 'Teachable Machine'] },
]
function projectCards() {
  const pad = 26
  PROJECTS.forEach((p, idx) => {
    const aw = CW + 6 // 6px gutter on the inner side so inline pairs read as a grid with flush outer edges
    const ox = idx % 2 ? 6 : 0
    let b = panel(0.5, 0.5, CW - 1, CH - 1)
    b += text(p.name, { x: pad, y: 52, size: 24, w: 600, track: -0.03 })
    if (p.link) b += arrowCircle(CW - pad - 14, 40, 14)
    b += text(p.date, { x: pad, y: 78, size: 12, mono: true, fill: C.dim })
    if (p.award) {
      const o = { size: 11.5, mono: true, w: 500 }
      const pw = tw(p.award, o) + 24
      b += `<rect x="${r1(CW - pad - pw)}" y="64" width="${r1(pw)}" height="22" rx="11" fill="${C.amber}" fill-opacity=".1" stroke="${C.amber}" stroke-opacity=".4"/>`
      b += text(p.award, { ...o, x: CW - pad - pw + 12, y: 79, fill: C.amber })
    }
    b += para(p.desc, { x: pad, y: 114, size: 14.5, fill: C.mute, maxW: CW - pad * 2, lh: 22 }).svg
    b += chipRow(p.tech.map((t) => [t]), { x: pad, y: 198, maxW: CW - pad * 2, size: 11.5, h: 24 }).svg
    write(p.f, svg(aw, CH, `${p.name}, ${p.date}. ${p.desc}`, `<g transform="translate(${ox} 0)">${b}</g>`))
  })
}

// ============================== RESEARCH ==============================
function research() {
  const pad = 28
  const H = 308
  const papers = [
    { f: 'r-circuitlm.svg', year: '2026', title: 'CircuitLM: A Multi-Agent LLM-Aided Design Framework for Generating Circuit Schematics from Natural Language Prompts', big: '100', cap: 'embedded-system designs evaluated across six LLMs with a dual-metric validation framework', venue: '2026 IEEE International Conference on LLM-Aided Design (ICLAD)' },
    { f: 'r-coatnet.svg', year: '2026', title: 'Evaluating CoAtNet for Multiclass Lung Cancer Classification on CT Images: A Benchmark Study on the IQ-OTH/NCCD Dataset', big: '98.17%', cap: 'accuracy and 97.12% F1 across benign, malignant and normal cases', venue: 'IEEE 15th International Conference on Communication Systems and Network Technologies' },
  ]
  papers.forEach((p, idx) => {
    const ox = idx % 2 ? 6 : 0
    let b = panel(0.5, 0.5, CW - 1, H - 1)
    const o = { size: 11, mono: true, w: 500, track: 0.14 }
    const pw = tw('IEEE', o) + 24
    b += `<rect x="${pad}" y="26" width="${r1(pw)}" height="22" rx="11" fill="${C.amber}" fill-opacity=".1" stroke="${C.amber}" stroke-opacity=".4"/>` + text('IEEE', { ...o, x: pad + 12, y: 41, fill: C.amber })
    b += text(p.year, { x: CW - pad, y: 41, size: 12, mono: true, fill: C.dim, anchor: 'end' })
    const t = para(p.title, { x: pad, y: 82, size: 16.5, w: 600, maxW: CW - pad * 2, lh: 23, track: -0.015 })
    b += t.svg
    const sy = 82 + t.h + 38
    b += text(p.big, { x: pad - 2, y: sy, size: 40, w: 600, track: -0.045, fill: C.amber })
    const bw = tw(p.big, { size: 40, w: 600, track: -0.045 })
    b += para(p.cap, { x: pad + bw + 14, y: sy - 18, size: 13, fill: C.mute, maxW: CW - pad * 2 - bw - 14, lh: 18 }).svg
    b += para(p.venue, { x: pad, y: H - 44, size: 11.5, mono: true, fill: C.dim, maxW: CW - pad * 2, lh: 17 }).svg
    write(p.f, svg(CW + 6, H, p.title, `<g transform="translate(${ox} 0)">${b}</g>`))
  })
}

// ============================== TIMELINE ==============================
function timeline() {
  const H = 446
  const x0 = 48
  const x1 = 792
  const px = (m) => x0 + (m / 49) * (x1 - x0) // months since Aug 2022
  let css = ''
  let b = panel(0.5, 0.5, W - 1, H - 1, { r: 24 })

  for (let yr = 2022; yr <= 2026; yr++) {
    const m = (yr - 2022) * 12 - 8
    const x = yr === 2022 ? x0 : px(Math.max(0, m))
    b += text(String(yr), { x, y: 40, size: 11, mono: true, fill: C.dim })
  }
  // education
  b += `<rect x="${x0}" y="54" width="${x1 - x0}" height="34" rx="12" fill="${C.panel2}" stroke="${C.line2}"/>`
  b += text('B.Sc. Software Engineering, Islamic University of Technology', { x: x0 + 16, y: 76, size: 13.5, w: 500, fill: C.text })
  // work
  const bar = (m0, m1, y, label) => {
    const xa = px(m0)
    const xb = px(m1)
    let s = `<rect x="${r1(xa)}" y="${y}" width="${r1(xb - xa)}" height="30" rx="10" fill="${C.amber}" fill-opacity=".14" stroke="${C.amber}" stroke-opacity=".55"/>`
    s += text(label, { x: xa - 12, y: y + 20, size: 13.5, w: 500, fill: C.mute, anchor: 'end' })
    return s
  }
  b += bar(33, 37, 100, 'AI Intern, Orange Business Development')
  b += bar(38, 42, 138, 'Associate Software Engineer, Vivasoft')

  // recognition signal
  const ev = [
    { d: 'Jun - Sep 2024', t: 'Honorable Mention', s: 'Blockchain Olympiad Bangladesh, AI category. Nominated internationally.' },
    { d: 'Feb - Mar 2025', t: 'Top 8 of 100+', s: 'Youth Startup Summit, as Team Agronova.' },
    { d: 'Aug 2025', t: '2nd Runner-Up', s: 'IUT AutoMech Hackathon, as Team Robolink.' },
    { d: 'Dec 2025', t: '1st Runner-Up', s: 'Oxfam AI Meets Climate Action, with ClimBarta.' },
    { d: 'Aug - Sep 2026', t: 'Top 5 Finalist', s: 'Blockchain Olympiad Bangladesh, blockchain category. Nominated internationally.' },
  ]
  const by = 236
  const col = (x1 - x0) / 5
  const T = 9
  b += `<path d="M${x0} ${by} H${x1}" stroke="${C.line2}" stroke-width="1.5"/>`
  ev.forEach((e, i) => {
    const cx = x0 + col * i + col / 2 - 6
    const a = ((cx - x0) / (x1 - x0)) * (T - 1)
    css += kf(`ev${i}`, T, [[0, `stroke:${GREY}`], [a, `stroke:${GREY}`], [a + 0.25, `stroke:${C.amber}`], [a + 2.6, `stroke:${C.amber}`], [a + 3.4, `stroke:${GREY}`], [T, `stroke:${GREY}`]])
    css += `.ev${i}{animation:ev${i} ${T}s linear infinite}`
    b += `<path class="ev${i}" d="M${r1(cx - 18)} ${by} ${pulse(cx, by, 34, 22)} H${r1(cx + 20)}" fill="none" stroke="${GREY}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`
    const lx = x0 + col * i
    b += text(e.d, { x: lx, y: 300, size: 11, mono: true, fill: C.amber })
    b += text(e.t, { x: lx, y: 324, size: 15, w: 600, track: -0.02 })
    b += para(e.s, { x: lx, y: 346, size: 12.5, fill: C.mute, maxW: col - 14, lh: 17 }).svg
  })
  css += kf('cur', T, [[0, 'transform:translateX(0);opacity:0'], [0.4, 'opacity:.9'], [T - 1.4, 'opacity:.9'], [T - 1, `transform:translateX(${x1 - x0}px);opacity:0`], [T, 'transform:translateX(0);opacity:0']]) + `.cur{animation:cur ${T}s linear infinite}`
  b += `<rect class="cur" x="${x0}" y="${by - 44}" width="1.5" height="88" fill="${C.amber}"/>`
  write('timeline.svg', svg(W, H, 'Timeline: B.Sc. in Software Engineering at IUT, an AI internship at Orange Business Development, an associate software engineer role at Vivasoft, and five competition results from 2024 to 2026.', b, css))
}

// ============================== STACK MARQUEE ==============================
function stack() {
  const H = 96
  const items = [
    ['Python', 'python'], ['TypeScript', 'typescript'], ['Go', 'go'], ['C++', 'cpp'], ['Java', 'java'], ['Rust', 'rust'],
    ['PyTorch', 'pytorch'], ['Hugging Face', 'huggingface'], ['Ollama', 'ollama'], ['LangChain', 'langchain'], ['Gemini', 'gemini'], ['Qdrant', 'qdrant'],
    ['FastAPI', 'fastapi'], ['Next.js', 'nextjs'], ['React', 'react'], ['Node.js', 'nodejs'], ['Fastify', 'fastify'],
    ['PostgreSQL', 'postgres'], ['MongoDB', 'mongodb'], ['SQLite', 'sqlite'],
    ['Docker', 'docker'], ['Kubernetes', 'k8s'], ['OpenShift', 'openshift'], ['AWS', 'aws'], ['Google Cloud', 'gcp'], ['Nginx', 'nginx'], ['n8n', 'n8n'],
    ['Arduino', 'arduino'], ['ESP32', 'espressif'], ['Flutter', 'flutter'], ['Swift', 'swift'], ['Figma', 'figma'], ['Git', 'git'], ['Linux', 'linux'],
  ]
  let x = 0
  let row = ''
  for (const [label, ic] of items) {
    const c = chip(label, { x, y: 28, ic, h: 40, size: 14 })
    row += c.svg
    x += c.w + 10
  }
  const total = x
  const dur = Math.round(total / 38)
  const css = `@keyframes mq{to{transform:translateX(-${r1(total)}px)}}.mq{animation:mq ${dur}s linear infinite}`
  let b = `<defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".08" stop-color="#fff"/><stop offset=".92" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="m"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask></defs>`
  b += panel(0.5, 0.5, W - 1, H - 1)
  b += `<g mask="url(#m)"><g class="mq">${row}<g transform="translate(${r1(total)} 0)">${row}</g></g></g>`
  write('stack.svg', svg(W, H, 'Toolbox: Python, TypeScript, Go, PyTorch, Hugging Face, Qdrant, FastAPI, Next.js, PostgreSQL, Docker, Kubernetes, OpenShift, AWS, Arduino and more.', b, css))
}

// ============================== FOOTER ==============================
function footer() {
  const H = 176
  let css = ''
  let b = `<defs><radialGradient id="g2" cx=".9" cy="1" r=".8"><stop offset="0" stop-color="${C.amber}" stop-opacity=".13"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient></defs>`
  b += panel(0.5, 0.5, W - 1, H - 1, { r: 24, fill: C.bg })
  b += `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="23" fill="url(#g2)"/>`
  b += text('Building with voice, LLMs or', { x: 48, y: 74, size: 30, w: 600, track: -0.035 })
  b += text('verifiable systems?', { x: 48, y: 112, size: 30, w: 600, track: -0.035 })
  b += text("I'd like to hear about it.", { x: 48, y: 146, size: 16, fill: C.mute })
  const y = 88
  const x0 = 480
  b += `<path d="M${x0} ${y} H792" stroke="${C.line2}" stroke-width="1.5"/>`
  const p = `M${x0} ${y} H${x0 + 70} ${pulse(x0 + 110, y, 40, 26)} H${x0 + 190} ${pulse(x0 + 232, y, 24, 16)} H792`
  css += `@keyframes ecg{from{stroke-dashoffset:0}to{stroke-dashoffset:-480}}.ecg{stroke-dasharray:96 384;animation:ecg 3.2s linear infinite}`
  b += `<path d="${p}" fill="none" stroke="${C.dim}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`
  b += `<path class="ecg" pathLength="480" d="${p}" fill="none" stroke="${C.amber}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`
  write('footer.svg', svg(W, H, 'Building with voice, LLMs or verifiable systems? I would like to hear about it.', b, css))
}

hero()
pillLink('link-email.svg', 'Email me', 'gmail', true)
pillLink('link-linkedin.svg', 'LinkedIn', 'in', false)
pillLink('link-kaggle.svg', 'Kaggle', 'K', false)
head('h-build.svg', 'What I build', 'Voice, language models and verifiable systems, from raw audio to deployed services.')
bento()
head('h-work.svg', 'Selected work', 'Hackathon wins, research prototypes and open source. Cards with an arrow link to the public repo.')
projectCards()
head('h-research.svg', 'Research', 'Two IEEE conference papers from 2026.')
research()
head('h-path.svg', 'Trajectory', 'Study, internships and recognition on one signal. Each pulse is a result.')
timeline()
head('h-stack.svg', 'Toolbox', 'Languages, frameworks and infrastructure I reach for.')
stack()
head('h-activity.svg', 'Activity', 'My contribution graph, played back by a snake.')
footer()
