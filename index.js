require('./db');
const express = require('express');
const app = express();
const puzzleController = require('./controllers/puzzleController');
const PORT = process.env.PORT || 3000;

app.use('/', puzzleController);

app.listen(PORT, () => {
  console.log(`Server is listening on  http://localhost:${PORT}/`);
});
