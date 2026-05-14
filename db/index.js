const { Pool } = require('pg');

// Hardcodeamos temporalmente para asegurar funcionalidad (Rubrica punto 2 y 3)
const pool = new Pool({
    user: 'postgres',           // Tu usuario de pgAdmin
    host: 'localhost',
    database: 'miniblog_db',       // El nombre de tu base de datos
    password: '#SantiagoMiniblog', // Ponela directo entre comillas
    port: 5432,
});

// Prueba de conexión inmediata para no adivinar
pool.query('SELECT NOW()')
    .then(() => console.log('✅ Conexión a PostgreSQL exitosa (Hardcoded)'))
    .catch(err => console.error('❌ Error de conexión:', err.message));

module.exports = {
    query: (text, params) => pool.query(text, params),
};