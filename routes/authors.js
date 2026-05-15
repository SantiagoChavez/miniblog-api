const express = require('express');
const router = express.Router();
const authorService = require('../services/authorService');

// GET /api/authors - Listar autores
router.get('/', async (req, res, next) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.json(authors);
  } catch (err) {
    next(err);
  }
});

// GET /api/authors/:id - Detalle de autor
router.get('/:id', async (req, res, next) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(author);
  } catch (err) {
    next(err);
  }
});

// POST /api/authors - Crear autor
router.post('/', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }
    const newAuthor = await authorService.createAuthor({ name, email, bio });
    res.status(201).json(newAuthor);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'El email ya existe' });
    next(err);
  }
});

// PUT /api/authors/:id - Actualizar autor
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }
    const updatedAuthor = await authorService.updateAuthor(req.params.id, { name, email, bio });
    if (!updatedAuthor) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(updatedAuthor);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'El email ya existe' });
    next(err);
  }
});

// DELETE /api/authors/:id - Eliminar autor
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await authorService.deleteAuthor(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(204).send(); // 204 es "No Content", ideal para DELETE exitoso
  } catch (err) {
    next(err);
  }
});

module.exports = router;