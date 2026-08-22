import { gsap } from '../utils/gsap'

export const themes = {
  cyberpunk: {
    id: 'cyberpunk',
    name: '赛博朋克',
    icon: '⚡',
    desc: '霓虹电光 · 未来都市',
    swatch: ['#00f0ff', '#7000ff'],
    '--bg-deep': '#040712',
    '--bg-card': 'rgba(20, 25, 40, 0.4)',
    '--bg-card-hover': 'rgba(30, 35, 60, 0.5)',
    '--primary': '#00f0ff',
    '--secondary': '#7000ff',
    '--text-main': '#ffffff',
    '--text-muted': 'rgba(255, 255, 255, 0.6)',
    '--border-light': 'rgba(255, 255, 255, 0.08)',
    '--border-hover': 'rgba(0, 240, 255, 0.3)',
    '--accent-glow': 'rgba(0, 240, 255, 0.15)',
    '--success': '#00ff88',
    '--warning': '#ffaa00',
    '--danger': '#ff0055',
    '--bg-gradient': 'linear-gradient(135deg, #050510 0%, #0a0a2e 100%)',
    '--card-bg': 'rgba(20, 25, 40, 0.6)',
    '--font-display': "'Syncopate', sans-serif",
    '--font-body': "'Space Grotesk', sans-serif",
    '--scrollbar-track': '#050510',
    '--scrollbar-thumb': 'rgba(255, 255, 255, 0.2)',
    '--scrollbar-thumb-hover': '#00f0ff',
    '--nav-bg': 'rgba(5, 5, 16, 0.6)',
    '--input-bg': 'rgba(20, 30, 50, 0.6)',
    '--modal-overlay': 'rgba(0, 5, 10, 0.8)',
    '--code-bg': 'rgba(0, 0, 0, 0.6)',
    '--chip-bg': 'rgba(0, 240, 255, 0.1)',
    '--chip-border': 'rgba(0, 240, 255, 0.3)',
    '--hero-gradient': 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.08), transparent 70%)'
  },
  abyss: {
    id: 'abyss',
    name: '深渊',
    icon: '🌑',
    desc: '幽紫深邃 · 静谧之境',
    swatch: ['#c084fc', '#818cf8'],
    '--bg-deep': '#0f0f1a',
    '--bg-card': 'rgba(30, 30, 50, 0.4)',
    '--bg-card-hover': 'rgba(45, 45, 70, 0.5)',
    '--primary': '#c084fc',
    '--secondary': '#818cf8',
    '--text-main': '#e2e8f0',
    '--text-muted': 'rgba(226, 232, 240, 0.55)',
    '--border-light': 'rgba(255, 255, 255, 0.08)',
    '--border-hover': 'rgba(192, 132, 252, 0.4)',
    '--accent-glow': 'rgba(192, 132, 252, 0.15)',
    '--success': '#4ade80',
    '--warning': '#fbbf24',
    '--danger': '#f87171',
    '--bg-gradient': 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
    '--card-bg': 'rgba(30, 30, 50, 0.6)',
    '--font-display': "'Space Grotesk', sans-serif",
    '--font-body': "'Space Grotesk', sans-serif",
    '--scrollbar-track': '#0f0f1a',
    '--scrollbar-thumb': 'rgba(255, 255, 255, 0.15)',
    '--scrollbar-thumb-hover': '#c084fc',
    '--nav-bg': 'rgba(15, 15, 26, 0.7)',
    '--input-bg': 'rgba(30, 30, 50, 0.6)',
    '--modal-overlay': 'rgba(0, 0, 0, 0.8)',
    '--code-bg': 'rgba(0, 0, 0, 0.5)',
    '--chip-bg': 'rgba(192, 132, 252, 0.1)',
    '--chip-border': 'rgba(192, 132, 252, 0.3)',
    '--hero-gradient': 'radial-gradient(ellipse at center, rgba(192, 132, 252, 0.08), transparent 70%)'
  },
  terminal: {
    id: 'terminal',
    name: '复古终端',
    icon: '⌨️',
    desc: 'CRT荧光 · 极客之魂',
    swatch: ['#33ff33', '#00aa00'],
    '--bg-deep': '#0c0c0c',
    '--bg-card': 'rgba(20, 40, 20, 0.5)',
    '--bg-card-hover': 'rgba(30, 60, 30, 0.6)',
    '--primary': '#33ff33',
    '--secondary': '#00aa00',
    '--text-main': '#33ff33',
    '--text-muted': 'rgba(51, 255, 51, 0.5)',
    '--border-light': 'rgba(51, 255, 51, 0.15)',
    '--border-hover': 'rgba(51, 255, 51, 0.5)',
    '--accent-glow': 'rgba(51, 255, 51, 0.15)',
    '--success': '#33ff33',
    '--warning': '#ffcc00',
    '--danger': '#ff3333',
    '--bg-gradient': 'linear-gradient(135deg, #0c0c0c 0%, #001100 100%)',
    '--card-bg': 'rgba(20, 40, 20, 0.7)',
    '--font-display': "'Courier New', monospace",
    '--font-body': "'Courier New', monospace",
    '--scrollbar-track': '#0c0c0c',
    '--scrollbar-thumb': 'rgba(51, 255, 51, 0.3)',
    '--scrollbar-thumb-hover': '#33ff33',
    '--nav-bg': 'rgba(12, 12, 12, 0.9)',
    '--input-bg': 'rgba(20, 40, 20, 0.8)',
    '--modal-overlay': 'rgba(0, 0, 0, 0.9)',
    '--code-bg': 'rgba(0, 0, 0, 0.8)',
    '--chip-bg': 'rgba(51, 255, 51, 0.1)',
    '--chip-border': 'rgba(51, 255, 51, 0.3)',
    '--hero-gradient': 'radial-gradient(ellipse at center, rgba(51, 255, 51, 0.08), transparent 70%)'
  }
}

export function applyTheme(themeId) {
  const theme = themes[themeId]
  if (!theme) return

  const root = document.documentElement
  Object.keys(theme).forEach(key => {
    if (key.startsWith('--')) {
      root.style.setProperty(key, theme[key])
    }
  })

  if (typeof window !== 'undefined' && document.body) {
    gsap.fromTo(document.body,
      { opacity: 0.96 },
      { opacity: 1, duration: 0.3, ease: 'power2.out', clearProps: 'all' }
    )
  }
}

export const themeList = Object.values(themes)
