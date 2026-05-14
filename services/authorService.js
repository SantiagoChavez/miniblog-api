const db = require('../db');

const getAllAuthors = async () => {
    const result = await db.query('SELECT * FROM authors ORDER BY id ASC');
    return result.rows;
};

const getAuthorById = async (id) => {
    const result = await db.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
};

const createAuthor = async (authorData) => {
    const { name, email, bio } = authorData;
    const result = await db.query(
        'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
        [name, email, bio]
    );
    return result.rows[0];
};

const deleteAuthor = async (id) => {
  const result = await db.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    deleteAuthor,
};