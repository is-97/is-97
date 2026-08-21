<template>
  <span>{{ displayedValue }}</span>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { gsap, isReducedMotion } from '../utils/gsap'

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
const countObj = { value: 0 }
let tween = null

const format = (num) => {
  let s = Math.floor(num).toString()
  if (props.pad > 0) s = s.padStart(props.pad, '0')
  return s + props.suffix
}

const animate = () => {
  if (tween) tween.kill()

  if (isReducedMotion()) {
    displayedValue.value = format(props.to)
    return
  }

  countObj.value = 0
  displayedValue.value = format(0)

  tween = gsap.to(countObj, {
    value: props.to,
    duration: props.duration / 1000,
    delay: props.delay / 1000,
    ease: 'power3.out',
    onUpdate: () => {
      displayedValue.value = format(countObj.value)
    },
    onComplete: () => {
      displayedValue.value = format(props.to)
    }
  })
}

watch(() => props.to, () => {
  animate()
})

onMounted(() => {
  animate()
})

onBeforeUnmount(() => {
  if (tween) tween.kill()
})
</script>
