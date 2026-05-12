const { loadEnvFile } = require('node:process');
const express = require('express');

//Importar los archivos de rutas
const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');

//Importar el middleware de errores que creamos
const errorHandler = require('./middlewares/errorHandler');

loadEnvFile('.env');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares iniciales
app.use(express.json());

// Esto le dice a Express: "Todo lo que venga a /api/authors, manejalo con authorsRouter"
app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);

// Ruta raíz (opcional, para saber que el server vive)
app.get('/', (req, res) => {
  res.json({ message: 'Miniblog API - Proyecto Integrador Ready' });
});

// Se pone después de las rutas para que, si algo falla en ellas, "caiga" acá
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});