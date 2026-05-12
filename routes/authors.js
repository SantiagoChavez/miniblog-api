const express = require('express');
const router = express.Router();
const db = require('../db'); // Esto importa tu nuevo index.js

// GET /api/authors - Trae a Santiago, Heidi y quien esté en la DB
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM authors ORDER BY id ASC');
    res.json(result.rows); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos de la DB' });
  }
});

// GET /api/authors/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM authors WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;

// GET /api/authors/:id - Obtener un autor por ID
router.get('/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  res.json(author);
});

// POST /api/authors - Crear un nuevo autor
router.post('/', (req, res) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }

  const newAuthor = {
    id: authors.length + 1,
    name,
    email,
    bio: bio || ''
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// PUT /api/authors/:id - Actualizar un autor
router.put('/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  const { name, email, bio } = req.body;

  if (name) author.name = name;
  if (email) author.email = email;
  if (bio !== undefined) author.bio = bio;

  res.json(author);
});

// DELETE /api/authors/:id - Eliminar un autor
router.delete('/:id', (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  authors.splice(index, 1);
  res.json({ message: 'Autor eliminado exitosamente' });
});

module.exports = router;