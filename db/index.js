const { Pool } = require('pg');
require('dotenv').config(); // Asegurarce de tener 'dotenv' instalado

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'miniblog_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

pool.query('SELECT NOW()')
    .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
    .catch(err => console.error('❌ Error de conexión:', err.message));

module.exports = {
    query: (text, params) => pool.query(text, params),
};