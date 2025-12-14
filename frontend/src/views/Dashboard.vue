<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-header">
        <h1>我的项目管理中心</h1>
        <p>在这里您可以管理和追踪所有的项目进展</p>
      </div>
      
      <!-- Add New Item Form -->
      <div class="card mb-6">
        <div class="card-header">
          <h3>➕ 添加新项目</h3>
        </div>
        
        <form @submit.prevent="addItem" class="p-6">
          <div class="form-group">
            <input
              v-model="newItem.title"
              class="form-control"
              placeholder="请输入项目名称..."
              required
            />
          </div>
          
          <div class="form-group">
            <textarea
              v-model="newItem.description"
              class="form-control"
              placeholder="请输入项目描述（可选）..."
              rows="2"
            ></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">
            确认添加
          </button>
        </form>
      </div>
      
      <!-- Items List -->
      <div class="card">
        <div class="card-header">
          <h3>📋 项目清单</h3>
        </div>
        
        <div v-if="loading" class="loading-state p-6">
          <p>⏳ 正在努力加载数据...</p>
        </div>
        
        <div v-if="items.length === 0 && !loading" class="empty-state p-6">
          <p>📭 暂时没有任何项目记录</p>
          <p class="text-muted">请在上方表格中添加您的首个项目</p>
        </div>
        
        <div v-else class="items-grid p-6">
          <div
            v-for="item in items"
            :key="item._id"
            class="item-card"
            :class="{ 'completed': item.completed }"
          >
            <div class="item-header">
              <h4>{{ item.title }}</h4>
              <div class="item-actions">
                <button
                  @click="toggleCompletion(item)"
                  class="btn btn-sm"
                >
                  {{ item.completed ? '✅ 已完成' : '⏳ 进行中' }}
                </button>
                
                <button
                  @click="deleteItem(item._id)"
                  class="btn btn-danger btn-sm"
                >
                  🗑️ 删除项目
                </button>
              </div>
            </div>
            
            <p v-if="item.description" class="item-description mt-2">
              {{ item.description }}
            </p>
            
            <div class="item-footer mt-4">
              <small>🕒 创建时间: {{ formatDate(item.createdAt) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { itemsService } from '../services/api'

const items = ref([])
const loading = ref(true)

const newItem = reactive({
  title: '',
  description: ''
})

onMounted(async () => {
  await loadItems()
})

async function loadItems() {
  try {
    loading.value = true
    const response = await itemsService.getAll()
    items.value = response.data
  } catch (error) {
    console.error('Error loading items:', error)
  } finally {
    loading.value = false
  }
}

async function addItem() {
  if (!newItem.title.trim()) return
  
  try {
    const response = await itemsService.create(newItem)
    items.value.unshift(response.data)
    newItem.title = ''
    newItem.description = ''
  } catch (error) {
    console.error('Error adding item:', error)
  }
}

async function toggleCompletion(item) {
  try {
    const updates = { completed: !item.completed }
    const response = await itemsService.update(item._id, updates)
    Object.assign(item, response.data)
  } catch (error) {
    console.error('Error updating item:', error)
  }
}

async function deleteItem(id) {
  if (!confirm('⚠️ 确定要永久删除该项目吗？此操作不可恢复！')) return
    
  try {
    await itemsService.delete(id)
    items.value = items.value.filter(i => i._id !== id)
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.dashboard {
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  font-size: 36px;
  color: #1f2937;
  margin-bottom: 10px;
}

.dashboard-header p {
  color: #6b7280;
  font-size: 18px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
}

.card-header {
  background: #f9fafb;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.card-header h3 {
  font-size: 20px;
  margin: 0;
  color: #374151;
}

.p-6 {
  padding: 24px;
}

.mb-6 {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 14px;
}

.mt-2 {
  margin-top: 8px;
}

.mt-4 {
  margin-top: 16px;
}

.items-grid {
  display: grid;
  gap: 20px;
}

.item-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.item-card:hover {
  border-color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.item-card.completed {
  opacity: 0.7;
  border-color: #10b981;
  background-color: #f0fdf4;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.item-header h4 {
  font-size: 18px;
  margin: 0;
  color: #1f2937;
}

.item-actions {
  display: flex;
  gap: 12px;
}

.item-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.item-footer {
  border-top: 1px solid #f3f4f6;
  padding-top: 12px;
  color: #9ca3af;
}

.loading-state, .empty-state {
  text-align: center;
  color: #6b7280;
  padding: 40px 20px;
}

.empty-state p:first-child {
  font-size: 18px;
  margin-bottom: 8px;
}

.text-muted {
  color: #9ca3af;
  font-size: 14px;
}
</style>