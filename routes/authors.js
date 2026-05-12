const express = require('express');
const router = express.Router();
const authorService = require('../services/authorService');

// Obtener todos los autores desde la base de datos
router.get('/', async (req, res, next) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.json(authors);
  } catch (err) {
    next(err); // Lo manda al errorHandler global
  }
});

// Obtener un autor específico por su ID
router.get('/:id', async (req, res, next) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (err) {
    next(err);
  }
});

// Crear un nuevo autor (POST)
router.post('/', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    
    // Validación de campos obligatorios
    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    const newAuthor = await authorService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (err) {
    // Manejo específico por si el email ya existe en la DB
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    next(err);
  }
});

// Actualizar un autor existente (PUT)
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'El nombre y el email son obligatorios' });
    }

    const updatedAuthor = await authorService.updateAuthor(id, name, email, bio);
    
    if (!updatedAuthor) {
      return res.status(404).json({ error: 'No se encontró el autor para actualizar' });
    }
    
    res.json(updatedAuthor);
  } catch (err) {
    next(err);
  }
});

// Actualizar un post existente
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    const updatedPost = await postService.updatePost(id, title, content, published);
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
});

// Eliminar un post
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await postService.deletePost(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});



module.exports = router;