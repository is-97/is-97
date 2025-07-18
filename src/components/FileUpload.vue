<template>
  <div class="file-upload-container">
    <!-- 文件上传按钮 -->
    <button class="upload-btn" @click="triggerFileInput" :disabled="isUploading">
      <i class="fas fa-paperclip"></i>
    </button>
    
    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*,.pdf,.doc,.docx,.txt,.md,.json,.csv,.xlsx,.xls"
      @change="handleFileSelect"
      style="display: none"
    />
    
    <!-- 文件预览区域 -->
    <div v-if="selectedFiles.length > 0" class="file-preview-area">
      <div v-for="(file, index) in selectedFiles" :key="index" class="file-preview-item">
        <div class="file-info">
          <div class="file-icon">
            <i :class="getFileIcon(file.type)"></i>
          </div>
          <div class="file-details">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
          </div>
        </div>
        <button class="remove-file-btn" @click="removeFile(index)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    
    <!-- 图片预览 -->
    <div v-if="imagePreviewUrls.length > 0" class="image-preview-area">
      <div v-for="(url, index) in imagePreviewUrls" :key="index" class="image-preview-item">
        <img :src="url" :alt="selectedFiles[index]?.name" />
        <button class="remove-image-btn" @click="removeFile(index)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['files-selected', 'files-removed'])

const fileInput = ref(null)
const selectedFiles = ref([])
const isUploading = ref(false)

// 计算图片预览URL
const imagePreviewUrls = computed(() => {
  return selectedFiles.value
    .filter(file => file.type.startsWith('image/'))
    .map(file => URL.createObjectURL(file))
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  selectedFiles.value = [...selectedFiles.value, ...files]
  emit('files-selected', selectedFiles.value)
  
  // 清空input以允许重复选择同一文件
  event.target.value = ''
}

const removeFile = (index) => {
  // 释放图片预览URL
  const file = selectedFiles.value[index]
  if (file && file.type.startsWith('image/')) {
    const urlIndex = selectedFiles.value
      .slice(0, index)
      .filter(f => f.type.startsWith('image/')).length
    if (imagePreviewUrls.value[urlIndex]) {
      URL.revokeObjectURL(imagePreviewUrls.value[urlIndex])
    }
  }
  
  selectedFiles.value.splice(index, 1)
  emit('files-removed', selectedFiles.value)
}

const getFileIcon = (fileType) => {
  if (fileType.startsWith('image/')) return 'fas fa-image'
  if (fileType.includes('pdf')) return 'fas fa-file-pdf'
  if (fileType.includes('word') || fileType.includes('doc')) return 'fas fa-file-word'
  if (fileType.includes('excel') || fileType.includes('sheet')) return 'fas fa-file-excel'
  if (fileType.includes('text') || fileType.includes('plain')) return 'fas fa-file-alt'
  if (fileType.includes('json')) return 'fas fa-file-code'
  return 'fas fa-file'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 清空所有文件
const clearFiles = () => {
  // 释放所有图片预览URL
  imagePreviewUrls.value.forEach(url => URL.revokeObjectURL(url))
  selectedFiles.value = []
  emit('files-removed', [])
}

// 暴露方法给父组件
defineExpose({
  clearFiles
})
</script>

<style scoped>
.file-upload-container {
  position: relative;
}

.upload-btn {
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

.upload-btn:hover {
  background: var(--surface-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.upload-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.file-preview-area {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 12px var(--shadow-color);
}

.file-preview-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  background: var(--background-color);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.file-icon {
  color: var(--primary-color);
  font-size: 1.25rem;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.file-size {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.remove-file-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.remove-file-btn:hover {
  background: #ef4444;
  color: white;
}

.image-preview-area {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px var(--shadow-color);
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  max-height: 200px;
  overflow-y: auto;
}

.image-preview-item {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 0.375rem;
  overflow: hidden;
}

.image-preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.remove-image-btn:hover {
  background: #ef4444;
}
</style>
