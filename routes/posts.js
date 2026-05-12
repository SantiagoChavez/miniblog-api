const express = require('express');
const router = express.Router();
const postService = require('../services/postService');

// Ruta para listar todos los posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err); // Pasa el error al middleware global de errores
  }
});

// Ruta para obtener el detalle de un post por ID
router.get('/:id', async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Ruta para filtrar posts por el ID del autor
router.get('/author/:authorId', async (req, res, next) => {
  try {
    const posts = await postService.getPostsByAuthor(req.params.authorId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Ruta para crear un post nuevo verificando campos obligatorios
router.post('/', async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'Título, contenido y author_id son requeridos' });
    }
    const newPost = await postService.createPost(title, content, author_id, published);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

module.exports = router;