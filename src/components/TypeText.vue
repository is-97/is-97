<template>
  <span class="type-text">
    {{ displayedText }}<span class="cursor" :class="{ typing: isTyping }">_</span>
  </span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    default: 50
  },
  delay: {
    type: Number,
    default: 0
  }
})

const displayedText = ref('')
const isTyping = ref(false)

const type = async () => {
  if (props.delay > 0) {
    await new Promise(resolve => setTimeout(resolve, props.delay))
  }

  isTyping.value = true
  displayedText.value = ''

  for (let i = 0; i < props.text.length; i++) {
    displayedText.value += props.text[i]
    // 随机速度增加真实感
    const randomSpeed = props.speed + (Math.random() * 20 - 10)
    await new Promise(resolve => setTimeout(resolve, randomSpeed))
  }

  isTyping.value = false
}

onMounted(() => {
  type()
})

watch(() => props.text, () => {
  type()
})
</script>

<style scoped>
.type-text {
  display: inline-block;
  white-space: pre-wrap;
}

.cursor {
  display: inline-block;
  color: var(--primary, #00f0ff);
  font-weight: bold;
  margin-left: 2px;
  opacity: 1;
  animation: blink 1s step-end infinite;
}

.cursor.typing {
  opacity: 1;
  animation: none;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>