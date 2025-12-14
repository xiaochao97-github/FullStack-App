import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLoading = ref(false)
  
  const router = useRouter()
  
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  function setAuth(authToken, userData) {
    token.value = authToken
    user.value = userData
    localStorage.setItem('token', authToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }
  
  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }
  
  async function login(credentials) {
    isLoading.value = true
    try {
      const response = await api.post('/auth/login', credentials)
      
      if (response.data.success) {
        setAuth(response.data.data.token, response.data.data.user)
        return response.data
      } else {
        throw new Error(response.data.message || 'Login failed')
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Network error during login')
    } finally {
      isLoading.value = false
    }
  }
  
  async function register(userData) {
    isLoading.value = true
    try {
      const response = await api.post('/auth/register', userData)
      
      if (response.data.success) {
        setAuth(response.data.data.token, response.data.data.user)
        return response.data
      } else {
        throw new Error(response.data.message || 'Registration failed')
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Network error during registration')
    } finally {
      isLoading.value = false
    }
  }
  
  function logout() {
    clearAuth()
    router.push('/login')
  }
  
  // Initialize auth header if token exists
  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }
  
  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    setAuth,
    clearAuth
  }
})