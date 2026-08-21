<template>
  <div ref="container" class="three-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { gsap, isReducedMotion } from '../utils/gsap'

const container = ref(null)
let scene, camera, renderer, frameId
let particlesMesh
let wireframeMesh
let textMesh
let isVisible = true
let observer = null
let cameraTween = null

onMounted(() => {
  if (isReducedMotion()) {
    return
  }

  init()
  animate()
  window.addEventListener('resize', onWindowResize)

  // IntersectionObserver: 离开视口时暂停渲染
  observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting
    if (isVisible && !frameId) {
      animate()
    }
  }, { threshold: 0.1 })

  if (container.value) {
    observer.observe(container.value)
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (cameraTween) cameraTween.kill()
  cancelAnimationFrame(frameId)
  frameId = null
  window.removeEventListener('resize', onWindowResize)
  if (renderer) {
    renderer.dispose()
  }
})

const init = () => {
  if (!container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  scene = new THREE.Scene()

  // 透视相机：初始化在更远处，用 GSAP 推进镜头
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 7

  cameraTween = gsap.to(camera.position, {
    z: 4,
    duration: 1.8,
    ease: 'power3.out'
  })

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // 创建几何体 - 科技感线框球体
  const geometry = new THREE.IcosahedronGeometry(2, 2)

  // 线框材质
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  })

  wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial)
  scene.add(wireframeMesh)

  // 粒子系统
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 700

  const posArray = new Float32Array(particlesCount * 3)

  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 8
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  })

  particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // 添加 SZX 3D文字
  const loader = new FontLoader()
  loader.load('/fonts/helvetiker_bold.typeface.json', function (font) {
    const textGeo = new TextGeometry('SZX', {
      font: font,
      size: 0.8,
      depth: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    })

    textGeo.computeBoundingBox()
    const xOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)
    const yOffset = -0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y)
    const zOffset = -0.5 * (textGeo.boundingBox.max.z - textGeo.boundingBox.min.z)

    textGeo.translate(xOffset, yOffset, zOffset)

    const textMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })

    textMesh = new THREE.Mesh(textGeo, textMaterial)
    scene.add(textMesh)
  })
}

const animate = () => {
  if (!isVisible) {
    frameId = null
    return
  }

  frameId = requestAnimationFrame(animate)

  if (wireframeMesh) {
    wireframeMesh.rotation.x += 0.001
    wireframeMesh.rotation.y += 0.002
  }

  if (particlesMesh) {
    particlesMesh.rotation.y -= 0.0005
    particlesMesh.rotation.x -= 0.0002
  }

  if (textMesh) {
    textMesh.rotation.y -= 0.003
    textMesh.position.y = Math.sin(Date.now() * 0.001) * 0.1
  }

  renderer.render(scene, camera)
}

const onWindowResize = () => {
  if (!container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
}
</style>