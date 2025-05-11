const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logging middleware

// User Routes
app.use('/api/users', userRoutes);

// Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});