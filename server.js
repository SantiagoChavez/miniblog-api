const express = require('express');
const { loadEnvFile } = require('node:process');

// 1. Importar las rutas
const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');

loadEnvFile('.env');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 2. Usar las rutas con el prefijo /api
const { loadEnvFile } = require('node:process');
const express = require('express');
const authorsRouter = require('./routes/authors'); // Descomentado
const postsRouter = require('./routes/posts');     // Descomentado

loadEnvFile('.env');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Usar las rutas
app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog API',
    endpoints: {
      authors: '/api/authors',
      posts: '/api/posts'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});