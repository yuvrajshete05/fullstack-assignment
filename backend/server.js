// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the API routes
const routes = require('./routes/api');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/assignmentDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use API routes
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
