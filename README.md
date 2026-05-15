# 🚀 Henry Project - M2 Integrador: API Miniblog

API REST profesional para la gestión de un blog, desarrollada con Node.js, Express y PostgreSQL. Proyecto final del Módulo 2 de la carrera Fullstack en Henry.

## 🔗 URL del Proyecto
- **Producción:** [Reemplazar con URL de Railway o deployment real]
- **Documentación OpenAPI:** `/openapi.yaml` (disponible en la raíz del repo)

## 🛠️ Tecnologías Utilizadas
- **Backend:** Node.js, Express.
- **Base de Datos:** PostgreSQL.
- **Testing:** Vitest y Supertest.
- **Base de datos local:** Script `db/setup.sql`.
- **Seguridad:** Variables de entorno y consultas parametrizadas.

## 🧾 Requisitos
- Node.js 18+ instalado.
- PostgreSQL local o en la nube.
- `npm install` para instalar dependencias.

## 📁 Estructura del Proyecto

```
api-miniblog/
├── db/
│   ├── index.js           # Conexión a PostgreSQL (pool de conexiones)
│   └── setup.sql          # Script de inicialización (tablas y datos)
├── middlewares/
│   └── errorHandler.js    # Middleware para manejo centralizado de errores
├── routes/
│   ├── authors.js         # Rutas CRUD de autores
│   └── posts.js           # Rutas CRUD de posts
├── services/
│   ├── authorService.js   # Lógica de negocios para autores
│   └── postService.js     # Lógica de negocios para posts
├── validators/
│   ├── authorValidator.js # Validaciones de datos para autores
│   └── postValidator.js   # Validaciones de datos para posts
├── tests/
│   └── api.test.js        # Suite de pruebas con Vitest + Supertest
├── .env.example           # Variables de entorno (ejemplo)
├── .gitignore             # Archivos a ignorar en Git
├── openapi.yaml           # Documentación OpenAPI
├── package.json           # Dependencias y scripts
├── README.md              # Este archivo
├── server.js              # Punto de entrada de la aplicación
└── vitest.config.js       # Configuración de Vitest
```

### Descripción de directorios

- **db/**: Manejo de base de datos. `index.js` crea el pool de conexiones, `setup.sql` define tablas e inserta datos iniciales.
- **middlewares/**: Middlewares de Express. `errorHandler.js` captura todos los errores y devuelve respuestas consistentes.
- **routes/**: Define los endpoints HTTP. Importan servicios y validadores.
- **services/**: Lógica de negocio. Ejecutan queries SQL y retornan datos procesados.
- **validators/**: Validación de datos. Validan entrada de usuario antes de procesarla.
- **tests/**: Suite de pruebas automatizadas. Usan Vitest para correr y Supertest para probar endpoints HTTP.

## ⚙️ Variables de entorno
Crea un archivo `.env` con estas variables mínimas:

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
```

> Si no configuras `PORT`, el servidor usará `3000` por defecto.

## 🚀 Ejecución local
1. Clona el repositorio:
   ```bash
git clone https://github.com/SantiagoChavez/miniblog-api.git
cd api-miniblog
```
2. Instala dependencias:
   ```bash
npm install
```
3. Crea la base de datos y ejecuta el script de inicialización:
   - Con `psql` o tu herramienta favorita, ejecuta `db/setup.sql`.
4. Crea el archivo `.env` con los valores de conexión.
5. Inicia en modo desarrollo:
   ```bash
npm run dev
```
6. Abre `http://localhost:3000` y prueba el endpoint raíz.

## 📦 Comandos disponibles
- `npm start` — inicia el servidor en producción.
- `npm run dev` — inicia el servidor en modo desarrollo con recarga automática.
- `npm test` — ejecuta la suite de pruebas con Vitest y Supertest.

## 📝 Endpoints principales
Base URL: `http://localhost:3000`

### Autores
- `GET /api/authors` — listar autores.
- `GET /api/authors/:id` — obtener autor por ID.
- `POST /api/authors` — crear autor.
- `PUT /api/authors/:id` — actualizar autor.
- `DELETE /api/authors/:id` — eliminar autor.

### Posts
- `GET /api/posts` — listar posts.
- `GET /api/posts/:id` — obtener post por ID.
- `GET /api/posts/author/:authorId` — posts de un autor.
- `POST /api/posts` — crear post.
- `PUT /api/posts/:id` — actualizar post.
- `DELETE /api/posts/:id` — eliminar post.

## 🌱 Configuración de entorno y tests
- Copia `.env.example` a `.env` y completa los valores con tus credenciales locales.
- No subas `.env` a GitHub; el repositorio debe usar solo `.env.example`.
- `.env.example` muestra las variables necesarias sin exponer contraseñas.
- Si estás en producción, usa variables de entorno reales configuradas en la plataforma de deployment.

```bash
cp .env.example .env
```

- Para correr los tests unitarios y de integración se usa `vitest` con `supertest`.
- Ejecuta:

```bash
npm test
```

## 📄 Documentación OpenAPI
La documentación de la API se encuentra en `openapi.yaml`.

---

### Nota
Reemplaza la URL de producción y agrega cualquier detalle adicional de despliegue cuando el proyecto quede publicado en Railway o un servicio similar.