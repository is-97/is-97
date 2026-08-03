import { buildSystemPrompt } from '../data/systemPrompt.js'

const API_ENDPOINT = '/api/chat'

async function streamAI(endpoint, payload, onMessageChunk, signal) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    signal
  })

  if (!response.ok || !response.body) {
    let errorMsg = '响应异常，可能是 API Key 或服务器错误'
    try {
      const errData = await response.json()
      if (errData) {
        errorMsg = errData.error?.message || errData.error || errData.details || errData.message || errorMsg
      }
    } catch (_) {}
    throw new Error(errorMsg)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let partial = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    partial += chunk

    const lines = partial.split('\n')
    partial = lines.pop() || ''

    for (let line of lines) {
      line = line.trim()
      if (!line.startsWith('data:')) {
        continue
      }

      const jsonStr = line.replace(/^data:\s*/, '')
      if (jsonStr === '[DONE]') {
        return
      }

      try {
        const parsed = JSON.parse(jsonStr)
        const delta = parsed.choices?.[0]?.delta || {}
        if (delta.content || delta.reasoning_content) {
          onMessageChunk(delta)
        }
      } catch {
        // Ignore incomplete or non-JSON SSE frames
      }
    }
  }
}

export async function sendToAI(message, onMessageChunk, options = {}) {
  const systemPrompt = buildSystemPrompt()
  await streamAI(API_ENDPOINT, { message, systemPrompt, ...options }, onMessageChunk)
}

export async function sendToAIWithHistory(messages, onMessageChunk, options = {}) {
  const systemPrompt = buildSystemPrompt()
  const messagesWithSystem = [
    { role: 'system', content: systemPrompt },
    ...messages
  ]

  await streamAI(API_ENDPOINT, { messages: messagesWithSystem, ...options }, onMessageChunk, options.signal)
}
