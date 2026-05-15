const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
const { validateNewPost, validateUpdatePost } = require('../validators/postValidator');

// GET /api/posts - Listar todos
router.get('/', async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

// GET /api/posts/:id - Detalle de post
router.get('/:id', async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        res.json(post);
    } catch (err) {
        next(err);
    }
});

// GET /api/posts/author/:authorId
router.get('/author/:authorId', async (req, res, next) => {
    try {
        const posts = await postService.getPostsByAuthor(req.params.authorId);
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

// POST /api/posts - Crear post con validación
router.post('/', async (req, res, next) => {
    try {
        const validatedData = validateNewPost(req.body);
        const newPost = await postService.createPost(validatedData);
        res.status(201).json(newPost);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        next(err);
    }
});

// PUT /api/posts/:id - Actualizar post
router.put('/:id', async (req, res, next) => {
    try {
        const validatedData = validateUpdatePost(req.body);
        const updatedPost = await postService.updatePost(req.params.id, validatedData);
        if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });
        res.json(updatedPost);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        next(err);
    }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const deleted = await postService.deletePost(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;