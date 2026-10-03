// Shared primitives for the profile SVG generator.
// All text is outlined to paths (Geist) so typography is identical on every device:
// SVGs loaded through <img> on GitHub cannot fetch web fonts.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import * as si from 'simple-icons'

const HERE = path.dirname(fileURLToPath(import.meta.url))
export const OUT = path.join(HERE, '..', 'assets')

// One palette, one accent. Never introduce a second hue.
export const C = {
  bg: '#0B0C0E',
  panel: '#111316',
  panel2: '#16191D',
  line: '#22262C',
  line2: '#2E333B',
  text: '#ECEDEF',
  mute: '#9AA1AB',
  dim: '#5E6570',
  amber: '#F0A53A',
}

export const r1 = (n) => Math.round(n * 10) / 10
export const r2 = (n) => Math.round(n * 100) / 100
export const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ---------- fonts ----------
const load = (p) => {
  const b = fs.readFileSync(path.join(HERE, 'node_modules/@fontsource', p))
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength))
}
const FONTS = {
  sans: Object.fromEntries([400, 500, 600, 700].map((w) => [w, load(`geist-sans/files/geist-sans-latin-${w}-normal.woff`)])),
  mono: Object.fromEntries([400, 500].map((w) => [w, load(`geist-mono/files/geist-mono-latin-${w}-normal.woff`)])),
}

function run(font, str, size, track) {
  const s = size / font.unitsPerEm
  const prec = size < 20 ? 2 : 1
  let x = 0
  let d = ''
  let prev = null
  for (const ch of str) {
    const g = font.charToGlyph(ch)
    if (prev) x += font.getKerningValue(prev, g) * s
    if (ch !== ' ') d += g.getPath(x, 0, size).toPathData(prec)
    x += g.advanceWidth * s + track * size
    prev = g
  }
  return { d, width: x - track * size }
}

const fontOf = (o) => (o.mono ? FONTS.mono : FONTS.sans)[o.w ?? 400]

export function tw(str, o = {}) {
  return run(fontOf(o), str, o.size ?? 16, o.track ?? 0).width
}

export function text(str, o = {}) {
  const { x = 0, y = 0, size = 16, fill = C.text, track = 0, anchor = 'start', op, cls, style } = o
  const { d, width } = run(fontOf(o), str, size, track)
  if (!d) return ''
  const dx = anchor === 'middle' ? -width / 2 : anchor === 'end' ? -width : 0
  return `<path${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''} transform="translate(${r1(x + dx)} ${r1(y)})" d="${d}" fill="${fill}"${op != null ? ` opacity="${op}"` : ''}/>`
}

export function wrap(str, maxW, o = {}) {
  const lines = []
  let cur = ''
  for (const word of str.split(' ')) {
    const t = cur ? `${cur} ${word}` : word
    if (!cur || tw(t, o) <= maxW) cur = t
    else {
      lines.push(cur)
      cur = word
    }
  }
  if (cur) lines.push(cur)
  return lines
}

export function para(str, { x, y, maxW, lh, ...o }) {
  const lines = wrap(str, maxW, o)
  return { svg: lines.map((l, i) => text(l, { ...o, x, y: y + i * lh })).join(''), lines, h: lines.length * lh }
}

// ---------- icons ----------
const ICONS = {
  python: 'dev:python-plain', cpp: 'dev:cplusplus-plain', java: 'dev:java-plain', csharp: 'dev:csharp-plain',
  go: 'dev:go-plain', rust: 'dev:rust-plain', typescript: 'dev:typescript-plain', react: 'dev:react-original',
  nextjs: 'dev:nextjs-line', nodejs: 'dev:nodejs-plain', fastapi: 'dev:fastapi-plain', postgres: 'dev:postgresql-plain',
  mongodb: 'dev:mongodb-plain', sqlite: 'dev:sqlite-plain', docker: 'dev:docker-plain', k8s: 'dev:kubernetes-plain',
  nginx: 'dev:nginx-original', git: 'dev:git-plain', linux: 'dev:linux-plain', figma: 'dev:figma-plain',
  swift: 'dev:swift-plain', flutter: 'dev:flutter-plain', arduino: 'dev:arduino-plain', pytorch: 'dev:pytorch-original',
  gcp: 'dev:googlecloud-plain', aws: 'dev:amazonwebservices-original', svelte: 'dev:svelte-plain',
  huggingface: 'si:siHuggingface', qdrant: 'si:siQdrant', openshift: 'si:siRedhatopenshift', fastify: 'si:siFastify',
  n8n: 'si:siN8n', ollama: 'si:siOllama', espressif: 'si:siEspressif', gemini: 'si:siGooglegemini',
  discord: 'si:siDiscord', kaggle: 'si:siKaggle', gmail: 'si:siGmail', zod: 'si:siZod', langchain: 'si:siLangchain',
}

const iconCache = new Map()
function iconDef(key) {
  if (iconCache.has(key)) return iconCache.get(key)
  const ref = ICONS[key]
  if (!ref) throw new Error(`unknown icon: ${key}`)
  const [kind, name] = ref.split(':')
  let def
  if (kind === 'dev') {
    const raw = fs.readFileSync(path.join(HERE, 'icons', `${name}.svg`), 'utf8')
    const inner = raw
      .replace(/^[\s\S]*?<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
      .replace(/\s(fill|id|class)="[^"]*"/g, '')
    def = { inner, vb: 128 }
  } else {
    if (!si[name]) throw new Error(`unknown simple-icon: ${name}`)
    def = { inner: `<path d="${si[name].path}"/>`, vb: 24 }
  }
  iconCache.set(key, def)
  return def
}

// Every icon is flattened to one tint: a single-hue system reads as deliberate.
export function icon(key, x, y, size, fill = C.mute) {
  const { inner, vb } = iconDef(key)
  return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${r2(size / vb)})" fill="${fill}">${inner}</g>`
}

// ---------- ui primitives ----------
let hiId = 0
export function panel(x, y, w, h, { r = 20, fill = C.panel, stroke = C.line, extra = '' } = {}) {
  const id = `hi${hiId++}`
  return (
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".08"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"${extra}/>` +
    `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="${r - 0.5}" fill="none" stroke="url(#${id})"/>`
  )
}

export function chip(label, { x = 0, y = 0, ic, h = 26, size = 12.5, color = C.mute } = {}) {
  const pad = 11
  const isz = 14
  const lw = tw(label, { size, mono: true })
  const w = pad * 2 + lw + (ic ? isz + 7 : 0)
  let s = `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${h}" rx="${h / 2}" fill="${C.panel2}" stroke="${C.line2}"/>`
  let cx = x + pad
  if (ic) {
    s += icon(ic, cx, y + (h - isz) / 2, isz, color)
    cx += isz + 7
  }
  s += text(label, { x: cx, y: y + h / 2 + size * 0.355, size, mono: true, fill: color })
  return { svg: s, w }
}

// items: [label, iconKey?]; flows onto rows within maxW
export function chipRow(items, { x, y, maxW, gap = 6, h = 26, size = 12.5 }) {
  let cx = x
  let cy = y
  let svg = ''
  for (const [label, ic] of items) {
    const c = chip(label, { x: cx, y: cy, ic, h, size })
    if (cx > x && cx - x + c.w > maxW) {
      cx = x
      cy += h + gap
      svg += chip(label, { x: cx, y: cy, ic, h, size }).svg
    } else svg += c.svg
    cx += c.w + gap
  }
  return { svg, rows: Math.round((cy - y) / (h + gap)) + 1, h: cy - y + h }
}

export function arrowCircle(cx, cy, r = 14, fill = C.panel2, stroke = C.line2, ink = C.amber) {
  const k = r * 0.28
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}"/>` +
    `<path d="M${r1(cx - k)} ${r1(cy + k)} L${r1(cx + k)} ${r1(cy - k)} M${r1(cx - k * 0.9)} ${r1(cy - k)} H${r1(cx + k)} V${r1(cy + k * 0.9)}" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`
  )
}

// ---------- animation helpers ----------
// Absolute keyframes: stops are [seconds, css, easing?] inside a loop of T seconds.
export function kf(name, T, stops) {
  return `@keyframes ${name}{${stops
    .map(([t, p, e]) => `${r2((t / T) * 100)}%{${p};${e ? `animation-timing-function:${e};` : ''}}`)
    .join('')}}`
}
export const EASE_OUT = 'cubic-bezier(.23,1,.32,1)'
export const EASE_IO = 'cubic-bezier(.77,0,.175,1)'

const BASE_CSS = `[class]{transform-box:fill-box}@media (prefers-reduced-motion:reduce){*{animation:none!important}}`

export function svg(w, h, title, body, css = '') {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">` +
    `<title>${esc(title)}</title><style>${BASE_CSS}${css}</style>${body}</svg>\n`
  )
}

export function write(name, content) {
  fs.mkdirSync(OUT, { recursive: true })
  fs.writeFileSync(path.join(OUT, name), content)
  console.log(`${name.padEnd(22)} ${(content.length / 1024).toFixed(1)} KB`)
}

// ECG-style pulse segment (relative to x, baseline y)
export function pulse(x, y, up, down) {
  return `L${r1(x - 14)} ${y} L${r1(x - 9)} ${r1(y - up * 0.2)} L${r1(x - 5)} ${y} L${r1(x - 3)} ${r1(y + down * 0.25)} L${r1(x)} ${r1(y - up)} L${r1(x + 3)} ${r1(y + down)} L${r1(x + 6)} ${y} L${r1(x + 10)} ${r1(y - up * 0.15)} L${r1(x + 15)} ${y}`
}
