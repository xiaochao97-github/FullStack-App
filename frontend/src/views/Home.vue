<template>
  <div class="home">
    <section class="hero">
      <div class="container text-center">
        <h1 class="hero-title">
          构建现代化的<br>全栈Web应用
        </h1>
        <p class="hero-subtitle">
          使用 Vue.js + Node.js + MongoDB 技术栈，打造高性能的企业级应用
        </p>
        
        <div class="hero-actions">
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/register" class="btn btn-primary btn-lg">
              🚀 立即开始
            </router-link>
            <router-link to="/login" class="btn btn-outline btn-lg">
              🔑 登录账户
            </router-link>
          </template>
          
          <template v-else>
            <div class="authenticated-actions">
              <p class="mb-4">很高兴再次见到您！</p>
              <router-link to="/dashboard" class="btn btn-success btn-lg">
                📊 进入控制台
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </section>
    
    <section class="features">
      <div class="container">
        <h2 class="features-title">为什么选择我们的方案？</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>极致性能</h3>
            <p>优化的架构设计，确保应用的高速响应和稳定运行</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>企业级安全</h3>
            <p>多层安全防护，保障用户数据和业务信息安全</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>易于扩展</h3>
            <p>模块化设计，便于功能扩展和系统升级</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.home {
  min-height: calc(100vh - 77px);
}

.hero {
  background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 40px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
  border: none;
}

.btn-outline {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-success {
  background-color: #10b981;
  color: white;
  border: none;
}

.btn-lg {
  font-size: 18px;
  padding: 15px 30px;
}

.features {
  padding: 80px 20px;
  background: white;
}

.features-title {
  font-size: 36px;
  text-align: center;
  margin-bottom: 50px;
  color: #1f2937;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: #f9fafb;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

.feature-icon {
  font-size: 50px;
  margin-bottom: 20px;
}

.authenticated-actions {
  text-align: center;
}

.mb-4 {
  margin-bottom: 20px;
  font-size: 18px;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-center {
  text-align: center;
}
</style>