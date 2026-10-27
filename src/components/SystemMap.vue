<template>
  <figure class="system-map" aria-label="交付系统动画：需求、架构、评审、发布与反馈组成的持续循环">
    <div class="map-topline">
      <span class="map-kicker">
        <i aria-hidden="true"></i>
        Delivery loop / 01
      </span>
      <span>Shanghai / CN</span>
    </div>

    <div class="map-canvas">
      <svg class="map-blueprint" viewBox="0 0 520 460" fill="none" aria-hidden="true">
        <defs>
          <pattern id="system-map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" stroke="rgba(244, 240, 231, 0.055)" stroke-width="1" />
          </pattern>
          <marker
            id="system-map-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0 0L10 5L0 10Z" fill="#8DA8FF" />
          </marker>
        </defs>

        <rect width="520" height="460" fill="url(#system-map-grid)" />

        <g transform="rotate(-12 260 230)">
          <ellipse cx="260" cy="238" rx="194" ry="108" stroke="rgba(244, 240, 231, 0.08)" />
          <ellipse cx="260" cy="230" rx="190" ry="105" stroke="rgba(244, 240, 231, 0.28)" stroke-width="1.3" />
          <ellipse class="orbit-dashed" cx="260" cy="230" rx="158" ry="83" stroke="rgba(244, 240, 231, 0.2)" stroke-dasharray="2 8" />
          <ellipse cx="260" cy="230" rx="112" ry="55" stroke="rgba(244, 240, 231, 0.12)" stroke-dasharray="2 9" />

          <path
            class="orbit-flow"
            d="M70 230A190 105 0 1 0 450 230A190 105 0 1 0 70 230"
            stroke="#8DA8FF"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M88 250C130 296 207 319 298 309"
            stroke="#8DA8FF"
            stroke-width="2"
            stroke-linecap="round"
            marker-end="url(#system-map-arrow)"
          />

          <circle class="orbit-runner orbit-runner--a" r="2.7" fill="#8DA8FF">
            <animateMotion dur="14s" repeatCount="indefinite" path="M70 230A190 105 0 1 0 450 230A190 105 0 1 0 70 230" />
          </circle>
          <circle class="orbit-runner orbit-runner--b" r="2" fill="#E06F52">
            <animateMotion begin="-7s" dur="14s" repeatCount="indefinite" path="M70 230A190 105 0 1 0 450 230A190 105 0 1 0 70 230" />
          </circle>
        </g>

        <g stroke="rgba(244, 240, 231, 0.13)" stroke-width="1">
          <line x1="260" y1="230" x2="260" y2="106" />
          <line x1="260" y1="230" x2="414" y2="184" />
          <line x1="260" y1="230" x2="360" y2="326" />
          <line x1="260" y1="230" x2="235" y2="358" />
          <line x1="260" y1="230" x2="106" y2="245" />
        </g>

        <g>
          <circle cx="260" cy="106" r="4" fill="#8DA8FF" />
          <circle cx="414" cy="184" r="4" fill="#8DA8FF" />
          <circle cx="360" cy="326" r="4" fill="#8DA8FF" />
          <circle cx="235" cy="358" r="4" fill="#E06F52" />
          <circle cx="106" cy="245" r="4" fill="#E06F52" />
        </g>

        <g stroke="rgba(244, 240, 231, 0.2)">
          <path d="M260 94V82M254 88H266" />
          <path d="M426 184H438M432 178V190" />
          <path d="M372 326H384M378 320V332" />
          <path d="M223 358H211M217 352V364" />
          <path d="M94 245H82M88 239V251" />
        </g>
      </svg>

      <div class="map-core" aria-hidden="true">
        <span class="core-sphere"></span>
        <span class="core-ring"></span>
        <img src="/brand-x-light.svg" alt="" width="55" height="55" />
      </div>

      <div
        v-for="node in nodes"
        :key="node.key"
        class="map-node"
        :class="`map-node--${node.key}`"
      >
        <span class="node-icon">
          <svg v-if="node.key === 'intent'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
          <svg v-else-if="node.key === 'architecture'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="m8 7-4 5 4 5M16 7l4 5-4 5M13 5l-2 14" />
          </svg>
          <svg v-else-if="node.key === 'review'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M4 4h16v12H9l-5 4V4Z" />
            <path d="m9 10 2 2 4-5" />
          </svg>
          <svg v-else-if="node.key === 'ship'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M3 12h4l2-6 4 12 2-6h6" />
          </svg>
        </span>
        <span class="node-copy">
          <strong>{{ node.label }}</strong>
          <small>{{ node.detail }}</small>
        </span>
      </div>

      <div class="map-stack">
        <div v-for="node in nodes" :key="`stack-${node.key}`" class="map-stack-item">
          <span class="stack-index">{{ node.index }}</span>
          <span class="stack-dot" :class="`stack-dot--${node.tone}`" aria-hidden="true"></span>
          <div>
            <strong>{{ node.label }}</strong>
            <small>{{ node.detail }}</small>
          </div>
        </div>
      </div>
    </div>

    <figcaption class="map-footnote">
      <span>Intent → Ship → Signal</span>
      <span>8Y / 15+</span>
    </figcaption>
  </figure>
</template>

<script setup>
const nodes = [
  { key: 'intent', index: '01', label: 'Intent', detail: 'Scope · Brief', tone: 'blue' },
  { key: 'architecture', index: '02', label: 'Architecture', detail: 'Systems · Stack', tone: 'blue' },
  { key: 'review', index: '03', label: 'Review', detail: 'Quality · Verify', tone: 'blue' },
  { key: 'ship', index: '04', label: 'Ship', detail: 'Release · Deliver', tone: 'warm' },
  { key: 'signal', index: '05', label: 'Signal', detail: 'Observe · Improve', tone: 'warm' }
]
</script>

<style scoped>
.system-map {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 510px;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(244, 240, 231, 0.15);
  border-radius: 2px;
  background: #0b0a09;
  color: var(--color-ink);
}

.system-map::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 46%, rgba(141, 168, 255, 0.1), transparent 46%);
  pointer-events: none;
}

.map-topline,
.map-footnote {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.35rem;
  color: rgba(244, 240, 231, 0.64);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.map-topline {
  min-height: 48px;
  border-bottom: 1px solid rgba(244, 240, 231, 0.12);
}

.map-footnote {
  min-height: 48px;
  border-top: 1px solid rgba(244, 240, 231, 0.12);
}

.map-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: rgba(244, 240, 231, 0.84);
}

.map-kicker i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(141, 168, 255, 0.14);
  animation: signal-pulse 3.2s ease-in-out infinite;
}

.map-canvas {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 412px;
  margin: 0 1rem;
}

.map-blueprint {
  position: absolute;
  inset: 2% 0 0;
  width: 100%;
  height: 96%;
}

.orbit-dashed {
  transform-box: fill-box;
  transform-origin: center;
  animation: orbit-turn 34s linear infinite;
}

.orbit-flow {
  stroke-dasharray: 56 920;
  animation: orbit-flow 11s linear infinite;
}

.orbit-runner {
  filter: drop-shadow(0 0 5px currentColor);
}

.core-sphere {
  position: absolute;
  inset: -13px;
  border-radius: 50%;
  background: repeating-conic-gradient(from 0deg, rgba(244, 240, 231, 0.78) 0deg 5deg, transparent 5deg 15deg);
  mask: radial-gradient(circle, transparent 0 45%, #000 46% 100%);
  opacity: 0.42;
  animation: core-turn 16s linear infinite;
}

.map-core {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  border: 1px solid rgba(244, 240, 231, 0.22);
  border-radius: 50%;
  background: rgba(11, 10, 9, 0.9);
  transform: translate(-50%, -50%);
}

.map-core img {
  position: relative;
  z-index: 1;
  width: 55px;
  height: 55px;
}

.core-ring {
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(244, 240, 231, 0.1);
  border-radius: 50%;
}

.map-node {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 170px;
}

.node-icon {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(244, 240, 231, 0.2);
  border-radius: 7px;
  background: rgba(23, 21, 18, 0.84);
  color: var(--color-ink);
}

.node-icon svg {
  width: 16px;
  height: 16px;
}

.node-copy {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.node-copy strong {
  font-family: var(--font-display);
  font-size: 1.16rem;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
}

.node-copy small {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.05em;
  line-height: 1.4;
  white-space: nowrap;
}

.map-node--intent {
  top: 0.5rem;
  left: 50%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: translateX(-50%);
}

.map-node--intent .node-icon {
  order: 2;
}

.map-node--intent .node-copy {
  order: 1;
  align-items: center;
}

.map-node--intent .node-icon::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 1px;
  height: 18px;
  background: rgba(244, 240, 231, 0.16);
}

.map-node--architecture {
  top: 19%;
  right: 0;
}

.map-node--review {
  right: 4%;
  bottom: 15%;
}

.map-node--ship {
  bottom: 0.35rem;
  left: 50%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: translateX(-50%);
}

.map-node--ship .node-copy {
  align-items: center;
}

.map-node--ship .node-copy small {
  color: var(--color-warm);
}

.map-node--signal {
  top: 47%;
  left: 0;
  flex-direction: row-reverse;
  text-align: right;
}

.map-node--signal .node-copy {
  align-items: flex-end;
}

.map-node--signal .node-copy small {
  color: var(--color-warm);
}

.map-stack {
  display: none;
}

@keyframes signal-pulse {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes core-turn {
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-turn {
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-flow {
  to {
    stroke-dashoffset: -976;
  }
}

@media (max-width: 860px) {
  .system-map {
    min-height: 0;
  }

  .map-canvas {
    min-height: 0;
    margin: 0;
    padding: 1.25rem;
  }

  .map-blueprint,
  .map-core,
  .map-node {
    display: none;
  }

  .map-stack {
    display: grid;
    gap: 0;
  }

  .map-stack-item {
    position: relative;
    display: grid;
    grid-template-columns: 2rem 10px minmax(0, 1fr);
    gap: 0.7rem;
    align-items: center;
    min-height: 58px;
    border-bottom: 1px solid rgba(244, 240, 231, 0.12);
  }

  .map-stack-item:last-child {
    border-bottom: 0;
  }

  .map-stack-item::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 2.65rem;
    width: 1px;
    background: rgba(244, 240, 231, 0.12);
  }

  .stack-index {
    color: rgba(244, 240, 231, 0.58);
    font-family: var(--font-mono);
    font-size: 0.56rem;
  }

  .stack-dot {
    position: relative;
    z-index: 1;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .stack-dot--blue {
    background: var(--color-accent);
    box-shadow: 0 0 0 4px rgba(141, 168, 255, 0.13);
  }

  .stack-dot--warm {
    background: var(--color-warm);
    box-shadow: 0 0 0 4px rgba(224, 111, 82, 0.13);
  }

  .map-stack-item div {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }

  .map-stack-item strong {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 400;
  }

  .map-stack-item small {
    color: rgba(244, 240, 231, 0.64);
    font-family: var(--font-mono);
    font-size: 0.52rem;
    letter-spacing: 0.04em;
  }

  .map-footnote span:first-child {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .map-kicker i,
  .orbit-dashed,
  .orbit-flow,
  .core-sphere {
    animation: none;
  }

  .orbit-runner {
    display: none;
  }
}
</style>