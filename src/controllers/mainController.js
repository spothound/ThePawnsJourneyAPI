const express = require('express');
const router = express.Router();

// Available routes
router.get('/', (req, res) => {
  res.json({
    availableRoutes: [
      {
        method: 'GET',
        path: '/',
        description: 'Get available routes'
      },
      {
        method: 'GET',
        path: '/puzzles',
        description: 'Puzzles related queries'
      },
      {
        method: 'GET',
        path: '/woodpcker',
        description: 'Woodpecker set related queries'
      }
    ]
  });
});

module.exports = router;
