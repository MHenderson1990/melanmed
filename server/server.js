const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.json({ message: 'MelanMed API is running' });
});

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MelanMed server running on port ${PORT}`);
});