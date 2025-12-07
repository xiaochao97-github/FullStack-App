# 🚀 FullStack App - 现代化全栈Web应用

一个基于 Vue.js + Node.js + MongoDB 构建的现代化全栈Web应用程序，具备完整的用户认证系统和数据管理功能。

## ✨ 功能特性
### 🔐 用户认证系统
- 用户注册 - 创建新账户
- 用户登录 - 安全的身份验证
- JWT令牌 - 无状态的会话管理
- 密码加密 - Bcrypt算法保护用户凭证
### 📊 数据管理系统
- 完整的CRUD操作 - 创建、读取、更新、删除
- 实时数据同步 - 即时反映数据变化
- 个性化数据 - 每个用户只能访问自己的数据
### 🎨 用户体验
- 响应式设计 - 适配各种设备屏幕
- 现代化UI - 美观直观的用户界面
- 流畅动画 - 提升交互体验

## 🛠️ 技术栈
### 前端技术
- Vue 3 - 渐进式JavaScript框架
- Vite - 下一代前端构建工具
- Vue Router - 官方路由管理器
- Pinia - 新一代状态管理库
- Axios - HTTP客户端库
### 后端技术
- Node.js - JavaScript运行时环境
- Express.js - Web应用框架
- MongoDB - NoSQL数据库
- Mongoose - MongoDB对象建模工具
- JWT - JSON Web Tokens认证
- Bcrypt.js - 密码哈希函数
### 部署平台
Vercel - 前端部署
Heroku - 后端部署

## 📁 项目结构
```text
 fullstack-app/
├── frontend/                 # 前端Vue.js应用
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── views/           # 页面级组件
│   │   ├── stores/          # 状态管理
│   │   ├── services/        # API服务层
│   │   └── router/          # 路由配置
│   ├── public/
│   └── package.json
├── backend/                  # 后端Node.js应用
│   ├── models/               # 数据模型
│   ├── routes/               # API路由
│   ├── middleware/           # 中间件
│   └── package.json
└── README.md
```

## ⚡ 快速开始
### 前提条件
- Node.js (版本 14 或更高)
- MongoDB (本地或云实例)
- npm 或 yarn 包管理器
### 1️⃣ 克隆项目
```Bash
git clone https://github.com/your-username/fullstack-app.git
cd fullstack-app
```
### 2️⃣ 后端设置
```bash
进入后端目录
cd backend
```
安装依赖
```bash
npm install
```
配置配置环境变量
```bash
cp .env.example .env
```
编辑 .env 文件，设置你的数据库连接和JWT密钥
 
### 3️⃣ 前端设置
```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
```

### 4️⃣ 环境变量配置
后端 (.env)
```Env
MONGODB_URI=mongodb://localhost:27017/fullstack-app
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```
前端 (.env.local)
```Env
VITE_API_URL=http://localhost:3000/api
```
### 5️⃣ 启动应用
启动后端服务
```Bash
cd backend
npm run dev
```
后端服务将在 http://localhost:3000 运行运行

启动前端应用
```Bash
cd frontend
npm run dev
```
前端应用将在 http://localhost:5173 运行

## 🌐 生产环境部署
### 前端部署 (Vercel)
将代码推送到GitHub仓库
在Vercel中导入项目
配置环境变量：
    VITE_API_URL=https://your-heroku-app.herokuapp.com/api

### 后端部署 (Heroku)
创建新的Heroku应用
设置环境变量：
```Bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET=your-production-jwt-secret
```
部署代码：
```Bash
   git subtree push --prefix backend heroku main
```
## 📖 API文档
### 认证端点
| 方法   | 端点                   | 描述     |
|--------|------------------------|----------|
| POST   | `/api/auth/register`   | 用户注册 |
| POST   | `/api/auth/login`      | 用户登录 |
### 数据端点
| 方法   | 端点                | 描述           | 认证要求 |
|--------|---------------------|----------------|----------|
| GET    | `/api/items`        | 获取用户的所有项目 | ✅       |
| POST   | `/api/items`        | 创建新项目       | ✅       |
| PUT    | `/api/items/:id`    | 更新指定项目     | ✅       |
| DELETE | `/api/items/:id`    | 删除指定项目     | ✅       |
### 请求/响应示例
#### 用户注册
```Json
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

## 🗂 🗂️ 数据库模型
### 用户模型 (User)
```JavaScript
{
  username: String,     // 必需，唯一
  email: String,       // 必需，唯一
  password: String     // 必需，加密存储
}
```
### 项目模型 (Item)
```JavaScript
{
  title: String,       // 必需
  description: String, // 可选
  completed: Boolean,  // 默认false
  userId: ObjectId    // 关联用户ID
}
```

## 🧪 测试
### 运行前端测试
```Bash
cd frontend
npm run test
```
### 运行后端测试
```Bash
cd backend
npm run test
```

## 🤝 贡献指南
### Fork 本仓库
- 创建特性分支 (git checkout -b feature/AmazingFeature)
- 提交更改 (git commit -m 'Add some AmazingFeature')
- Push. Push 到分支 (git push origin feature/AmazingFeature)
### 开启 Pull Request

## 📄 许可证
本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情

👥 👥 作者
Your Name - 初始工作 - YourGitHub
🙏 致谢
Vue.js 团队
Express.js 团队
MongoDB Atlas

## ❓ 常见问题
### Q: 如何修改端口号？
A: 在前端的 vite.config.js 和后端的 .env 文件中分别修改端口配置。

### Q: 忘记密码功能如何实现？
A: 当前版本支持基础的登录注册，后续版本将加入密码重置功能。

### Q: 支持哪些数据库？
A: 当前使用 MongoDB，但可以通过修改 Mongoose 配置来支持其他数据库。

### Q: 如何进行自定义开发？
A: 参考项目结构和API文档，根据需要修改组件和服务。

⭐ 如果这个项目对你有帮助，请给我们一个星标！