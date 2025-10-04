// Vercel API handler
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../backend/uploads')));

// Routes
app.use('/api/auth', require('../backend/routes/auth'));
app.use('/api/creator', require('../backend/routes/creator'));
app.use('/api/admin', require('../backend/routes/admin'));
app.use('/api/courses', require('../backend/routes/courses'));
app.use('/api/lessons', require('../backend/routes/lessons'));
app.use('/api/enroll', require('../backend/routes/enrollment'));
app.use('/api/progress', require('../backend/routes/progress'));
app.use('/api/certificates', require('../backend/routes/certificates'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kumarshah7755_db_user:7CbupWHX0PM1CASc@cluster0.4ql28ug.mongodb.net/microcourse?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is working!', status: 'OK' });
});

module.exports = app;
