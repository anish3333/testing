// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());                          // Enable CORS for all routes
app.use(morgan('dev'));                   // HTTP request logger
app.use(express.json());                  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Example route with URL parameter
app.get('/users/:id', (req, res) => {
  res.json({ 
    message: `Fetching user with ID: ${req.params.id}`,
    userId: req.params.id
  });
});

// Example POST route
app.post('/data', (req, res) => {
  console.log('Received data:', req.body);
  res.status(201).json({ 
    message: 'Data received successfully',
    data: req.body
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});