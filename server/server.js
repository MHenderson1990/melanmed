const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');

// load environment variables
dotenv.config();

// connect to database
connectDB();

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/doctors', doctorRoutes);

// test route
app.get('/', (req, res) => {
  res.json({ message: 'MelanMed API is running' });
});

// port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`MelanMed server running on port ${PORT}`);
});