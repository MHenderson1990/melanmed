const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

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
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// test route
app.get('/', (req, res) => {
  res.json({ message: 'MelanMed API is running' });
});

// port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`MelanMed server running on port ${PORT}`);
});