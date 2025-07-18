<template>
  <Teleport to="body">
    <div v-if="visible" class="toast-container" :class="type">
      <div class="toast-content">
        <i :class="iconClass"></i>
        <span>{{ message }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)

const iconClass = computed(() => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  }
  return icons[props.type]
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    visible.value = true
    setTimeout(() => {
      visible.value = false
      emit('close')
    }, props.duration)
  }
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  animation: slideIn 0.3s ease-out;
  max-width: 400px;
}

.toast-container.success {
  background: rgba(16, 185, 129, 0.9);
  color: white;
  border: 1px solid #10b981;
}

.toast-container.error {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: 1px solid #ef4444;
}

.toast-container.warning {
  background: rgba(245, 158, 11, 0.9);
  color: white;
  border: 1px solid #f59e0b;
}

.toast-container.info {
  background: rgba(59, 130, 246, 0.9);
  color: white;
  border: 1px solid #3b82f6;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
