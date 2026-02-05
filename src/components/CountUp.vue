<template>
  <span>{{ displayedValue }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  to: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 2000
  },
  suffix: {
    type: String,
    default: ''
  },
  pad: {
    type: Number,
    default: 0
  },
  delay: {
    type: Number,
    default: 0
  }
})

const displayedValue = ref('')
const current = ref(0)

const animate = () => {
  // 初始值处理
  let startVal = 0

  // 格式化初始显示
  const format = (num) => {
    let s = Math.floor(num).toString()
    if (props.pad > 0) s = s.padStart(props.pad, '0')
    return s + props.suffix
  }

  displayedValue.value = format(startVal)

  setTimeout(() => {
    const startTimestamp = performance.now()
    const startValue = 0
    const endValue = props.to

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTimestamp) / props.duration, 1)

      // Easing function: easeOutExpo
      // const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4)

      current.value = startValue + (endValue - startValue) * easeProgress
      displayedValue.value = format(current.value)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, props.delay)
}

watch(() => props.to, () => {
  animate()
})

onMounted(() => {
  animate()
})
</script>
