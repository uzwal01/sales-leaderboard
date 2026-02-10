require('dotenv').config();

const dns = require("dns"); 
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());    // Allow frontend to access backend
app.use(express.json());    // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));    // Parse form data

// Routes
app.use('/api', salesRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Sales Leaderboard API',
    status: 'Running',
    endpoints: {
      addSale: 'POST /api/sales',
      getLeaderboard: 'GET /api/leaderboard',
      getAllSales: 'GET /api/sales',
    },
  });
});


// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
}); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});