<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>创建新账户</h2>
        <p>填写以下信息即可加入我们</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="username">用户昵称</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="form-control"
            placeholder="请输入您的用户名"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="email">电子邮箱地址</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            placeholder="请输入您的邮箱"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">设置密码</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-control"
            placeholder="请设置您的密码"
            required
          />
        </div>
        
        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="btn btn-primary btn-block mt-4"
        >
          {{ authStore.isLoading ? '注册中...' : '立即注册' }}
        </button>
      </form>
      
      <div v-if="errorMessage" class="alert alert-error mt-4">
        {{ errorMessage }}
      </div>
        
      <div class="auth-footer">
        <p>已经拥有账户？ <router-link to="/login">点击此处登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const errorMessage = ref('')
const authStore = useAuthStore()
const router = useRouter()

// Redirect if already authenticated
if (authStore.isAuthenticated) {
  router.push('/dashboard')
}

async function handleSubmit() {
  errorMessage.value = ''
  
  try {
    await authStore.register(form)
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.message || '注册失败，请检查您的输入信息'
  }
}
</script>

<style scoped>
.auth-container {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f9fafb;
}

.auth-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h2 {
  font-size: 28px;
  color: #1f2937;
  margin-bottom: 8px;
}

.auth-header p {
  color: #6b7280;
  font-size: 16px;
}

.auth-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
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
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 16px;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-primary:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.btn-block {
  width: 100%;
  display: block;
}

.mt-4 {
  margin-top: 20px;
}

.alert {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
}

.alert-error {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.auth-footer {
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  padding-top: 20px;
  border-top: 1px solid #f3f4f6;
}

.auth-footer a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>