import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack_app')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

// Routes

// Health Check
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: '🚀 FullStack App Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during registration',
      error: error.message 
    });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
    });
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
    });
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during login',
      error: error.message 
    });
  }
});

// Get all items for authenticated user
app.get('/api/items', authenticateToken, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      message: 'Items retrieved successfully',
      data: items
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve items',
      error: error.message 
    });
  }
});

// Create new item
app.post('/api/items', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Validation
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title is required' 
      });
    }
    
    const item = new Item({
      title,
      description: description || '',
      userId: req.user.userId
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: 'Item created successfully created successfully',
      data: item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create item',
      error: error.message 
    });
  }
});

// Update item
app.put('/api/items/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, description, completed },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
    });
    
    res.json({
      success: true,
      message: 'Item updated successfully updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update item',
      error: error.message 
    });
  }
});

// Delete item
app.delete('/api/items/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
    });
    
    res.json({
      success: true,
      message: 'Item deleted successfully deleted successfully'
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete item',
      error: error.message 
    });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✨ FullStack Backend Server running on port ${PORT}\n`);
console.log(`📍 Local: http://localhost:${PORT}`);
console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});