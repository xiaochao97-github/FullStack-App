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
            required            required
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
    errorMessage.value = error
  }
}
</script>

<style scoped>
/* Same styles as Login.vue */
</style>