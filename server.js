const { loadEnvFile } = require('node:process');
loadEnvFile('.env');
const express = require('express');
const cors = require('cors');
//Importar los archivos de rutas
const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');

//Importar el middleware de errores que creamos
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares iniciales
app.use(express.json());
app.use(cors()); // Esto le dice a Express: "Aceptá peticiones de cualquier lado"
// Rutas de recursos
app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);

// Ruta raíz (opcional, para saber que el server vive)
app.get('/', (req, res) => {
  res.json({ message: 'Miniblog API - Proyecto Integrador Ready' });
});

// Manejo de errores: siempre al final
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;





