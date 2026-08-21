<template>
  <div class="terminal-toy" @click="focusInput">
    <!-- 顶部状态栏 -->
    <div class="terminal-bar">
      <div class="bar-dots">
        <span class="dot close"></span>
        <span class="dot min"></span>
        <span class="dot max"></span>
      </div>
      <div class="bar-title">root@szx-cyber-node:~ (zsh)</div>
      <div class="bar-actions">
        <button class="action-btn" @click.stop="clearHistory" title="清屏">CLEAR</button>
      </div>
    </div>

    <!-- 终端控制台输出流 -->
    <div class="terminal-body" ref="bodyRef">
      <!-- 欢迎标语 -->
      <div class="welcome-banner">
        <pre class="ascii-art">
   ______      __                 _   __      __ 
  / ____/_  __/ /_  ___  _____   / | / /___  / /__
 / /   / / / / __ \/ _ \/ ___/  /  |/ / __ \/ //_/
/ /___/ /_/ / /_/ /  __/ /     / /|  / /_/ / ,<   
\____/\__, /_.___/\___/_/     /_/ |_/\____/_/|_|  
     /____/                                       
        </pre>
        <p class="banner-tip">
          欢迎接入 Cyber Terminal OS v2.5.0。输入 <span class="cmd-highlight">help</span> 查看指令清单，支持 Tab 补全与方向键历史翻阅。
        </p>
      </div>

      <!-- 历史输出记录 -->
      <div v-for="(entry, index) in history" :key="index" class="history-item">
        <div class="prompt-line">
          <span class="prompt-user">szx@cyber</span>
          <span class="prompt-sep">:</span>
          <span class="prompt-path">~</span>
          <span class="prompt-symbol">$</span>
          <span class="prompt-cmd">{{ entry.cmd }}</span>
        </div>

        <div v-if="entry.output" class="cmd-output" :class="entry.type">
          <!-- 纯文本或格式化输出 -->
          <pre v-if="entry.isPre">{{ entry.output }}</pre>
          <div v-else-if="entry.html" v-html="entry.html"></div>
          <div v-else>{{ entry.output }}</div>
        </div>
      </div>

      <!-- 当前活动命令行 -->
      <div class="active-prompt-line">
        <span class="prompt-user">szx@cyber</span>
        <span class="prompt-sep">:</span>
        <span class="prompt-path">~</span>
        <span class="prompt-symbol">$</span>
        <div class="input-wrap">
          <input
            ref="inputRef"
            type="text"
            v-model="currentCmd"
            @keydown.enter="executeCmd"
            @keydown.up.prevent="navigateHistory(-1)"
            @keydown.down.prevent="navigateHistory(1)"
            @keydown.tab.prevent="autocomplete"
            class="terminal-input"
            autofocus
            spellcheck="false"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { profile } from '../../data/profile'
import { labToys } from '../../data/labProjects'
import { useAppStore } from '../../stores/app'

const appStore = useAppStore()
const inputRef = ref(null)
const bodyRef = ref(null)

const currentCmd = ref('')
const history = ref([])
const cmdHistoryList = []
let historyIndex = -1

const availableCommands = [
  'help', 'neofetch', 'matrix', 'skills', 'projects',
  'toys', 'fortune', 'cat', 'sudo', 'date', 'whoami',
  'theme', 'clear', 'echo', 'repo'
]

const fortunes = [
  '“Talk is cheap. Show me the code.” —— Linus Torvalds',
  '“世界上只有两种编程语言：一种是天天被人喷的，一种是没人用的。” —— Bjarne Stroustrup',
  '“Simplicity is prerequisite for reliability.” —— Edsger W. Dijkstra',
  '“在赛博世界中，算力即权力，算法即律法。”',
  '“保持好奇，用代码构建属于你的未来维度。”'
]

const focusInput = () => {
  if (inputRef.value) inputRef.value.focus()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = bodyRef.value.scrollHeight
    }
  })
}

const clearHistory = () => {
  history.value = []
}

const executeCmd = () => {
  const raw = currentCmd.value.trim()
  currentCmd.value = ''
  historyIndex = -1

  if (!raw) {
    history.value.push({ cmd: '', output: '' })
    scrollToBottom()
    return
  }

  cmdHistoryList.push(raw)
  const [cmd, ...args] = raw.split(' ')
  const lowerCmd = cmd.toLowerCase()

  let output = ''
  let isPre = false
  let html = null
  let type = 'normal'

  switch (lowerCmd) {
    case 'help':
      isPre = true
      output = `
AVAILABLE COMMANDS:
  neofetch       展示系统硬件规格与极客配置
  skills         列出前端、工程化与可视化核心技术栈
  projects       查看核心研发与推理项目矩阵
  toys           查看实验室已集成的 GitHub 交互玩具
  matrix         唤醒终端代码雨流
  fortune        随机获取一条极客箴言
  cat <file>     查看文件 (about.txt, contact.txt, secret.txt)
  theme <name>   切换主题 (cyberpunk, abyss, terminal)
  whoami         当前登录身份
  date           当前系统时间戳
  repo           直达个人 GitHub 仓库主页
  clear          清空终端屏幕
  echo <text>    打印自定义文本
  sudo <command> 超级管理员提权指令
`
      break

    case 'neofetch':
      isPre = true
      output = `
       .---.           root@szx-cyber-node
      /     \\          -------------------
     | () () |         OS: CyberOS 2026 x86_64
      \\  -  /          Host: Antigravity Cyber Quantum Core
       \`---\`           Kernel: 6.8.0-zen-cyber
      /     \\          Uptime: 8 years, 3 months
     | |   | |         Shell: zsh 5.9 (x86_64-pc-linux-gnu)
     | |   | |         DE: Neural Vue 3 / Vite 8 / Three.js
     (_)-(_)           Theme: Cyber Neon [Dark]
                       CPU: Neural Matrix Synapse @ 5.2GHz
                       Memory: 64GB Quantum RAM / Infinite AI
`
      break

    case 'skills':
      isPre = true
      output = `
[FRONTEND CORE]   React 19, Vue 3, Svelte 5, TypeScript, Ant Design, Element Plus
[ENGINEERING]     Vite 8, Webpack 5, Docker, K8s, Micro-Frontend, CI/CD, Nginx
[VISUAL & 3D]     Three.js, WebGL, React Flow, D3.js, ECharts, Monaco Editor
[REALTIME & AI]   SSE 流式通信, WebSocket, MLOps 流水线, LLM Agent
`
      break

    case 'projects':
      isPre = true
      output = `
PORTFOLIO PROJECT MATRIX:
  01. 医疗 AI 研发与推理平台 (MLOps + React Flow + K8s)
  02. 医疗 AI 赋能综合平台 (7大子系统 + SSE 流式)
  03. AIGC 多模态内容生成平台 (WebSocket + AI)
  04. 企业数据资产与微前端门户平台 (Qiankun + ChatGPT)
  05. 3DVR 全景漫游创作平台 (Three.js + WebGL)
`
      break

    case 'toys':
      isPre = true
      output = labToys.map(t => `  [${t.icon}] ${t.name} -> Repo: ${t.repo}`).join('\n')
      break

    case 'fortune':
      output = fortunes[Math.floor(Math.random() * fortunes.length)]
      type = 'success'
      break

    case 'matrix':
      output = '01100011 01111001 01100010 01100101 01110010 00100000 01110010 01100001 01101001 01101110\nWake up, Neo... The Matrix has you.'
      type = 'success'
      break

    case 'cat':
      const target = args[0]?.toLowerCase()
      if (target === 'about.txt') {
        output = `${profile.name} - ${profile.title}\n${profile.bio}`
      } else if (target === 'contact.txt') {
        output = `Email: ${profile.email}\nGitHub: ${profile.github}\nWebsite: ${profile.website}`
      } else if (target === 'secret.txt') {
        output = 'ACCESS GRANTED: 科乐美秘籍彩蛋 -> 在页面中敲击键盘: ↑ ↑ ↓ ↓ ← → ← → B A'
        type = 'warning'
      } else {
        output = `cat: ${args[0] || ''}: 文件不存在。可用文件: about.txt, contact.txt, secret.txt`
        type = 'error'
      }
      break

    case 'theme':
      const th = args[0]?.toLowerCase()
      if (th && ['cyberpunk', 'abyss', 'terminal'].includes(th)) {
        appStore.setTheme(th)
        output = `主题已成功切换为: ${th}`
        type = 'success'
      } else {
        output = '当前主题: ' + appStore.theme + '\n可用主题: theme cyberpunk | theme abyss | theme terminal'
      }
      break

    case 'whoami':
      output = 'szx (Frontend Lead / Cyber Architect / GUEST_ACCESS_LEVEL_5)'
      break

    case 'date':
      output = new Date().toLocaleString()
      break

    case 'repo':
      output = 'Opening GitHub: https://github.com/is-97 ...'
      window.open('https://github.com/is-97', '_blank')
      break

    case 'echo':
      output = args.join(' ')
      break

    case 'sudo':
      if (args.join(' ').includes('rm -rf')) {
        output = '⚠️ WARNING: SYSTEM DEFENSE ACTIVATED! Nice try, hacker.'
        type = 'error'
      } else {
        output = `[sudo] password for szx: \nPermission granted for: ${args.join(' ')}`
        type = 'success'
      }
      break

    case 'clear':
      clearHistory()
      return

    default:
      output = `zsh: command not found: ${cmd}. 输入 'help' 查看可用指令。`
      type = 'error'
      break
  }

  history.value.push({
    cmd: raw,
    output,
    isPre,
    html,
    type
  })

  scrollToBottom()
}

const navigateHistory = (direction) => {
  if (cmdHistoryList.length === 0) return

  if (direction === -1) {
    if (historyIndex === -1) historyIndex = cmdHistoryList.length - 1
    else if (historyIndex > 0) historyIndex--
  } else {
    if (historyIndex < cmdHistoryList.length - 1 && historyIndex !== -1) historyIndex++
    else {
      historyIndex = -1
      currentCmd.value = ''
      return
    }
  }

  if (historyIndex >= 0 && historyIndex < cmdHistoryList.length) {
    currentCmd.value = cmdHistoryList[historyIndex]
  }
}

const autocomplete = () => {
  const current = currentCmd.value.trim().toLowerCase()
  if (!current) return

  const matched = availableCommands.filter(c => c.startsWith(current))
  if (matched.length === 1) {
    currentCmd.value = matched[0]
  } else if (matched.length > 1) {
    history.value.push({
      cmd: currentCmd.value,
      output: matched.join('   '),
      type: 'normal'
    })
    scrollToBottom()
  }
}

onMounted(() => {
  focusInput()
})
</script>

<style scoped>
.terminal-toy {
  background: rgba(8, 12, 20, 0.95);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 240, 255, 0.05);
  font-family: 'Fira Code', 'Courier New', monospace;
  display: flex;
  flex-direction: column;
  height: 480px;
  cursor: text;
}

.terminal-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  background: rgba(15, 22, 38, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  user-select: none;
}

.bar-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.close { background: #ff5f56; }
.dot.min { background: #ffbd2e; }
.dot.max { background: #27c93f; }

.bar-title {
  font-size: 0.72rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  letter-spacing: 0.05em;
}

.action-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: #00f0ff;
  color: #00f0ff;
}

.terminal-body {
  flex: 1;
  padding: 14px;
  overflow-y: auto;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #d1d5db;
}

.welcome-banner {
  margin-bottom: 14px;
}

.ascii-art {
  font-size: 0.6rem;
  line-height: 1.1;
  color: var(--primary, #00f0ff);
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
  margin-bottom: 8px;
}

.banner-tip {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.cmd-highlight {
  color: #00ff88;
  font-weight: bold;
}

.history-item {
  margin-bottom: 10px;
}

.prompt-line,
.active-prompt-line {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.prompt-user {
  color: #00ff88;
  font-weight: bold;
}

.prompt-sep {
  color: rgba(255, 255, 255, 0.4);
}

.prompt-path {
  color: #00f0ff;
}

.prompt-symbol {
  color: #ffaa00;
  font-weight: bold;
}

.prompt-cmd {
  color: #fff;
}

.cmd-output {
  margin-top: 4px;
  padding-left: 8px;
  border-left: 2px solid rgba(255, 255, 255, 0.08);
}

.cmd-output pre {
  margin: 0;
  font-family: inherit;
  white-space: pre-wrap;
}

.cmd-output.error {
  color: #ff0055;
  border-color: #ff0055;
}

.cmd-output.success {
  color: #00ff88;
  border-color: #00ff88;
}

.cmd-output.warning {
  color: #ffaa00;
  border-color: #ffaa00;
}

.input-wrap {
  flex: 1;
  min-width: 120px;
}

.terminal-input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-family: inherit;
  font-size: 0.82rem;
}
</style>
