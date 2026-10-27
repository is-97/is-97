<template>
  <figure class="system-map" aria-label="交付系统示意图：从需求、架构、数据信号到验证交付">
    <div class="map-topline">
      <span class="map-kicker">
        <i aria-hidden="true"></i>
        System map / 01
      </span>
      <span>Shanghai / CN</span>
    </div>

    <div class="map-canvas">
      <svg class="map-blueprint" viewBox="0 0 520 460" fill="none" aria-hidden="true">
        <defs>
          <pattern id="system-map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" stroke="rgba(243, 240, 232, 0.055)" stroke-width="1" />
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
            <path d="M0 0L10 5L0 10Z" fill="#214DFF" />
          </marker>
        </defs>

        <rect width="520" height="460" fill="url(#system-map-grid)" />
        <circle cx="260" cy="230" r="92" stroke="rgba(243, 240, 232, 0.1)" stroke-dasharray="2 9" />
        <circle cx="260" cy="230" r="134" stroke="rgba(243, 240, 232, 0.07)" />
        <ellipse
          class="map-orbit"
          cx="260"
          cy="230"
          rx="174"
          ry="108"
          stroke="rgba(33, 77, 255, 0.34)"
          stroke-dasharray="3 10"
        />

        <path
          class="map-route"
          d="M260 82C382 82 430 147 430 230C430 314 374 378 260 378C146 378 90 314 90 230C90 147 138 82 260 82Z"
          stroke="rgba(33, 77, 255, 0.7)"
          stroke-width="1.2"
          marker-end="url(#system-map-arrow)"
        />

        <g stroke="rgba(243, 240, 232, 0.14)" stroke-width="1">
          <line x1="260" y1="230" x2="260" y2="82" />
          <line x1="260" y1="230" x2="430" y2="230" />
          <line x1="260" y1="230" x2="260" y2="378" />
          <line x1="260" y1="230" x2="90" y2="230" />
        </g>

        <g class="map-points">
          <circle class="map-point map-point--blue" cx="260" cy="82" r="4.5" />
          <circle class="map-point map-point--blue" cx="430" cy="230" r="4.5" />
          <circle class="map-point map-point--warm" cx="260" cy="378" r="4.5" />
          <circle class="map-point map-point--warm" cx="90" cy="230" r="4.5" />
        </g>

        <g stroke="rgba(243, 240, 232, 0.22)">
          <path d="M260 70V58M254 64H266" />
          <path d="M442 230H454M448 224V236" />
          <path d="M260 390V402M254 396H266" />
          <path d="M78 230H66M72 224V236" />
        </g>
      </svg>

      <div class="map-core" aria-hidden="true">
        <span class="core-ring"></span>
        <img src="/favicon-x-v2.svg" alt="" width="58" height="58" />
      </div>

      <div class="map-node map-node--intent">
        <span>01</span>
        <strong>Intent</strong>
        <small>需求与范围</small>
      </div>
      <div class="map-node map-node--architecture">
        <span>02</span>
        <strong>Architecture</strong>
        <small>架构与工程</small>
      </div>
      <div class="map-node map-node--signal">
        <span>03</span>
        <strong>Signal</strong>
        <small>数据与可视化</small>
      </div>
      <div class="map-node map-node--delivery">
        <span>04</span>
        <strong>Delivery</strong>
        <small>验证与交付</small>
      </div>

      <div class="map-stack">
        <div v-for="node in nodes" :key="node.key" class="map-stack-item">
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
      <span>Intent → Ship</span>
      <span>8Y / 15+</span>
    </figcaption>
  </figure>
</template>

<script setup>
const nodes = [
  { key: 'intent', index: '01', label: 'Intent', detail: '需求与范围', tone: 'blue' },
  { key: 'architecture', index: '02', label: 'Architecture', detail: '架构与工程', tone: 'blue' },
  { key: 'signal', index: '03', label: 'Signal', detail: '数据与可视化', tone: 'warm' },
  { key: 'delivery', index: '04', label: 'Delivery', detail: '验证与交付', tone: 'warm' }
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
  border: 1px solid rgba(243, 240, 232, 0.16);
  border-radius: 2px;
  background: #12110f;
  color: var(--color-paper);
}

.system-map::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 48%, rgba(33, 77, 255, 0.08), transparent 48%);
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
  color: rgba(243, 240, 232, 0.52);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.map-topline {
  min-height: 48px;
  border-bottom: 1px solid rgba(243, 240, 232, 0.12);
}

.map-footnote {
  min-height: 48px;
  border-top: 1px solid rgba(243, 240, 232, 0.12);
}

.map-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: rgba(243, 240, 232, 0.72);
}

.map-kicker i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(33, 77, 255, 0.12);
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

.map-orbit {
  transform: rotate(-18deg);
  transform-box: fill-box;
  transform-origin: center;
  animation: orbit-turn 42s linear infinite;
}

.map-route {
  stroke-dasharray: 8 11;
  animation: route-flow 18s linear infinite;
}

.map-point {
  filter: drop-shadow(0 0 5px currentColor);
}

.map-point--blue {
  color: var(--color-accent);
  fill: var(--color-accent);
}

.map-point--warm {
  color: var(--color-warm);
  fill: var(--color-warm);
}

.map-core {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  border: 1px solid rgba(243, 240, 232, 0.2);
  border-radius: 50%;
  background: rgba(18, 17, 15, 0.86);
  transform: translate(-50%, -50%);
}

.map-core img {
  width: 58px;
  height: 58px;
}

.core-ring {
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(243, 240, 232, 0.1);
  border-radius: 50%;
}

.map-node {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  min-width: 110px;
  pointer-events: none;
}

.map-node span {
  color: var(--color-warm);
  font-family: var(--font-mono);
  font-size: 0.52rem;
  letter-spacing: 0.08em;
}

.map-node strong {
  font-family: var(--font-display);
  font-size: 1.28rem;
  font-weight: 400;
  line-height: 1;
}

.map-node small {
  color: rgba(243, 240, 232, 0.5);
  font-family: var(--font-mono);
  font-size: 0.54rem;
  letter-spacing: 0.05em;
}

.map-node--intent {
  top: 0.65rem;
  left: 50%;
  align-items: center;
  text-align: center;
  transform: translateX(-50%);
}

.map-node--architecture {
  top: 50%;
  right: 0;
  align-items: flex-start;
  transform: translateY(-50%);
}

.map-node--signal {
  bottom: 0.5rem;
  left: 50%;
  align-items: center;
  text-align: center;
  transform: translateX(-50%);
}

.map-node--delivery {
  top: 50%;
  left: 0;
  align-items: flex-end;
  text-align: right;
  transform: translateY(-50%);
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

@keyframes orbit-turn {
  from {
    transform: rotate(-18deg);
  }
  to {
    transform: rotate(342deg);
  }
}

@keyframes route-flow {
  to {
    stroke-dashoffset: -190;
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
    border-bottom: 1px solid rgba(243, 240, 232, 0.12);
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
    background: rgba(243, 240, 232, 0.12);
  }

  .stack-index {
    color: rgba(243, 240, 232, 0.4);
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
    box-shadow: 0 0 0 4px rgba(33, 77, 255, 0.12);
  }

  .stack-dot--warm {
    background: var(--color-warm);
    box-shadow: 0 0 0 4px rgba(185, 67, 39, 0.12);
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
    color: rgba(243, 240, 232, 0.5);
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
  .map-orbit,
  .map-route {
    animation: none;
  }
}
</style>