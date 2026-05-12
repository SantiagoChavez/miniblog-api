const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

module.exports = router;