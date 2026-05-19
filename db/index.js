const { Pool } = require('pg');

// Evaluamos si estamos en producción (Railway) para aplicar la seguridad SSL obligatoria
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'miniblog_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,    
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

// Comprobación de la conexión al arrancar
pool.query('SELECT NOW()')
    .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
    .catch(err => console.error('❌ Error de conexión:', err.message));

module.exports = {
    query: (text, params) => pool.query(text, params),
};