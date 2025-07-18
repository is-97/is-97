<template>
  <div class="chat-interface">
    <!-- 聊天工具栏 -->
    <div class="chat-toolbar">
      <div class="toolbar-left">
        <h3 class="chat-title">AI 助手</h3>
        <span class="message-count">{{ messages.length }} 条消息</span>
      </div>
      <div class="toolbar-right">
        <button class="toolbar-btn" @click="toggleSearch" :title="'搜索消息'">
          <i class="fas fa-search"></i>
        </button>
        <ThemeToggle />
        <button class="toolbar-btn" @click="exportChat" :title="'导出聊天记录'">
          <i class="fas fa-download"></i>
        </button>
        <button class="toolbar-btn" @click="clearChat" :title="'清空聊天'">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="search-bar" v-if="showSearchBar">
      <div class="search-input-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input ref="searchInput" v-model="searchQuery" @input="handleSearch" placeholder="搜索消息内容..."
          class="search-input" />
        <button class="search-close-btn" @click="closeSearch">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="search-results" v-if="searchQuery && searchResults.length > 0">
        找到 {{ searchResults.length }} 条匹配的消息
      </div>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" :class="['message-container', message.role]">
        <div class="message-content">
          <div class="avatar">
            <div class="avatar-icon" :class="message.role">
              <i :class="message.role === 'user' ? 'fas fa-user' : 'fas fa-robot'"></i>
            </div>
          </div>
          <div class="message-wrapper">
            <div class="message-text" :class="{ 'typing': message.isTyping, 'error': message.isError }">
              <div v-if="message.isTyping && !message.content" class="typing-placeholder">
                <TypingIndicator />
              </div>
              <div v-else v-html="renderMessage(message.content)"></div>
              <div v-if="message.isTyping && message.content" class="typing-cursor">|</div>
            </div>
            <div class="message-meta" v-if="!message.isTyping">
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              <div class="message-actions">
                <button class="action-btn copy-btn" @click="copyMessage(message.content)" :title="'复制消息'">
                  <i class="fas fa-copy"></i>
                </button>
                <button class="action-btn edit-btn" @click="editMessage(index)" v-if="message.role === 'user'"
                  :title="'编辑消息'">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" @click="deleteMessage(index)" :title="'删除消息'">
                  <i class="fas fa-trash"></i>
                </button>
                <button class="action-btn regenerate-btn" @click="regenerateMessage(index)"
                  v-if="message.role === 'assistant'" :title="'重新生成'">
                  <i class="fas fa-redo"></i>
                </button>
              </div>
            </div>
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

    <!-- 快速回复建议 -->
    <div class="quick-replies" v-if="showQuickReplies && messages.length <= 1">
      <div class="quick-reply-title">试试这些问题：</div>
      <div class="quick-reply-buttons">
        <button v-for="(reply, index) in quickReplies" :key="index" class="quick-reply-btn"
          @click="sendQuickReply(reply)" :disabled="isLoading">
          {{ reply }}
        </button>
      </div>
    </div>

    <div class="chat-input-container">
      <div class="input-wrapper">
        <div class="input-controls">
          <FileUpload ref="fileUploadRef" @files-selected="handleFilesSelected" @files-removed="handleFilesRemoved" />
        </div>
        <textarea ref="inputArea" v-model="userInput" @keydown="handleKeydown" @input="autoResize"
          placeholder="输入消息... (Ctrl+Enter 发送)" :disabled="isLoading" rows="1"></textarea>
        <button class="send-button" @click="handleSend" :disabled="!canSend || isLoading">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>

    <!-- Toast 提示 -->
    <Toast :message="toastMessage" :type="toastType" :show="showToast" @close="showToast = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { sendToAI } from '../services/aiService'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import FileUpload from './FileUpload.vue'
import Toast from './Toast.vue'
import TypingIndicator from './TypingIndicator.vue'
import ThemeToggle from './ThemeToggle.vue'

// 配置marked使用highlight.js
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(code, { language: lang }).value
        return `<div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-language">${lang}</span>
            <button class="copy-code-btn" onclick="copyCodeBlock(this)" title="复制代码">
              <i class="fas fa-copy"></i>
            </button>
          </div>
          <pre><code class="hljs language-${lang}">${highlighted}</code></pre>
        </div>`
      } catch (e) {
        // 语法高亮失败，使用原始代码
      }
    }
    return `<div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-language">text</span>
        <button class="copy-code-btn" onclick="copyCodeBlock(this)" title="复制代码">
          <i class="fas fa-copy"></i>
        </button>
      </div>
      <pre><code class="hljs">${code}</code></pre>
    </div>`
  },
  breaks: true,
  gfm: true
})

// 将消息内容转换为HTML
const renderMessage = (content) => {
  try {
    return marked(content)
  } catch (e) {
    return content
  }
}

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)
const inputArea = ref(null)
const fileUploadRef = ref(null)
const selectedFiles = ref([])

// Toast 相关状态
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// 快速回复相关状态
const showQuickReplies = ref(true)
const quickReplies = ref([
  '你好，请介绍一下自己',
  '帮我写一段代码',
  '解释一个概念',
  '翻译一段文字',
  '总结一篇文章',
  '创作一个故事'
])

// 搜索相关状态
const showSearchBar = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const searchInput = ref(null)

// 计算是否可以发送消息
const canSend = computed(() => {
  return userInput.value.trim() || selectedFiles.value.length > 0
})

// 显示提示消息
const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
}

// 格式化时间
const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  // 如果是今天
  if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 如果是昨天
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()) {
    return '昨天 ' + date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 其他日期
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const autoResize = () => {
  const textarea = inputArea.value
  if (textarea) {
    textarea.style.height = 'auto'
    const newHeight = Math.min(textarea.scrollHeight, 150)
    textarea.style.height = newHeight + 'px'
  }
}

// 处理键盘事件
const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    if (event.ctrlKey || event.metaKey) {
      // Ctrl+Enter 或 Cmd+Enter 发送消息
      event.preventDefault()
      handleSend()
    } else if (!event.shiftKey) {
      // 单独的 Enter 键也发送消息（如果不按住 Shift）
      event.preventDefault()
      handleSend()
    }
    // Shift+Enter 允许换行，不做任何处理
  }
}

const scrollToBottom = async (smooth = true) => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    })
  }
}

// 复制消息到剪贴板
const copyMessage = async (content) => {
  try {
    // 移除HTML标签，获取纯文本
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const plainText = tempDiv.textContent || tempDiv.innerText || ''

    await navigator.clipboard.writeText(plainText)
    showToastMessage('消息已复制到剪贴板', 'success')
  } catch (err) {
    showToastMessage('复制失败，请重试', 'error')
  }
}

// 编辑消息
const editMessage = (messageIndex) => {
  const message = messages.value[messageIndex]
  if (message.role !== 'user') return

  // 将消息内容放回输入框
  userInput.value = message.content

  // 删除该消息及其后面的所有消息
  messages.value.splice(messageIndex)

  // 聚焦输入框
  nextTick(() => {
    if (inputArea.value) {
      inputArea.value.focus()
      autoResize()
    }
  })

  showToastMessage('消息已加载到输入框，可以重新编辑', 'info')
}

// 删除消息
const deleteMessage = (messageIndex) => {
  if (confirm('确定要删除这条消息吗？')) {
    messages.value.splice(messageIndex, 1)
    showToastMessage('消息已删除', 'success')
  }
}

// 重新生成消息
const regenerateMessage = async (messageIndex) => {
  if (isLoading.value) return

  // 找到对应的用户消息
  let userMessageIndex = messageIndex - 1
  while (userMessageIndex >= 0 && messages.value[userMessageIndex].role !== 'user') {
    userMessageIndex--
  }

  if (userMessageIndex < 0) return

  const userMessage = messages.value[userMessageIndex].content

  // 删除当前的assistant消息
  messages.value.splice(messageIndex, 1)

  // 重新发送请求
  await sendAIMessage(userMessage)
}

// 清空聊天
const clearChat = () => {
  if (confirm('确定要清空所有聊天记录吗？此操作不可撤销。')) {
    messages.value = [
      {
        role: 'assistant',
        content: '你好！我是 AI 助手，很高兴为你服务。',
        timestamp: Date.now()
      }
    ]
    showToastMessage('聊天记录已清空', 'success')
  }
}

// 导出聊天记录
const exportChat = () => {
  try {
    const chatData = {
      exportTime: new Date().toISOString(),
      messageCount: messages.value.length,
      messages: messages.value.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        time: formatTime(msg.timestamp)
      }))
    }

    const dataStr = JSON.stringify(chatData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`
    link.click()

    URL.revokeObjectURL(link.href)
    showToastMessage('聊天记录已导出', 'success')
  } catch (error) {
    showToastMessage('导出失败，请重试', 'error')
  }
}

// 发送快速回复
const sendQuickReply = (reply) => {
  userInput.value = reply
  showQuickReplies.value = false
  handleSend()
}

// 切换搜索栏
const toggleSearch = () => {
  showSearchBar.value = !showSearchBar.value
  if (showSearchBar.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    searchQuery.value = ''
    searchResults.value = []
  }
}

// 关闭搜索
const closeSearch = () => {
  showSearchBar.value = false
  searchQuery.value = ''
  searchResults.value = []
}

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  const query = searchQuery.value.toLowerCase()
  searchResults.value = messages.value.filter((message) => {
    const content = message.content.toLowerCase()
    return content.includes(query)
  }).map((message) => ({
    ...message,
    originalIndex: messages.value.indexOf(message)
  }))
}

// 发送AI消息的通用函数
const sendAIMessage = async (userMessage) => {
  isLoading.value = true
  try {
    // 添加一个空的 assistant 消息，用于逐步填充内容
    messages.value.push({
      role: 'assistant',
      content: '',
      isTyping: true,
      timestamp: Date.now()
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
    // 移除失败的消息
    if (messages.value.length > 0 && messages.value[messages.value.length - 1].role === 'assistant') {
      messages.value.pop()
    }
    messages.value.push({
      role: 'assistant',
      content: '抱歉，我遇到了一些问题。请稍后再试。',
      isError: true,
      timestamp: Date.now()
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

// 处理文件选择
const handleFilesSelected = (files) => {
  selectedFiles.value = files
}

// 处理文件移除
const handleFilesRemoved = (files) => {
  selectedFiles.value = files
}

// 处理文件内容读取
const readFileContent = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file)
    } else {
      reader.readAsText(file)
    }
  })
}

const handleSend = async () => {
  if (!canSend.value || isLoading.value) return

  const userMessage = userInput.value.trim()
  let messageContent = userMessage

  // 处理文件内容
  if (selectedFiles.value.length > 0) {
    const fileContents = []

    for (const file of selectedFiles.value) {
      try {
        const content = await readFileContent(file)
        if (file.type.startsWith('image/')) {
          fileContents.push(`![${file.name}](${content})`)
        } else {
          fileContents.push(`**文件: ${file.name}**\n\`\`\`\n${content}\n\`\`\``)
        }
      } catch (error) {
        fileContents.push(`**文件: ${file.name}** (读取失败)`)
      }
    }

    if (fileContents.length > 0) {
      messageContent = fileContents.join('\n\n') + (userMessage ? '\n\n' + userMessage : '')
    }
  }

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: messageContent,
    timestamp: Date.now()
  })

  // 清空输入框、文件和重置高度
  userInput.value = ''
  selectedFiles.value = []
  fileUploadRef.value?.clearFiles()

  if (inputArea.value) {
    inputArea.value.style.height = 'auto'
    // 自动聚焦输入框
    inputArea.value.focus()
  }

  await scrollToBottom()

  // 发送到 AI 并获取响应
  await sendAIMessage(messageContent)

  // AI 回复后再次聚焦输入框
  if (inputArea.value) {
    inputArea.value.focus()
  }
}

onMounted(() => {
  messages.value = [
    {
      role: 'assistant',
      content: '你好！我是 AI 助手，很高兴为你服务。',
      timestamp: Date.now()
    }
  ]
  // 组件加载时自动聚焦输入框
  if (inputArea.value) {
    inputArea.value.focus()
  }

  // 添加全局代码块复制函数
  window.copyCodeBlock = async (button) => {
    const codeBlock = button.closest('.code-block-wrapper').querySelector('code')
    const code = codeBlock.textContent || codeBlock.innerText

    try {
      await navigator.clipboard.writeText(code)
      button.innerHTML = '<i class="fas fa-check"></i>'
      button.style.color = '#10b981'
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-copy"></i>'
        button.style.color = ''
      }, 2000)
    } catch (err) {
      // 复制失败，忽略错误
    }
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

/* 聊天工具栏样式 */
.chat-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chat-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.message-count {
  font-size: 0.875rem;
  color: var(--text-secondary);
  background: var(--background-color);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.toolbar-right {
  display: flex;
  gap: 0.5rem;
}

.toolbar-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}

.toolbar-btn:hover {
  background: var(--background-color);
  color: var(--text-primary);
  border-color: var(--primary-color);
}

/* 快速回复样式 */
.quick-replies {
  padding: 1.5rem 2rem;
  background: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
}

.quick-reply-title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 500;
}

.quick-reply-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.quick-reply-btn {
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.quick-reply-btn:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.quick-reply-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 搜索栏样式 */
.search-bar {
  padding: 1rem 2rem;
  background: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
  animation: slideDown 0.3s ease-out;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.75rem;
  gap: 0.75rem;
  transition: border-color 0.2s ease;
}

.search-input-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-close-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.search-close-btn:hover {
  background: var(--border-color);
  color: var(--text-primary);
}

.search-results {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  padding: 0.5rem;
  background: var(--background-color);
  border-radius: 0.375rem;
  border: 1px solid var(--border-color);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.message-wrapper {
  flex: 1;
  position: relative;
}

.message-wrapper:hover .message-actions {
  opacity: 1;
}

.message-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.message-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0.7;
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

.typing-placeholder {
  opacity: 0.8;
}

.typing-cursor {
  display: inline-block;
  color: var(--primary-color);
  font-weight: bold;
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

.message-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.action-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.375rem;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
}

.action-btn:hover {
  background: var(--surface-color);
  color: var(--text-primary);
  border-color: var(--primary-color);
}

.action-btn:active {
  transform: scale(0.95);
}

.copy-btn:hover {
  color: #10b981;
  border-color: #10b981;
}

.regenerate-btn:hover {
  color: #f59e0b;
  border-color: #f59e0b;
}

.edit-btn:hover {
  color: #3b82f6;
  border-color: #3b82f6;
}

.delete-btn:hover {
  color: #ef4444;
  border-color: #ef4444;
}

/* 代码块样式 */
.code-block-wrapper {
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #1e1e1e;
  border: 1px solid var(--border-color);
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #404040;
}

.code-language {
  font-size: 0.875rem;
  color: #a0a0a0;
  font-weight: 500;
}

.copy-code-btn {
  background: transparent;
  border: 1px solid #404040;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: #a0a0a0;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.copy-code-btn:hover {
  background: #404040;
  color: white;
  border-color: #606060;
}

.code-block-wrapper pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  background: #1e1e1e;
}

.code-block-wrapper code {
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* 表格样式 */
.message-text table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: var(--surface-color);
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.message-text th,
.message-text td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.message-text th {
  background: var(--primary-color);
  color: white;
  font-weight: 600;
}

.message-text tr:last-child td {
  border-bottom: none;
}

.message-text tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.02);
}

/* 引用样式 */
.message-text blockquote {
  margin: 1rem 0;
  padding: 1rem;
  border-left: 4px solid var(--primary-color);
  background: var(--surface-color);
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
}

/* 列表样式 */
.message-text ul,
.message-text ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.message-text li {
  margin: 0.5rem 0;
  line-height: 1.6;
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

.input-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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