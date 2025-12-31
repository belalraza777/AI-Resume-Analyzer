require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database'); 
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const analyzeRoutes = require('./routes/analyze');
const oAuthRoutes = require('./routes/oAuth');
const errorHandler = require('./middleware/errorHandler');
const passport = require('./auth/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize()); 

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', uptime: process.uptime() });
});

// Auth Routes
app.use('/api/v1/auth', authRoutes);
// OAuth Routes
app.use('/api/v1/oauth', oAuthRoutes);
// Resume Routes
app.use('/api/v1/resumes',resumeRoutes);
//report Routes
app.use("/api/v1/analyze", analyzeRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Unkown Route' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
