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
                    <span v-if="msg.isTyping && !msg.content" class="thinking-pulse-text">AI 正在思考中...</span>
                    <span v-else-if="msg.isTyping" class="cursor">_</span>
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
        <div class="upload-trigger" title="上传文件" aria-label="上传文件" role="button" tabindex="0">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </div>

        <button class="clear-trigger" @click="clearChat" title="清除聊天记录" aria-label="清除聊天记录">
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
import { ref, computed, nextTick, onMounted } from 'vue'
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
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  langPrefix: 'hljs language-',
  breaks: true
})

const chatStore = useChatStore()
const mdCache = new Map()
const inputMessage = ref('')
const isFocused = ref(false)
const viewportRef = ref(null)
const inputRef = ref(null)
const bottomAnchorRef = ref(null)

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
  quickPrompts.value = quickPromptPool.slice(0, 6)
}

const formatTime = (ts) => {
  if (!ts) return ''
  return new Date(ts).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const renderMarkdown = (content) => {
  if (!content) return ''
  const key = content.length + '_' + content.slice(0, 50)
  if (mdCache.has(key)) return mdCache.get(key)
  const html = DOMPurify.sanitize(marked.parse(content))
  mdCache.set(key, html)
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

  try {
    const apiMessages = chatStore.getMessagesForAPI()

    await sendToAIWithHistory(apiMessages, (chunk) => {
      appendAssistantChunk(aiMsgIndex, chunk)
    })
  } catch (err) {
    chatStore.appendToLastMessage('\n\n[Error: 连接中断或超时，请检查网络连接]')
  } finally {
    chatStore.setLoading(false)
    chatStore.finalizeLastMessage()
    await scrollToBottom()
    nextTick(() => inputRef.value?.focus())
  }
}

onMounted(() => {
  chatStore.loadMessages()
  if (!chatStore.hasHistory) {
    refreshQuickPrompts()
  }
  inputRef.value?.focus()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

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
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.3);
  backdrop-filter: blur(8px);
  color: #fff;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 240, 255, 0.1);
}

.message-row.assistant .bubble {
  background: transparent;
  padding-left: 0;
  color: rgba(255, 255, 255, 0.9);
}

.ai-text {
  font-family: 'JetBrains Mono', monospace;
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
  color: inherit;
  font-size: 1rem;
}

:deep(pre) {
  background: rgba(0, 0, 0, 0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  backdrop-filter: blur(5px);
}

:deep(code) {
  font-family: 'JetBrains Mono', monospace;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}

:deep(pre code) {
  background: transparent;
  padding: 0;
}

:deep(p) {
  margin-bottom: 0.8em;
}

:deep(ul), :deep(ol) {
  margin-left: 1.5em;
  margin-bottom: 0.8em;
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
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.glass-capsule.focused .capsule-glow {
  opacity: 1;
}

.upload-trigger, .clear-trigger, .send-trigger {
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
}

.upload-trigger:hover, .clear-trigger:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
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
  color: rgba(0, 240, 255, 0.6);
  letter-spacing: 0.05em;
  animation: pulseText 1.5s infinite alternate;
}
</style>
