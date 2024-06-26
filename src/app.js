const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const puzzleController = require('./controllers/puzzleController');

dotenv.config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Define allowed origins
const allowedOrigins = ['https://thepawnsjourney.live'];

// Function to check if origin is allowed
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow requests with no origin (e.g., server-to-server)

    // Check if origin is allowed or is localhost
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Apply CORS middleware globally
app.use(express.json()); // Ensure the body parser middleware is included

app.use('/', puzzleController);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Invalid token');
    } else {
      res.status(500).send('Something went wrong');
    }
  } else {
    next();
  }
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
  });
});
