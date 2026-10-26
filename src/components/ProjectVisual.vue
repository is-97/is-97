<template>
  <div
    class="project-visual"
    :class="[`motif-${motif}`, `variant-${variant}`]"
    :style="visualStyle"
    aria-hidden="true"
  >
    <div class="visual-glow"></div>
    <div class="visual-grid"></div>
    <div class="visual-chrome">
      <span class="chrome-signal"></span>
      <span class="chrome-label">{{ visual.caption }}</span>
      <span class="chrome-code">{{ project.id.toUpperCase() }}</span>
    </div>

    <svg class="visual-canvas" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
      <g class="visual-axis">
        <line x1="24" y1="194" x2="378" y2="194" />
        <line x1="24" y1="26" x2="24" y2="194" />
      </g>

      <g v-if="motif === 'constellation'">
        <circle cx="202" cy="108" r="82" class="ring ring--dashed" />
        <circle cx="202" cy="108" r="49" class="ring" />
        <path class="edge" d="M202 108L122 67M202 108L286 61M202 108L302 143M202 108L134 166M202 108L236 181M202 108L96 116" />
        <circle cx="122" cy="67" r="6" class="node" />
        <circle cx="286" cy="61" r="4" class="node node--b" />
        <circle cx="302" cy="143" r="7" class="node" />
        <circle cx="134" cy="166" r="4" class="node node--b" />
        <circle cx="236" cy="181" r="5" class="node" />
        <circle cx="96" cy="116" r="4" class="node" />
        <circle cx="202" cy="108" r="18" class="node-core" />
        <path class="core-cross" d="M202 93v30M187 108h30" />
      </g>

      <g v-else-if="motif === 'pipeline'">
        <path class="edge" d="M48 150H112L146 84H220L252 150H352" />
        <path class="edge edge--faint" d="M62 48H330" />
        <circle cx="48" cy="150" r="6" class="node" />
        <circle cx="146" cy="84" r="8" class="node node--b" />
        <circle cx="220" cy="84" r="5" class="node" />
        <circle cx="252" cy="150" r="7" class="node" />
        <circle cx="352" cy="150" r="5" class="node node--b" />
        <rect x="70" y="164" width="58" height="7" rx="2" class="bar" />
        <rect x="140" y="164" width="94" height="7" rx="2" class="bar bar--strong" />
        <rect x="246" y="164" width="72" height="7" rx="2" class="bar" />
        <path class="pulse-path" d="M74 72h48l13-15 16 31 16-47 18 31h72" />
      </g>

      <g v-else-if="motif === 'generative'">
        <g class="orbit-spin">
          <ellipse cx="206" cy="108" rx="112" ry="34" class="ring" />
          <ellipse cx="206" cy="108" rx="86" ry="96" transform="rotate(58 206 108)" class="ring ring--b" />
          <ellipse cx="206" cy="108" rx="54" ry="102" transform="rotate(-34 206 108)" class="ring ring--dashed" />
        </g>
        <circle cx="206" cy="108" r="15" class="node-core node-core--b" />
        <path class="wave" d="M62 152c30-44 56 42 86 3s53 31 84-9 57 26 106-27" />
        <circle cx="118" cy="61" r="5" class="node" />
        <circle cx="312" cy="151" r="4" class="node node--b" />
      </g>

      <g v-else-if="motif === 'dashboard'">
        <rect x="52" y="42" width="294" height="132" rx="7" class="panel" />
        <path class="edge edge--faint" d="M70 154H330M70 122H330M70 90H330" />
        <rect x="78" y="128" width="18" height="26" rx="2" class="bar" />
        <rect x="108" y="106" width="18" height="48" rx="2" class="bar bar--strong" />
        <rect x="138" y="118" width="18" height="36" rx="2" class="bar" />
        <rect x="168" y="82" width="18" height="72" rx="2" class="bar" />
        <path class="chart-line" d="M78 144l38-23 34 12 41-34 39 17 43-27 41 10 32-22" />
        <circle cx="116" cy="121" r="3" class="node" />
        <circle cx="191" cy="99" r="3" class="node" />
        <circle cx="273" cy="89" r="3" class="node node--b" />
      </g>

      <g v-else-if="motif === 'portal'">
        <path class="edge" d="M124 78H276M124 142H276M200 78V142" />
        <rect x="54" y="56" width="92" height="44" rx="5" class="panel" />
        <rect x="154" y="56" width="92" height="44" rx="5" class="panel" />
        <rect x="254" y="56" width="92" height="44" rx="5" class="panel" />
        <rect x="54" y="120" width="92" height="44" rx="5" class="panel panel--b" />
        <rect x="154" y="120" width="92" height="44" rx="5" class="panel" />
        <rect x="254" y="120" width="92" height="44" rx="5" class="panel" />
        <path class="edge edge--faint" d="M70 74h56M170 74h56M270 74h56M70 138h56M170 138h56M270 138h56" />
      </g>

      <g v-else-if="motif === 'workflow'">
        <path class="edge" d="M110 46V178M110 70H238M110 112H292M110 154H202" />
        <circle cx="110" cy="70" r="9" class="node" />
        <circle cx="110" cy="112" r="9" class="node node--b" />
        <circle cx="110" cy="154" r="9" class="node" />
        <rect x="238" y="57" width="96" height="26" rx="4" class="panel" />
        <rect x="292" y="99" width="74" height="26" rx="4" class="panel panel--b" />
        <rect x="202" y="141" width="132" height="26" rx="4" class="panel" />
        <path class="edge edge--faint" d="M252 70h66M306 112h44M216 154h102" />
      </g>

      <g v-else-if="motif === 'prism'">
        <polygon points="204,34 302,92 276,170 132,170 106,92" class="prism" />
        <polygon points="204,58 274,99 254,149 154,149 134,99" class="prism prism--inner" />
        <path class="edge" d="M204 34v136M106 92l70 78 100-78M106 92l148 0M132 170l72-112 72 112" />
        <circle cx="204" cy="98" r="5" class="node node--b" />
        <circle cx="204" cy="34" r="4" class="node" />
        <circle cx="302" cy="92" r="4" class="node" />
        <circle cx="132" cy="170" r="4" class="node node--b" />
      </g>

      <g v-else-if="motif === 'mobile'">
        <rect x="154" y="24" width="92" height="172" rx="16" class="phone" />
        <rect x="164" y="42" width="72" height="86" rx="5" class="panel" />
        <path class="edge" d="M176 61h48M176 75h34M176 102h42" />
        <circle cx="188" cy="149" r="7" class="node node--b" />
        <rect x="203" y="144" width="34" height="10" rx="3" class="bar" />
        <path class="ring ring--dashed" d="M272 110c0 44-41 73-79 73s-79-29-79-73 41-73 79-73" />
        <circle cx="311" cy="72" r="5" class="node" />
        <circle cx="86" cy="159" r="4" class="node node--b" />
      </g>

      <g v-else-if="motif === 'network'">
        <path class="edge" d="M86 70L156 52 238 77 316 56 302 136 240 174 154 164 92 128 86 70M156 52L154 164M238 77L240 174M316 56L240 174M86 70L240 174M92 128L238 77M302 136L154 52" />
        <circle cx="86" cy="70" r="6" class="node" />
        <circle cx="156" cy="52" r="4" class="node node--b" />
        <circle cx="238" cy="77" r="8" class="node" />
        <circle cx="316" cy="56" r="4" class="node" />
        <circle cx="302" cy="136" r="6" class="node node--b" />
        <circle cx="240" cy="174" r="4" class="node" />
        <circle cx="154" cy="164" r="5" class="node" />
        <circle cx="92" cy="128" r="4" class="node node--b" />
        <circle cx="199" cy="113" r="14" class="node-core" />
      </g>

      <g v-else>
        <ellipse cx="208" cy="112" rx="103" ry="74" class="ring" />
        <path class="edge" d="M60 190L176 105M116 190L190 112M180 190L208 115M244 190L222 115M306 190L232 112M352 174L240 108" />
        <path class="edge edge--faint" d="M78 82H338M94 62H322" />
        <circle cx="208" cy="112" r="45" class="ring ring--b" />
        <circle cx="208" cy="112" r="13" class="node-core node-core--b" />
        <circle cx="208" cy="67" r="4" class="node" />
        <circle cx="256" cy="112" r="4" class="node node--b" />
        <circle cx="160" cy="112" r="4" class="node" />
      </g>
    </svg>

    <div class="visual-footer">
      <span class="visual-metric">{{ visual.metric }}</span>
      <span class="visual-mark">{{ markText }}</span>
    </div>

    <span class="visual-scan"></span>
    <span class="visual-corner tl"></span>
    <span class="visual-corner br"></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'card'
  },
  sequence: {
    type: Number,
    default: null
  }
})

const visual = computed(() => props.project.visual || {
  motif: 'dashboard',
  accent: '#00f0ff',
  secondary: '#7000ff',
  metric: 'SYSTEM / ONLINE',
  caption: 'PROJECT SYSTEM'
})

const motif = computed(() => visual.value.motif || 'dashboard')
const markText = computed(() => props.sequence
  ? `CASE / ${String(props.sequence).padStart(2, '0')}`
  : 'SYSTEM / LIVE'
)

const visualStyle = computed(() => ({
  '--visual-a': visual.value.accent || '#00f0ff',
  '--visual-b': visual.value.secondary || '#7000ff'
}))
</script>

<style scoped>
.project-visual {
  position: absolute;
  inset: 0;
  overflow: hidden;
  isolation: isolate;
  border-radius: inherit;
  background:
    radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--visual-b) 9%, transparent), transparent 38%),
    linear-gradient(145deg, #f8f5ee, #eee8dc);
  color: var(--visual-a);
}

.visual-glow {
  position: absolute;
  width: 52%;
  aspect-ratio: 1;
  right: -10%;
  top: -28%;
  border-radius: 50%;
  background: var(--visual-a);
  opacity: 0.055;
  filter: blur(48px);
}

.visual-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(24, 23, 20, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 23, 20, 0.055) 1px, transparent 1px);
  background-size: 30px 30px;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.82), transparent 96%);
}

.visual-chrome {
  position: absolute;
  z-index: 3;
  top: 14px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.chrome-signal {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--visual-a);
}

.chrome-code {
  margin-left: auto;
  color: var(--color-ink-faint);
}

.visual-canvas {
  position: absolute;
  inset: 11% 2% 12%;
  width: 96%;
  height: 77%;
  color: var(--visual-a);
}

.visual-axis {
  stroke: rgba(24, 23, 20, 0.11);
  stroke-width: 1;
  stroke-dasharray: 2 7;
}

.edge,
.ring,
.wave,
.chart-line,
.prism,
.phone,
.panel,
.bar {
  vector-effect: non-scaling-stroke;
}

.edge,
.wave,
.chart-line {
  fill: none;
  stroke: var(--visual-a);
  stroke-width: 1.15;
  opacity: 0.58;
}

.edge--faint {
  opacity: 0.18;
}

.ring {
  fill: none;
  stroke: var(--visual-a);
  stroke-width: 1;
  opacity: 0.3;
}

.ring--b {
  stroke: var(--visual-b);
}

.ring--dashed {
  stroke-dasharray: 4 8;
}

.node,
.node--b {
  fill: var(--visual-a);
}

.node--b {
  fill: var(--visual-b);
}

.node-core {
  fill: rgba(251, 250, 246, 0.78);
  stroke: var(--visual-a);
  stroke-width: 1.5;
}

.node-core--b {
  stroke: var(--visual-b);
}

.core-cross {
  fill: none;
  stroke: var(--visual-a);
  stroke-width: 1;
  opacity: 0.8;
}

.bar {
  fill: var(--visual-a);
  opacity: 0.45;
}

.bar--strong {
  fill: var(--visual-b);
  opacity: 0.72;
}

.pulse-path {
  fill: none;
  stroke: var(--visual-b);
  stroke-width: 1.4;
  opacity: 0.7;
}

.panel {
  fill: rgba(251, 250, 246, 0.5);
  stroke: var(--visual-a);
  stroke-width: 0.8;
  opacity: 0.62;
}

.panel--b {
  stroke: var(--visual-b);
}

.chart-line {
  stroke-width: 1.7;
  opacity: 0.82;
}

.prism {
  fill: color-mix(in srgb, var(--visual-a) 5%, transparent);
  stroke: var(--visual-a);
  stroke-width: 1.1;
  opacity: 0.55;
}

.prism--inner {
  stroke: var(--visual-b);
}

.phone {
  fill: rgba(251, 250, 246, 0.72);
  stroke: var(--visual-a);
  stroke-width: 1.2;
}

.visual-footer {
  position: absolute;
  z-index: 3;
  left: 18px;
  right: 18px;
  bottom: 15px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--font-mono);
}

.visual-metric {
  color: var(--color-ink-soft);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
}

.visual-mark {
  color: var(--visual-a);
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  opacity: 0.75;
}

.visual-scan {
  display: none;
}

.visual-corner {
  position: absolute;
  z-index: 3;
  width: 12px;
  height: 12px;
  border-color: var(--visual-a);
  opacity: 0.42;
}

.visual-corner.tl {
  top: 9px;
  left: 9px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.visual-corner.br {
  right: 9px;
  bottom: 9px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.variant-hero .visual-chrome {
  left: 42%;
}

.variant-hero .visual-canvas {
  left: 36%;
  width: 62%;
  opacity: 0.78;
}

.variant-hero .visual-footer {
  left: auto;
  right: 24px;
  bottom: 22px;
}

.variant-hero .visual-metric {
  display: none;
}

@media (max-width: 768px) {
  .visual-chrome {
    font-size: 0.52rem;
  }

  .variant-hero .visual-chrome {
    left: 16px;
    top: auto;
    bottom: 44px;
  }

  .variant-hero .visual-canvas {
    inset: 16% -22% 18% 24%;
    width: 98%;
    opacity: 0.45;
  }

  .variant-hero .visual-footer {
    display: none;
  }
}
</style>