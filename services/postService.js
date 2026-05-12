const db = require('../db');

// Obtiene todos los posts incluyendo el nombre del autor haciendo un JOIN
const getAllPosts = async () => {
  const query = `
    SELECT posts.*, authors.name as author_name 
    FROM posts 
    JOIN authors ON posts.author_id = authors.id 
    ORDER BY posts.created_at DESC
  `;
  const { rows } = await db.query(query);
  return rows;
};

// Busca un post específico por su ID
const getPostById = async (id) => {
  const { rows } = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
  return rows[0];
};

// Trae todos los posts que pertenecen a un autor determinado
const getPostsByAuthor = async (authorId) => {
  const { rows } = await db.query('SELECT * FROM posts WHERE author_id = $1', [authorId]);
  return rows;
};

// Inserta un nuevo post en la base de datos
const createPost = async (title, content, author_id, published = false) => {
  const query = 'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *';
  const { rows } = await db.query(query, [title, content, author_id, published]);
  return rows[0];
};

// Actualiza los datos de un post existente
const updatePost = async (id, title, content, published) => {
  const query = 'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *';
  const { rows } = await db.query(query, [title, content, published, id]);
  return rows[0];
};

// Elimina un post de la tabla
const deletePost = async (id) => {
  await db.query('DELETE FROM posts WHERE id = $1', [id]);
  return { message: 'Post eliminado correctamente' };
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
};