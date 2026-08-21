import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * 判断是否开启了减少动画偏好
 */
export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 为 DOM 元素绑定高性能 3D 卡片倾斜与高光跟随效果
 * @param {HTMLElement} cardEl 卡片容器
 * @param {Object} options 配置项
 * @returns {Function} 清理函数
 */
export const bindCardTilt = (cardEl, options = {}) => {
  if (!cardEl || isReducedMotion()) return () => {}

  const {
    maxTilt = 8,        // 最大倾斜角度 (deg)
    perspective = 1000,  // 视距 (px)
    scale = 1.02,       // hover 时缩放比例
    speed = 0.4,        // 跟随速度 (秒)
    resetSpeed = 0.8,   // 复位速度 (秒)
    glare = true        // 是否增加高光跟随
  } = options

  // 设置基础 3D 视距
  gsap.set(cardEl, {
    transformPerspective: perspective,
    transformStyle: 'preserve-3d'
  })

  let bounds = null

  const onMouseEnter = () => {
    bounds = cardEl.getBoundingClientRect()
    gsap.to(cardEl, {
      scale,
      duration: speed,
      ease: 'power2.out'
    })
  }

  const onMouseMove = (e) => {
    if (!bounds) bounds = cardEl.getBoundingClientRect()

    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top
    const centerX = bounds.width / 2
    const centerY = bounds.height / 2

    // 计算倾斜角度
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    gsap.to(cardEl, {
      rotateX,
      rotateY,
      duration: speed,
      ease: 'power1.out',
      overwrite: 'auto'
    })

    if (glare) {
      const glarePercentX = (x / bounds.width) * 100
      const glarePercentY = (y / bounds.height) * 100
      cardEl.style.setProperty('--glare-x', `${glarePercentX}%`)
      cardEl.style.setProperty('--glare-y', `${glarePercentY}%`)
    }
  }

  const onMouseLeave = () => {
    bounds = null
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: resetSpeed,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto'
    })
  }

  cardEl.addEventListener('mouseenter', onMouseEnter)
  cardEl.addEventListener('mousemove', onMouseMove)
  cardEl.addEventListener('mouseleave', onMouseLeave)

  return () => {
    cardEl.removeEventListener('mouseenter', onMouseEnter)
    cardEl.removeEventListener('mousemove', onMouseMove)
    cardEl.removeEventListener('mouseleave', onMouseLeave)
  }
}

export { gsap, ScrollTrigger }
export default gsap
