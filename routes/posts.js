const express = require('express');
const router = express.Router();
const postService = require('../services/postService');

// Obtener todos los posts con sus autores
router.get('/', async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Obtener un post por su ID
router.get('/:id', async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Obtener posts de un autor específico
router.get('/author/:authorId', async (req, res, next) => {
  try {
    const posts = await postService.getPostsByAuthor(req.params.authorId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Crear un nuevo post
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

// Actualizar un post existente
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    const updatedPost = await postService.updatePost(id, title, content, published);
    
    if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });
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

// Esta línea SIEMPRE al final para que exporte todas las rutas anteriores
module.exports = router;