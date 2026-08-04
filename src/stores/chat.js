import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'chat-history'
const MAX_MESSAGES = 200

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isLoading = ref(false)
  const sessionId = ref(Date.now().toString())

  const hasHistory = computed(() => messages.value.length > 0)
  const messageCount = computed(() => messages.value.length)

  function loadMessages() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          messages.value = parsed.slice(-MAX_MESSAGES).map(m => ({
            ...m,
            isTyping: false,
            displayedContent: m.content || '',
            displayedReasoning: m.reasoning || ''
          }))
        } else {
          messages.value = []
        }
      }
    } catch {
      messages.value = []
    }
  }

  function saveMessages() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value.slice(-MAX_MESSAGES)))
    } catch {
      // Storage might be full
    }
  }

  function addUserMessage(content) {
    const msg = {
      role: 'user',
      content,
      timestamp: Date.now()
    }
    messages.value.push(msg)
    saveMessages()
    return msg
  }

  function addAssistantMessage() {
    const msg = {
      role: 'assistant',
      content: '',
      reasoning: '',
      displayedContent: '',
      displayedReasoning: '',
      showReasoning: true,
      isTyping: true,
      timestamp: Date.now()
    }
    messages.value.push(msg)
    return msg
  }

  function appendToLastMessage(chunk) {
    const last = messages.value[messages.value.length - 1]
    if (last && last.role === 'assistant') {
      last.content += chunk
    }
  }

  function appendReasoningToLastMessage(chunk) {
    const last = messages.value[messages.value.length - 1]
    if (last && last.role === 'assistant') {
      last.reasoning += chunk
    }
  }

  function finalizeLastMessage() {
    const last = messages.value[messages.value.length - 1]
    if (last && last.role === 'assistant') {
      last.isTyping = false
      saveMessages()
    }
  }

  function removeLastAssistantMessage() {
    const last = messages.value[messages.value.length - 1]
    if (last && last.role === 'assistant') {
      messages.value.pop()
      saveMessages()
    }
  }

  function clearMessages() {
    messages.value = []
    sessionId.value = Date.now().toString()
    localStorage.removeItem(STORAGE_KEY)
  }

  function getMessagesForAPI() {
    return messages.value
      .filter(m => !m.isTyping && m.content.trim())
      .map(m => ({
        role: m.role,
        content: m.content
      }))
      .slice(-20)
  }

  function setLoading(value) {
    isLoading.value = value
  }

  function updateDisplayedContent(index, val) {
    const msg = messages.value[index]
    if (msg) {
      msg.displayedContent = val
    }
  }

  function updateDisplayedReasoning(index, val) {
    const msg = messages.value[index]
    if (msg) {
      msg.displayedReasoning = val
    }
  }

  return {
    messages,
    isLoading,
    sessionId,
    hasHistory,
    messageCount,
    loadMessages,
    saveMessages,
    addUserMessage,
    addAssistantMessage,
    appendToLastMessage,
    appendReasoningToLastMessage,
    finalizeLastMessage,
    removeLastAssistantMessage,
    clearMessages,
    getMessagesForAPI,
    setLoading,
    updateDisplayedContent,
    updateDisplayedReasoning
  }
})
