const db = require('../db');

const getAllPosts = async () => {
    const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    return result.rows;
};

const getPostById = async (id) => {
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
};

// Endpoint especial requerido: posts por autor
const getPostsByAuthor = async (authorId) => {
    const result = await db.query('SELECT * FROM posts WHERE author_id = $1', [authorId]);
    return result.rows;
};

const createPost = async (postData) => {
    const { title, content, author_id, published } = postData;
    const result = await db.query(
        'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, content, author_id, published || false]
    );
    return result.rows[0];
};

const updatePost = async (id, postData) => {
    const { title, content, published } = postData;
    const result = await db.query(
        'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
        [title, content, published, id]
    );
    return result.rows[0];
};

const deletePost = async (id) => {
    const result = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
};