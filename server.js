const { loadEnvFile } = require('node:process');
// Envolvemos esto en try/catch para que en Railway no tire error ENOENT
try {
  loadEnvFile('.env');
} catch (error) {
  console.log("Ambiente de producción detectado: usando variables de Railway");
}

const express = require('express');
const cors = require('cors');

// 1. REQUERIMOS LAS LIBRERÍAS DE SWAGGER
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Importar los archivos de rutas
const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');

// Importar el middleware de errores que creamos
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// 2. CARGAMOS TU ARCHIVO DE CONFIGURACIÓN OPENAPI
const swaggerDocument = YAML.load('./openapi.yaml');

// Middlewares iniciales
app.use(express.json());
app.use(cors()); // Esto le dice a Express: "Aceptá peticiones de cualquier lado"

// 3. AGREGAMOS LA RUTA DE LA DOCUMENTACIÓN INTERACTIVA
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
