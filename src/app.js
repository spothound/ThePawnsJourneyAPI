const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const puzzleController = require('./controllers/puzzleController');

dotenv.config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;


app.use(cors());
app.use('/', puzzleController);



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    process.exit(1);
  }
}

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on  http://localhost:${PORT}/`);
  })
})
