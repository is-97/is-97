<template>
  <div class="chat-interface">
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" :class="['message-container', message.role]">
        <div class="message-content">
          <div class="avatar">
            <div class="avatar-icon" :class="message.role">
              <i :class="message.role === 'user' ? 'fas fa-user' : 'fas fa-robot'"></i>
            </div>
          </div>
          <div class="message-text" :class="{ 'typing': message.isTyping, 'error': message.isError }"
            v-html="renderMessage(message.content)">
          </div>
        </div>
      </div>
      <!-- <div v-if="isLoading" class="message-container assistant">
        <div class="message-content">
          <div class="avatar">
            <div class="avatar-icon assistant">
              <i class="fas fa-robot"></i>
            </div>
          </div>
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div> -->
    </div>

    <div class="chat-input-container">
      <div class="input-wrapper">
        <textarea ref="inputArea" v-model="userInput" @keydown.enter.prevent="handleSend" @input="autoResize"
          placeholder="输入消息..." :disabled="isLoading" rows="1"></textarea>
        <button class="send-button" @click="handleSend" :disabled="!userInput.trim() || isLoading">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { sendToAI } from '../services/aiService'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// 配置marked使用highlight.js
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (e) {
        console.error(e)
      }
    }
    return code // 如果没有指定语言或发生错误，返回原始代码
  }
})

// 将消息内容转换为HTML
const renderMessage = (content) => {
  try {
    return marked(content)
  } catch (e) {
    console.error('Markdown parsing error:', e)
    return content
  }
}

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)
const inputArea = ref(null)

const autoResize = () => {
  const textarea = inputArea.value
  if (textarea) {
    textarea.style.height = 'auto'
    const newHeight = Math.min(textarea.scrollHeight, 150)
    textarea.style.height = newHeight + 'px'
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const handleSend = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const userMessage = userInput.value.trim()

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: userMessage
  })

  // 清空输入框并重置高度
  userInput.value = ''
  if (inputArea.value) {
    inputArea.value.style.height = 'auto'
    // 自动聚焦输入框
    inputArea.value.focus()
  }

  await scrollToBottom()

  // 发送到 AI 并获取响应
  isLoading.value = true
  try {
    // 添加一个空的 assistant 消息，用于逐步填充内容
    messages.value.push({
      role: 'assistant',
      content: '',
      isTyping: true
    })
    await scrollToBottom() // 确保空的 assistant 消息可见

    await sendToAI(userMessage, (chunk) => {
      // 在这里逐步更新 assistant 消息的内容
      if (messages.value.length > 0 && messages.value[messages.value.length - 1].role === 'assistant') {
        messages.value[messages.value.length - 1].content += chunk
      }
    })

    // 流结束后，移除 typing 指示器
    if (messages.value.length > 0 && messages.value[messages.value.length - 1].role === 'assistant') {
      messages.value[messages.value.length - 1].isTyping = false
    }

  } catch (error) {
    messages.value.push({
      role: 'assistant',
      content: '抱歉，我遇到了一些问题。请稍后再试。',
      isError: true
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
    // AI 回复后再次聚焦输入框
    if (inputArea.value) {
      inputArea.value.focus()
    }
  }
}

onMounted(() => {
  messages.value = [
    {
      role: 'assistant',
      content: '你好！我是 AI 助手，很高兴为你服务。'
    }
  ]
  // 组件加载时自动聚焦输入框
  if (inputArea.value) {
    inputArea.value.focus()
  }
})
</script>

<style scoped>
/* 样式保持不变 */
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  padding-bottom: calc(80px + 2rem);
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.message-container {
  margin-bottom: 1.5rem;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  max-width: 80%;
}

.user .message-content {
  margin-left: auto;
  flex-direction: row-reverse;
}

.avatar {
  flex-shrink: 0;
}

.avatar-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.avatar-icon.user {
  background: var(--primary-color);
  color: white;
}

.avatar-icon.assistant {
  background: var(--secondary-color);
  color: white;
}

.message-text {
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
}

.user .message-text {
  background: var(--primary-color);
  color: white;
  border-top-right-radius: 0;
}

.assistant .message-text {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-top-left-radius: 0;
}

.message-text.error {
  background: #ef4444;
  color: white;
  border: none;
}

.chat-input-container {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--surface-color);
  border-top: 1px solid var(--border-color);
  padding: 1.5rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 10;
}

.input-wrapper {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  background: var(--background);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 0.5rem 0.75rem;
  min-height: 3rem;
  max-height: 200px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.input-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  padding: 0.5rem;
  min-height: 24px;
  max-height: 150px;
  overflow-y: auto;
  margin: 0;
  font-family: inherit;
}

textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.send-button {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  padding: 0;
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05);
  background: var(--primary-color-hover, color-mix(in srgb, var(--primary-color) 85%, white));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.send-button:active:not(:disabled) {
  transform: scale(0.95);
}

.send-button:disabled {
  background: var(--border-color);
  cursor: not-allowed;
  opacity: 0.7;
}

.send-button i {
  font-size: 1.1rem;
}

.typing-indicator {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  border-top-left-radius: 0;
}

.typing-indicator span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--secondary-color);
  animation: typing 1.4s infinite;
  opacity: 0.4;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.5rem);
    opacity: 0.8;
  }
}

.message-text.typing {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(pre) {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

:deep(code) {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

:deep(p) {
  margin: 0.5rem 0;
}

:deep(pre code) {
  display: block;
  padding: 0;
  background: none;
  border: none;
}

:deep(code:not(pre code)) {
  background: var(--surface-color);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.85em;
}

:deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}

:deep(ul),
:deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

:deep(li) {
  margin: 0.25rem 0;
}
</style>