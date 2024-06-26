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
const allowedOrigins = ['http://localhost:8080', 'https://thepawnsjourney.live'];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the request's origin is in the allowed list
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/', puzzleController);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    process.exit(1);
  }
}

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
  });
});
