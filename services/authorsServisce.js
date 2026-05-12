const express = require('express');
const router = express.Router();
const authorService = require('../services/authorService');

// GET /api/authors
router.get('/', async (req, res, next) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.json(authors);
  } catch (err) { next(err); }
});

// GET /api/authors/:id
router.get('/:id', async (req, res, next) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(author);
  } catch (err) { next(err); }
});

// POST /api/authors
router.post('/', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Nombre y email requeridos' });
    
    const newAuthor = await authorService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (err) {
    if (err.code === '23505') { // Error de email duplicado en Postgres
      return res.status(400).json({ error: 'El email ya existe' });
    }
    next(err);
  }
});

module.exports = router;