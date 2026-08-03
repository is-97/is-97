<template>
  <div class="holographic-interface" role="main" aria-label="AI 聊天界面">
    <div class="aurora-layer">
      <div class="aurora-beam"></div>
      <div class="aurora-beam"></div>
    </div>

    <div class="status-bar" role="banner" aria-label="状态栏">
      <div class="model-info" aria-label="AI模型信息">
        <div class="ai-avatar-small">
          <div class="core-pulse"></div>
        </div>
        <div class="info-text">
          <span class="model-name">AURA-AI <span class="version">V4.0</span></span>
          <span class="status-text">{{ chatStore.isLoading ? 'GENERATING...' : 'SYSTEM ONLINE' }}</span>
        </div>
      </div>
      <div class="window-controls">
        <button class="control-btn" @click="clearChat" title="清除聊天记录" aria-label="清除聊天记录">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="chat-viewport" ref="viewportRef" role="log" aria-live="polite" aria-label="聊天记录">
      <div class="messages-container" role="region" aria-label="消息列表">
        <div v-if="!chatStore.hasHistory" class="welcome-screen" role="region" aria-label="欢迎页面">
          <div class="ai-core-container">
            <div class="ai-core-outer-ring"></div>
            <div class="ai-core-inner-ring"></div>
            <div class="ai-core-center"></div>
          </div>
          <h2 class="welcome-title">AURA SYSTEM READY</h2>
          <p class="welcome-subtitle">你可以问我关于技术、项目、工作经历的问题</p>

          <div class="quick-prompts">
            <button v-for="prompt in quickPrompts" :key="prompt" @click="usePrompt(prompt)" class="prompt-chip" :aria-label="`快速提问：${prompt}`">
              {{ prompt }}
            </button>
          </div>
        </div>

        <TransitionGroup name="msg">
          <div v-for="(msg, index) in chatStore.messages" :key="index" class="message-row" :class="msg.role" :aria-label="msg.role === `user` ? `用户消息` : `AI回复`">
            <div class="message-content">
              <div v-if="msg.role === 'assistant'" class="ai-avatar">
                <div class="avatar-ring"></div>
              </div>

              <div class="bubble-wrapper">
                <div class="bubble" :class="{ typing: msg.isTyping }">
                  <div v-if="msg.role === 'user'" class="user-text">{{ msg.content }}</div>
                  <div v-else class="ai-text-container">
                    <!-- 思考过程 -->
                    <div v-if="msg.reasoning" class="thinking-block">
                      <div class="thinking-header" @click="msg.showReasoning = !msg.showReasoning" role="button" tabindex="0">
                        <span class="thinking-icon">
                          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                          </svg>
                        </span>
                        <span class="thinking-title">思考过程</span>
                        <span class="toggle-arrow" :class="{ expanded: msg.showReasoning }">
                          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </div>
                      <div v-show="msg.showReasoning" class="thinking-content">
                        {{ msg.reasoning }}
                      </div>
                    </div>

                    <div v-if="msg.content" class="ai-text markdown-body" v-html="renderMarkdown(msg.content)"></div>
                    <span v-if="msg.isTyping && !msg.content" class="thinking-pulse-text">AI 正在思考中<span class="thinking-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span></span>
                    <span v-else-if="msg.isTyping" class="cursor">_</span>

                    <!-- 消息操作栏（仅在非typing状态显示） -->
                    <div v-if="!msg.isTyping && msg.content" class="message-actions">
                      <button class="action-btn" @click="copyMessage(msg.content)" :title="copiedId === msg.content ? '已复制！' : '复制'">
                        <svg v-if="copiedId === msg.content" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <svg v-else viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span class="action-label">{{ copiedId === msg.content ? '已复制' : '复制' }}</span>
                      </button>
                      <!-- 重新生成：仅在最后一条AI消息显示 -->
                      <button
                        v-if="index === chatStore.messages.length - 1 && !chatStore.isLoading"
                        class="action-btn"
                        @click="regenerateResponse"
                        title="重新生成"
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2">
                          <polyline points="23 4 23 10 17 10"></polyline>
                          <polyline points="1 20 1 14 7 14"></polyline>
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                        <span class="action-label">重新生成</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="message-meta" v-if="!msg.isTyping">{{ formatTime(msg.timestamp) }}</div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <div v-if="chatStore.isLoading && !lastIsTyping" class="loading-status" role="status" aria-live="polite" aria-label="AI正在生成回复">
          <div class="quantum-loader">
            <div class="orbit"></div>
            <div class="orbit"></div>
            <div class="orbit"></div>
            <div class="core"></div>
          </div>
          <span class="loading-label">ANALYZING DATA STREAM...</span>
        </div>

        <div ref="bottomAnchorRef" class="bottom-anchor"></div>
      </div>
    </div>

    <div class="input-deck" role="form" aria-label="消息输入区域">
      <div class="glass-capsule" :class="{ focused: isFocused }">
        <!-- 停止生成按钮（loading时显示） -->
        <button
          v-if="chatStore.isLoading"
          class="stop-trigger"
          @click="stopGeneration"
          title="停止生成"
          aria-label="停止生成"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"></rect>
          </svg>
        </button>

        <!-- 刷新快捷提问按钮（非loading且无历史时显示） -->
        <button
          v-else-if="!chatStore.hasHistory"
          class="shuffle-trigger"
          @click="refreshQuickPrompts"
          title="换一批问题"
          aria-label="换一批问题"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>
        </button>

        <!-- 清除聊天按钮（有历史时显示） -->
        <button
          v-else
          class="clear-trigger"
          @click="clearChat"
          title="清除聊天记录"
          aria-label="清除聊天记录"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

        <textarea
          ref="inputRef"
          v-model="inputMessage"
          class="holo-input"
          placeholder="输入指令或提问..."
          rows="1"
          @keydown.enter.prevent="handleEnter"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @input="autoResize"
        ></textarea>

        <button class="send-trigger" :disabled="!inputMessage.trim() || chatStore.isLoading" @click="sendMessage" aria-label="发送消息">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>

        <div class="capsule-glow"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import typescript from 'highlight.js/lib/languages/typescript'
import 'highlight.js/styles/atom-one-dark.css'
import { sendToAIWithHistory } from '../services/aiService'
import { useChatStore } from '../stores/chat'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)

marked.setOptions({
  breaks: true,
  gfm: true
})

// marked v15 移除了 highlight 选项，改用自定义 renderer 实现代码高亮
marked.use({
  renderer: {
    code({ text, lang }) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      const highlighted = hljs.highlight(text, { language }).value
      const encoded = encodeURIComponent(text)
      return `<div class="code-block-wrapper"><button class="code-copy-btn" data-code="${encoded}" title="复制代码"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>复制</span></button><pre><code class="hljs language-${language}">${highlighted}</code></pre></div>\n`
    }
  }
})

const chatStore = useChatStore()
const mdCache = new Map()
const inputMessage = ref('')
const isFocused = ref(false)
const viewportRef = ref(null)
const inputRef = ref(null)
const bottomAnchorRef = ref(null)
const copiedId = ref(null)
const abortController = ref(null)

const lastIsTyping = computed(() => {
  const last = chatStore.messages[chatStore.messages.length - 1]
  return last?.isTyping || false
})

const quickPromptPool = [
  '介绍一下你的技术栈',
  '你最擅长的前端技术是什么？',
  '你的工作经历中有哪些亮点？',
  '你的三个代表性项目是什么？',
  'Vue3 和 React 你更喜欢哪个？为什么？',
  '你在前端性能优化方面有哪些经验？',
  'Three.js / WebGL 是如何学习的？',
  '微前端架构有哪些实践经验？',
  '低代码平台的设计思路是什么？',
  '如何排查线上白屏问题？',
  '前端开发中最常见的性能瓶颈有哪些？',
  '你对前端未来的趋势怎么看？',
  '移动端开发（小程序/App）有哪些经验？',
  '你的职业目标是什么？',
  '帮我模拟一段前端面试场景',
  '给我一份前端学习路线图'
]

const quickPrompts = ref([])

const refreshQuickPrompts = () => {
  // 随机取6条
  const shuffled = [...quickPromptPool].sort(() => Math.random() - 0.5)
  quickPrompts.value = shuffled.slice(0, 6)
}

const formatTime = (ts) => {
  if (!ts) return ''
  return new Date(ts).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const renderMarkdown = (content) => {
  if (!content) return ''
  if (mdCache.has(content)) return mdCache.get(content)
  const html = DOMPurify.sanitize(marked.parse(content))
  mdCache.set(content, html)
  if (mdCache.size > 50) mdCache.delete(mdCache.keys().next().value)
  return html
}

const scrollToBottom = async () => {
  await nextTick()
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bottomAnchorRef.value?.scrollIntoView({
        behavior: 'auto',
        block: 'end'
      })
    })
  })
}

const autoResize = () => {
  const el = inputRef.value
  if (el) {
    el.style.height = 'auto'
    const lineHeight = 24
    const padding = 20
    const contentHeight = el.scrollHeight - padding
    const rows = Math.ceil(contentHeight / lineHeight)
    const newHeight = Math.min(rows * lineHeight + padding, 120)
    el.style.height = `${newHeight}px`
  }
}

const usePrompt = (text) => {
  inputMessage.value = text
  inputRef.value?.focus()
}

const clearChat = () => {
  if (window.confirm('确定要清除所有聊天记录吗？此操作无法撤销。')) {
    chatStore.clearMessages()
    refreshQuickPrompts()
  }
}

const handleEnter = (e) => {
  if (!e.shiftKey) {
    sendMessage()
  }
}

const copyMessage = async (content) => {
  const markCopiedMsg = () => {
    copiedId.value = content
    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  }

  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(content)
      markCopiedMsg()
    } catch {
      fallbackCopy(content)
      markCopiedMsg()
    }
  } else {
    fallbackCopy(content)
    markCopiedMsg()
  }
}

const stopGeneration = () => {
  if (abortController.value) {
    abortController.value.abort()
    abortController.value = null
  }
}

const appendAssistantChunk = (index, delta) => {
  const target = chatStore.messages[index]
  if (!target) return

  if (delta.reasoning_content) {
    chatStore.appendReasoningToLastMessage(delta.reasoning_content)
  }
  if (delta.content) {
    chatStore.appendToLastMessage(delta.content)
  }

  if (!viewportRef.value) return

  const { scrollTop, clientHeight, scrollHeight } = viewportRef.value
  const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)

  if (distanceFromBottom < 120) {
    scrollToBottom()
  }
}

const sendMessage = async () => {
  const content = inputMessage.value.trim()
  if (!content || chatStore.isLoading) return

  chatStore.addUserMessage(content)
  chatStore.addAssistantMessage()

  inputMessage.value = ''
  if (inputRef.value) inputRef.value.style.height = 'auto'
  chatStore.setLoading(true)
  await scrollToBottom()

  const aiMsgIndex = chatStore.messages.length - 1

  abortController.value = new AbortController()

  try {
    const apiMessages = chatStore.getMessagesForAPI()

    await sendToAIWithHistory(apiMessages, (chunk) => {
      appendAssistantChunk(aiMsgIndex, chunk)
    }, { signal: abortController.value.signal })
  } catch (err) {
    if (err.name === 'AbortError') {
      // 用户主动停止，不显示错误
    } else {
      const msg = err.message || '连接中断或超时，请检查网络连接'
      chatStore.appendToLastMessage(`\n\n[Error: ${msg}]`)
    }
  } finally {
    abortController.value = null
    chatStore.setLoading(false)
    chatStore.finalizeLastMessage()
    await scrollToBottom()
    nextTick(() => inputRef.value?.focus())
  }
}

const regenerateResponse = async () => {
  if (chatStore.isLoading) return

  // 删除最后一条AI消息
  chatStore.removeLastAssistantMessage()

  // 重新添加空的AI消息
  chatStore.addAssistantMessage()
  chatStore.setLoading(true)
  await scrollToBottom()

  const aiMsgIndex = chatStore.messages.length - 1
  abortController.value = new AbortController()

  try {
    const apiMessages = chatStore.getMessagesForAPI()

    await sendToAIWithHistory(apiMessages, (chunk) => {
      appendAssistantChunk(aiMsgIndex, chunk)
    }, { signal: abortController.value.signal })
  } catch (err) {
    if (err.name !== 'AbortError') {
      const msg = err.message || '连接中断或超时，请检查网络连接'
      chatStore.appendToLastMessage(`\n\n[Error: ${msg}]`)
    }
  } finally {
    abortController.value = null
    chatStore.setLoading(false)
    chatStore.finalizeLastMessage()
    await scrollToBottom()
    nextTick(() => inputRef.value?.focus())
  }
}

const fallbackCopy = (code) => {
  const textarea = document.createElement('textarea')
  textarea.value = code
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try { document.execCommand('copy') } catch {}
  document.body.removeChild(textarea)
}

const markCopied = (btn) => {
  btn.classList.add('copied')
  const label = btn.querySelector('span')
  if (label) label.textContent = '已复制'
  setTimeout(() => {
    btn.classList.remove('copied')
    if (label) label.textContent = '复制'
  }, 2000)
}

const handleCodeCopy = (e) => {
  const btn = e.target.closest('.code-copy-btn')
  if (!btn) return
  const raw = btn.getAttribute('data-code')
  if (!raw) return
  const code = decodeURIComponent(raw)

  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(code).then(() => markCopied(btn)).catch(() => {
      fallbackCopy(code)
      markCopied(btn)
    })
  } else {
    fallbackCopy(code)
    markCopied(btn)
  }
}

onMounted(() => {
  chatStore.loadMessages()
  if (!chatStore.hasHistory) {
    refreshQuickPrompts()
  }
  inputRef.value?.focus()
  viewportRef.value?.addEventListener('click', handleCodeCopy)
})

onUnmounted(() => {
  viewportRef.value?.removeEventListener('click', handleCodeCopy)
})
</script>

<style scoped>
/* Rajdhani & JetBrains Mono 字体已在 index.html 中统一加载 */

.holographic-interface {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Rajdhani', sans-serif;
  color: #fff;
}

.aurora-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.3;
  mix-blend-mode: screen;
}

.aurora-beam {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(ellipse at center, rgba(0, 240, 255, 0.15), transparent 70%);
  animation: auroraSpin 15s infinite linear;
}

.aurora-beam:nth-child(2) {
  background: radial-gradient(ellipse at center, rgba(120, 0, 255, 0.15), transparent 70%);
  animation: auroraSpin 20s infinite reverse linear;
}

@keyframes auroraSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.status-bar {
  position: relative;
  z-index: 10;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  background: rgba(10, 10, 20, 0.4);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.model-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ai-avatar-small {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.core-pulse {
  width: 12px;
  height: 12px;
  background: #00f0ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00f0ff;
  animation: pulse 2s infinite;
}

.info-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.model-name {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.1em;
}

.version {
  font-size: 0.7em;
  color: #00f0ff;
}

.status-text {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
}

.control-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.chat-viewport {
  flex: 1;
  min-height: 0;
  position: relative;
  z-index: 1;
  overflow-y: auto;
  padding: 2rem;
  scrollbar-width: none;
}

.messages-container {
  max-width: 900px;
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.bottom-anchor {
  height: 1px;
}

.welcome-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  animation: fadeIn 0.8s ease-out;
}

.ai-core-container {
  position: relative;
  width: 160px;
  height: 160px;
  margin-bottom: 2rem;
}

.ai-core-outer-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(0, 240, 255, 0.2);
  border-radius: 50%;
  border-top-color: #00f0ff;
  border-bottom-color: #00f0ff;
  animation: spin 8s infinite linear;
}

.ai-core-inner-ring {
  position: absolute;
  inset: 20px;
  border: 2px solid rgba(120, 0, 255, 0.3);
  border-radius: 50%;
  border-left-color: #7000ff;
  border-right-color: #7000ff;
  animation: spin 5s infinite reverse linear;
}

.ai-core-center {
  position: absolute;
  inset: 50px;
  background: radial-gradient(circle, #fff, #00f0ff);
  border-radius: 50%;
  box-shadow: 0 0 30px #00f0ff, 0 0 60px #7000ff;
  animation: breathe 3s infinite ease-in-out;
}

.welcome-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #fff, #00f0ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-subtitle {
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2rem;
}

.quick-prompts {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.prompt-chip {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Rajdhani', sans-serif;
}

.prompt-chip:hover {
  background: rgba(0, 240, 255, 0.15);
  border-color: #00f0ff;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.message-row {
  display: flex;
  margin-bottom: 2rem;
  width: 100%;
}

.message-row.user {
  justify-content: flex-end;
}

.message-row.assistant {
  justify-content: flex-start;
}

.message-content {
  display: flex;
  gap: 1rem;
  max-width: 85%;
  align-items: flex-start;
}

.message-row.user .message-content {
  flex-direction: row-reverse;
}

.ai-avatar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  margin-top: 4px;
  position: relative;
}

.avatar-ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #00f0ff;
  box-shadow: 0 0 10px #00f0ff;
  background: #000;
}

.bubble-wrapper {
  display: flex;
  flex-direction: column;
}

.bubble {
  padding: 1rem 1.5rem;
  border-radius: 16px;
  font-size: 1rem;
  line-height: 1.6;
  position: relative;
  transition: all 0.3s;
}

.message-row.user .bubble {
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.16) 0%, rgba(112, 0, 255, 0.16) 100%);
  border: 1px solid rgba(0, 240, 255, 0.35);
  backdrop-filter: blur(12px);
  color: #ffffff;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 24px rgba(0, 240, 255, 0.15);
}

.message-row.assistant .bubble {
  background: rgba(12, 20, 38, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(16px);
  border-radius: 18px;
  border-top-left-radius: 4px;
  padding: 1.2rem 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.08);
}

.ai-text {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.message-meta {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 0.4rem;
  align-self: flex-end;
}

.message-row.assistant .message-meta {
  align-self: flex-start;
}

.cursor {
  display: inline-block;
  color: #00f0ff;
  animation: blink 1s step-end infinite;
  font-weight: bold;
}

:deep(.markdown-body) {
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.96rem;
  line-height: 1.7;
  word-break: break-word;
  overflow-x: auto;
}

/* ── Cyber Table Styling ── */
:deep(.markdown-body table) {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1.25rem 0;
  background: rgba(10, 18, 35, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.04);
}

:deep(.markdown-body thead) {
  background: linear-gradient(180deg, rgba(0, 240, 255, 0.18) 0%, rgba(0, 240, 255, 0.04) 100%);
}

:deep(.markdown-body th) {
  padding: 14px 18px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 0.92rem;
  color: #00f0ff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: left;
  border-bottom: 2px solid rgba(0, 240, 255, 0.4);
  border-right: 1px solid rgba(0, 240, 255, 0.1);
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
  white-space: nowrap;
}

:deep(.markdown-body th:last-child) {
  border-right: none;
}

:deep(.markdown-body td) {
  padding: 13px 18px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.25s ease;
  line-height: 1.6;
}

:deep(.markdown-body td:last-child) {
  border-right: none;
}

:deep(.markdown-body tbody tr:last-child td) {
  border-bottom: none;
}

:deep(.markdown-body tbody tr) {
  transition: background-color 0.25s ease, transform 0.2s ease;
}

:deep(.markdown-body tbody tr:nth-child(even)) {
  background: rgba(255, 255, 255, 0.02);
}

:deep(.markdown-body tbody tr:hover) {
  background: rgba(0, 240, 255, 0.1);
}

:deep(.markdown-body tbody tr:hover td) {
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

/* ── Typography & Headers ── */
:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4),
:deep(.markdown-body h5),
:deep(.markdown-body h6) {
  font-family: 'Rajdhani', sans-serif;
  color: #ffffff;
  margin-top: 1.6rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.3;
}

:deep(.markdown-body h1) {
  font-size: 1.55rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0, 240, 255, 0.35);
  background: linear-gradient(90deg, #ffffff 0%, #00f0ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.markdown-body h2) {
  font-size: 1.3rem;
  border-left: 4px solid #00f0ff;
  padding-left: 0.75rem;
  margin-top: 1.4rem;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.08) 0%, transparent 100%);
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border-radius: 0 6px 6px 0;
}

:deep(.markdown-body h3) {
  font-size: 1.15rem;
  color: #00f0ff;
  margin-top: 1.2rem;
}

:deep(.markdown-body h4) {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.95);
}

/* ── Paragraphs & Spacing ── */
:deep(.markdown-body p) {
  margin-bottom: 0.95rem;
}

:deep(.markdown-body p:last-child) {
  margin-bottom: 0;
}

/* ── Blockquotes ── */
:deep(.markdown-body blockquote) {
  margin: 1.2rem 0;
  padding: 0.8rem 1.2rem;
  background: rgba(0, 240, 255, 0.05);
  border-left: 4px solid #00f0ff;
  border-radius: 0 10px 10px 0;
  color: rgba(255, 255, 255, 0.85);
  box-shadow: inset 0 0 15px rgba(0, 240, 255, 0.03);
}

:deep(.markdown-body blockquote p) {
  margin-bottom: 0;
}

/* ── Lists ── */
:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  margin-left: 1.5em;
  margin-bottom: 1rem;
}

:deep(.markdown-body li) {
  margin-bottom: 0.45rem;
  line-height: 1.6;
}

:deep(.markdown-body ul li::marker) {
  color: #00f0ff;
}

:deep(.markdown-body ol li::marker) {
  color: #00f0ff;
  font-weight: bold;
  font-family: 'Rajdhani', sans-serif;
}

/* ── Horizontal Rule ── */
:deep(.markdown-body hr) {
  height: 1px;
  border: none;
  background: linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.5) 50%, transparent 100%);
  margin: 1.8rem 0;
}

/* ── Links ── */
:deep(.markdown-body a) {
  color: #00f0ff;
  text-decoration: none;
  border-bottom: 1px dashed rgba(0, 240, 255, 0.5);
  transition: all 0.2s ease;
  padding-bottom: 1px;
}

:deep(.markdown-body a:hover) {
  color: #ffffff;
  border-bottom-style: solid;
  border-bottom-color: #00f0ff;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.8);
}

/* ── Inline Code & Code Blocks ── */
:deep(.code-block-wrapper) {
  position: relative;
  margin: 1.2rem 0;
}

:deep(.code-copy-btn) {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.75rem;
  opacity: 0;
  transition: all 0.2s;
  z-index: 1;
}

:deep(.code-block-wrapper:hover .code-copy-btn) {
  opacity: 1;
}

:deep(.code-copy-btn:hover) {
  background: rgba(0, 240, 255, 0.2);
  border-color: rgba(0, 240, 255, 0.4);
  color: #00f0ff;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

:deep(.code-copy-btn.copied) {
  background: rgba(0, 255, 136, 0.2);
  border-color: rgba(0, 255, 136, 0.4);
  color: #00ff88;
  opacity: 1;
}

:deep(pre) {
  background: rgba(6, 11, 22, 0.85) !important;
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 10px;
  padding: 1.2rem;
  margin: 0;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

:deep(code) {
  font-family: 'JetBrains Mono', monospace;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.2);
  color: #70e0ff;
  padding: 0.2em 0.45em;
  border-radius: 5px;
  font-size: 0.88em;
}

:deep(pre code) {
  background: transparent;
  border: none;
  color: inherit;
  padding: 0;
  font-size: 0.9em;
}

:deep(.markdown-body strong) {
  color: #00f0ff;
  font-weight: 700;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.2);
}

:deep(.markdown-body em) {
  color: #c4f0ff;
  font-style: italic;
}

/* ── 消息操作栏 ── */
.message-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.message-row.assistant:hover .message-actions {
  opacity: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(0, 240, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.3);
  color: #00f0ff;
}

.action-label {
  letter-spacing: 0.02em;
}

.input-deck {
  flex-shrink: 0;
  position: relative;
  z-index: 20;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
}

.glass-capsule {
  position: relative;
  width: 100%;
  max-width: 800px;
  background: rgba(20, 30, 50, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  display: flex;
  align-items: flex-end;
  padding: 8px 12px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.glass-capsule.focused {
  background: rgba(20, 30, 50, 0.8);
  border-color: rgba(0, 240, 255, 0.5);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.15);
}

.capsule-glow {
  position: absolute;
  inset: -1px;
  border-radius: 30px;
  padding: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.glass-capsule.focused .capsule-glow {
  opacity: 1;
}

.stop-trigger, .shuffle-trigger, .clear-trigger, .send-trigger {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2px;
  flex-shrink: 0;
}

.shuffle-trigger:hover, .clear-trigger:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.stop-trigger {
  background: rgba(255, 80, 80, 0.15);
  color: rgba(255, 100, 100, 0.9);
  animation: pulse 1.5s infinite;
}

.stop-trigger:hover {
  background: rgba(255, 80, 80, 0.3);
  color: #ff6464;
  box-shadow: 0 0 15px rgba(255, 80, 80, 0.3);
}

.send-trigger {
  background: rgba(0, 240, 255, 0.1);
  color: #00f0ff;
}

.send-trigger:hover:not(:disabled) {
  background: #00f0ff;
  color: #000;
  box-shadow: 0 0 15px #00f0ff;
  transform: scale(1.05);
}

.send-trigger:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.holo-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px;
  padding: 10px 15px;
  line-height: 24px;
  min-height: 44px;
  max-height: 120px;
  resize: none;
  outline: none;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  align-items: center;
}

.holo-input::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.holo-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.loading-status {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem;
  color: rgba(0, 240, 255, 0.8);
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 0.1em;
  animation: fadeIn 0.5s ease;
}

.loading-label {
  font-size: 0.9rem;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
  animation: pulseText 1.5s infinite alternate;
}

@keyframes pulseText {
  from { opacity: 0.6; }
  to { opacity: 1; }
}

.quantum-loader {
  position: relative;
  width: 24px;
  height: 24px;
}

.quantum-loader .orbit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(0, 240, 255, 0.5);
  animation: orbitSpin 1.5s infinite linear;
}

.quantum-loader .orbit:nth-child(2) {
  border-color: rgba(120, 0, 255, 0.5);
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  animation-duration: 2s;
  animation-direction: reverse;
}

.quantum-loader .orbit:nth-child(3) {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border: none;
  background: rgba(0, 240, 255, 0.2);
  animation: pulse 1s infinite;
}

.quantum-loader .core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #fff;
}

@keyframes orbitSpin {
  0% { transform: rotate(0deg) rotateX(45deg); }
  100% { transform: rotate(360deg) rotateX(45deg); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes breathe {
  0%, 100% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.msg-enter-active,
.msg-leave-active {
  transition: all 0.4s ease;
}

.msg-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.thinking-block {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 12px;
  max-width: 100%;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
}

.thinking-header {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;
  outline: none;
}

.thinking-header:hover, .thinking-header:focus-visible {
  color: rgba(0, 240, 255, 0.8);
}

.thinking-icon {
  display: flex;
  align-items: center;
  color: #00f0ff;
  animation: pulse 1.5s infinite;
}

.thinking-title {
  font-weight: 600;
  letter-spacing: 0.05em;
}

.toggle-arrow {
  margin-left: auto;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  color: rgba(255, 255, 255, 0.3);
}

.toggle-arrow.expanded {
  transform: rotate(180deg);
}

.thinking-content {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed rgba(255, 255, 255, 0.05);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.6);
  white-space: pre-wrap;
  word-break: break-word;
}

.thinking-pulse-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.3), rgba(0, 240, 255, 0.9), rgba(0, 240, 255, 0.3));
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textShimmer 2s infinite linear;
}

/* 跳动省略号 */
.thinking-dots {
  display: inline-flex;
  align-items: baseline;
  gap: 3px;
  margin-left: 2px;
}

.thinking-dots .dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #00f0ff;
  box-shadow: 0 0 6px rgba(0, 240, 255, 0.6);
  animation: dotBounce 1.4s infinite ease-in-out both;
  -webkit-text-fill-color: initial;
}

.thinking-dots .dot:nth-child(1) { animation-delay: 0s; }
.thinking-dots .dot:nth-child(2) { animation-delay: 0.2s; }
.thinking-dots .dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.3;
  }
  40% {
    transform: translateY(-5px);
    opacity: 1;
  }
}

@keyframes textShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── 移动端响应式 ── */
@media (max-width: 768px) {
  .status-bar {
    height: 52px;
    padding: 0 1rem;
  }

  .model-info {
    gap: 0.6rem;
  }

  .ai-avatar-small {
    width: 28px;
    height: 28px;
  }

  .core-pulse {
    width: 10px;
    height: 10px;
  }

  .model-name {
    font-size: 0.85rem;
  }

  .status-text {
    font-size: 0.62rem;
  }

  .chat-viewport {
    padding: 1rem 0.8rem;
  }

  .messages-container {
    max-width: 100%;
  }

  /* 欢迎屏幕 */
  .welcome-screen {
    padding: 2rem 0.5rem;
  }

  .ai-core-container {
    width: 110px;
    height: 110px;
    margin-bottom: 1.5rem;
  }

  .ai-core-inner-ring {
    inset: 15px;
  }

  .ai-core-center {
    inset: 38px;
  }

  .welcome-title {
    font-size: 1.6rem;
    letter-spacing: 0.15em;
  }

  .welcome-subtitle {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    text-align: center;
  }

  .quick-prompts {
    gap: 0.5rem;
    padding: 0 0.5rem;
  }

  .prompt-chip {
    font-size: 0.78rem;
    padding: 0.45rem 0.8rem;
    border-radius: 16px;
  }

  /* 消息列表 */
  .message-row {
    margin-bottom: 1.2rem;
  }

  .message-content {
    max-width: 92%;
    gap: 0.6rem;
  }

  .ai-avatar {
    width: 30px;
    height: 30px;
  }

  .bubble {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
    line-height: 1.55;
    border-radius: 14px;
  }

  .message-row.assistant .bubble {
    padding: 0.8rem 1rem;
  }

  .message-meta {
    font-size: 0.68rem;
  }

  /* 思考块 */
  .thinking-block {
    padding: 8px 10px;
    margin-bottom: 8px;
  }

  .thinking-header {
    font-size: 0.78rem;
  }

  .thinking-content {
    font-size: 0.78rem;
    line-height: 1.45;
  }

  /* 消息操作栏 - 移动端始终显示 */
  .message-actions {
    opacity: 1;
  }

  .action-btn {
    padding: 3px 6px;
    font-size: 0.7rem;
  }

  .action-label {
    display: none;
  }

  /* 代码块 */
  :deep(.code-block-wrapper) {
    margin: 0.6rem 0;
  }

  :deep(.code-copy-btn) {
    opacity: 1;
  }

  :deep(pre) {
    padding: 0.7rem;
    font-size: 0.78rem;
  }

  :deep(.markdown-body) {
    font-size: 0.9rem;
  }

  /* 输入区域 */
  .input-deck {
    padding: 0.8rem 0.8rem;
    padding-bottom: calc(0.8rem + env(safe-area-inset-bottom, 0px));
  }

  .glass-capsule {
    max-width: 100%;
    border-radius: 22px;
    padding: 6px 8px;
  }

  .stop-trigger, .shuffle-trigger, .clear-trigger, .send-trigger {
    width: 34px;
    height: 34px;
  }

  .holo-input {
    font-size: 15px;
    padding: 8px 10px;
    min-height: 38px;
    line-height: 22px;
  }

  .loading-status {
    padding: 0.6rem;
    gap: 8px;
  }

  .loading-label {
    font-size: 0.78rem;
  }
}

@media (max-width: 380px) {
  .message-content {
    max-width: 95%;
  }

  .welcome-title {
    font-size: 1.3rem;
  }

  .prompt-chip {
    font-size: 0.72rem;
    padding: 0.4rem 0.65rem;
  }
}
</style>
