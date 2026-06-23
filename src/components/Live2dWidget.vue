<template>
  <div 
    ref="nekoRef" 
    class="oneko" 
    :style="nekoStyle"
    @click="wakeUp"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const nekoRef = ref(null)
const isHovered = ref(false)

// Current position of the cat
const nekoX = ref(window.innerWidth - 100)
const nekoY = ref(window.innerHeight - 150)

// Speed and animation frame states
const nekoSpeed = 8
let frameCount = 0
let idleTime = 0
let idleAnimation = null
let idleAnimationFrame = 0

// Mouse coordinates
let mouseX = window.innerWidth - 100
let mouseY = window.innerHeight - 150

// Sprite coordinates mapping (each column is -32px, each row is -32px)
const spriteSets = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
}

// Current animation frame values
const spriteX = ref(-96)
const spriteY = ref(-96)

const nekoStyle = computed(() => ({
  transform: `translate3d(${nekoX.value}px, ${nekoY.value}px, 0) ${isHovered.value ? 'scale(1.1)' : 'scale(1)'}`,
  backgroundPosition: `${spriteX.value}px ${spriteY.value}px`,
}))

// Function to change current sprite frame
const setSprite = (name, frame) => {
  const set = spriteSets[name]
  const sprite = set[frame % set.length]
  spriteX.value = sprite[0] * 32
  spriteY.value = sprite[1] * 32
}

// Wake up the cat if clicked
const wakeUp = () => {
  idleTime = 0
  idleAnimation = null
}

let animationFrameId = null
let lastUpdateTime = 0

const handleMouseMove = (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
}

const updateNeko = () => {
  frameCount++

  const diffX = nekoX.value - mouseX
  const diffY = nekoY.value - mouseY
  const distance = Math.sqrt(diffX * diffX + diffY * diffY)

  // If cat reaches the mouse
  if (distance < nekoSpeed || distance < 48) {
    idleTime++

    // Idle behavior states
    if (idleAnimation) {
      setSprite(idleAnimation, idleAnimationFrame)
      idleAnimationFrame++
      
      if (idleAnimation === 'sleeping' && idleTime > 120) {
        // Sleep for a long time, then wake up or keep sleeping
        if (Math.random() < 0.01) {
          wakeUp()
        }
      }
    } else if (idleTime > 10) {
      let anim = 'idle'
      if (Math.random() < 0.1) {
        // Decide what to do: scratch or sleep
        const choice = Math.random()
        if (choice < 0.35) {
          anim = 'scratchSelf'
        } else if (choice < 0.7) {
          // Check if near walls to scratch them
          if (nekoX.value < 32) anim = 'scratchWallW'
          else if (nekoY.value < 32) anim = 'scratchWallN'
          else if (nekoX.value > window.innerWidth - 64) anim = 'scratchWallE'
          else if (nekoY.value > window.innerHeight - 64) anim = 'scratchWallS'
          else anim = 'scratchSelf'
        } else {
          anim = 'sleeping'
        }
      } else {
        anim = 'tired'
      }
      
      // Start chosen idle animation
      if (anim === 'sleeping' || anim === 'scratchSelf' || anim.startsWith('scratchWall')) {
        idleAnimation = anim
        idleAnimationFrame = 0
      } else {
        setSprite(anim, frameCount)
      }
    } else {
      setSprite('idle', frameCount)
    }
    return
  }

  // If mouse moved, reset idle states
  if (idleTime > 0) {
    // If was sleeping or tired, show alert (exclamation mark) first
    if (idleAnimation === 'sleeping' || idleTime > 15) {
      setSprite('alert', 0)
      idleTime = -10 // Keep alert state for 10 frames
      idleAnimation = null
      return
    }
  }

  // In alert state, count frames to transition to chase
  if (idleTime < 0) {
    idleTime++
    return
  }

  // Reset idle state
  idleTime = 0
  idleAnimation = null

  // Calculate direction and angle
  let direction = ''
  if (diffY > 16) direction += 'N'
  else if (diffY < -16) direction += 'S'
  
  if (diffX > 16) direction += 'W'
  else if (diffX < -16) direction += 'E'

  setSprite(direction || 'idle', frameCount)

  // Move towards mouse
  const speed = distance > 150 ? nekoSpeed * 1.5 : nekoSpeed
  nekoX.value -= (diffX / distance) * speed
  nekoY.value -= (diffY / distance) * speed
}

const animateNeko = (timestamp) => {
  if (!lastUpdateTime) lastUpdateTime = timestamp
  const elapsed = timestamp - lastUpdateTime
  
  if (elapsed >= 120) {
    updateNeko()
    lastUpdateTime = timestamp
  }
  animationFrameId = requestAnimationFrame(animateNeko)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  animationFrameId = requestAnimationFrame(animateNeko)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.oneko {
  position: fixed;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  background-image: url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif');
  background-repeat: no-repeat;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  z-index: 999999;
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.1s ease;
}
</style>
