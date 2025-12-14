import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 16000,
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // 添加认证令牌
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

export const itemsService = {
  async getAll() {
    const response = await api.get('/items')
    return response.data
  },
  
  async create(item) {
    const response = await api.post('/items', item)
    return response.data
  },
  
  async update(id, updates) {
    const response = await api.put(`/items/${id}`, updates)
    return response.data
  },
  
  async delete(id) {
    const response = await api.delete(`/items/${id}`)
    return response.data
  }
}