# 🚀 Henry Project - M2 Integrador: API Miniblog

API REST profesional para la gestión de un blog, desarrollada con Node.js, Express y PostgreSQL. Proyecto integrador del Módulo 2 de la carrera Fullstack en Henry.

## 🔗 URLs del Proyecto

- **API en Producción:** [https://miniblog-api-production-5fba.up.railway.app](https://miniblog-api-production-5fba.up.railway.app)
- **Documentación Interactiva (Swagger):** [https://miniblog-api-production-5fba.up.railway.app/api-docs](https://miniblog-api-production-5fba.up.railway.app/api-docs)
- **Plano OpenAPI:** `/docs/openapi.yaml` (disponible en la carpeta de documentación)

---

## 🛠️ Tecnologías Utilizadas
- **Backend:** Node.js, Express.
- **Base de Datos:** PostgreSQL.
- **Testing:** Vitest y Supertest.
- **Base de datos local:** Script `db/setup.sql`.
- **Seguridad:** Variables de entorno y consultas parametrizadas.

## 🧾 Requisitos Previos
Para correr este proyecto localmente, necesitás tener instalado en tu sistema operativo:
- **Node.js 18+** instalado globalmente.
- **PostgreSQL** (motor local o instancia en la nube).
- **Git** para la gestión del repositorio.

---

## 🚀 Guía de Instalación Paso a Paso (Local)

Seguí estos pasos ordenados para clonar, instalar y correr el proyecto en tu computadora desde cero:

### 1. Clonar el repositorio (Bajar el código)
1. Entrá a la carpeta de tu computadora donde quieras guardar el proyecto (por ejemplo, *Documentos*).
2. Hacé clic derecho en un espacio vacío y seleccioná **"Git Bash Here"** (se va a abrir una consola).
3. Copiá, pegá el siguiente comando y apretá `Enter`:
   git clone https://github.com/SantiagoChavez/miniblog-api.git
4. Una vez descargado, ingresá a la carpeta del proyecto:
   cd api-miniblog
5. Abrí el proyecto en Visual Studio Code escribiendo:
   code .

### 2. Instalar las dependencias
1. Adentro de Visual Studio Code, abrí la terminal interna presionando las teclas `Ctrl + Ñ` (o en el menú superior: *Terminal -> New Terminal*).
2. Escribí el siguiente comando para descargar de forma automática todas las librerías necesarias (express, cors, postgres, swagger-ui-express, etc.):
   npm install

### 3. Configurar la Base de Datos Local
1. Con tu herramienta favorita de PostgreSQL (como pgAdmin o psql), creá una base de datos llamada `miniblog_db`.
2. Ejecutá el script de inicialización ubicado en `db/setup.sql` para estructurar las tablas e inflar los datos iniciales.

### 4. Configurar las Variables de Entorno
El servidor necesita conocer las credenciales locales para conectarse.
1. En la barra lateral de VS Code, buscá el archivo `.env.example`.
2. Hacé clic derecho, elegí *Cambiar nombre* y renombralo exactamente a **`.env`** (borrándole la extensión `.example`).
3. Abrí el archivo y completá los valores con tus credenciales locales:
   PORT=3000
   DB_USER=tu_usuario_de_postgres
   DB_PASSWORD=tu_password_de_postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=miniblog_db
   NODE_ENV=development
   
   *(Nota: Nunca subas este archivo `.env` a GitHub; ya se encuentra protegido en el `.gitignore`).*

### 5. Iniciar la Aplicación
En la terminal de VS Code, ejecutá:
npm run dev

Si todo salió bien, verás los siguientes mensajes en consola:
- 🚀 Servidor corriendo en http://localhost:3000
- 📖 Documentación disponible en http://localhost:3000/api-docs

---

## 📦 Comandos Disponibles en el Proyecto

- npm start — Inicia el servidor en modo producción.
- npm run dev — Inicia el servidor en modo desarrollo con recarga automática (Nodemon).
- npm test — Ejecuta la suite completa de pruebas de integración y casos límite.

---

## ⚙️ Despliegue en Railway (Producción)

Para subir con éxito esta API a Railway junto a la base de datos PostgreSQL, se deben configurar los siguientes parámetros en la plataforma de internet:

### 📌 Paso 1: Mapear las Variables de Entorno en la Nube
En el tablero principal de Railway, hacé clic sobre el bloque del servicio de tu API (`miniblog-api`). Andá a la pestaña **Variables** y vinculá dinámicamente las credenciales reales de tu base de datos remota usando el signo `$`:
- **DB_HOST:** `${{Postgres.PGHOST}}`
- **DB_PASSWORD:** `${{Postgres.POSTGRES_PASSWORD}}`
- **DB_USER:** `${{Postgres.POSTGRES_USER}}`
- **DB_NAME:** `${{Postgres.POSTGRES_DB}}`
- **DB_PORT:** `5432`
- **NODE_ENV:** `production`

### 📌 Paso 2: Solución al error de lectura del archivo `.env`
Como el archivo `.env` físico no se sube a internet por seguridad, las funciones nativas de Node.js (`process.loadEnvFile()`) harán crashear el servidor en la nube al no encontrarlo. Para solucionarlo sin alterar código, aplicamos este comando de construcción en el panel web:
1. En el servicio de tu API en Railway, andá a la pestaña **Settings**.
2. Bajá hasta la sección **Build**.
3. En el campo **Build Command**, pegá exactamente: touch .env
Esto creará un archivo en blanco antes de la ejecución para que el servidor inicie con éxito utilizando las variables cargadas en el panel.

---

## 📁 Estructura del Proyecto

api-miniblog/
├── db/
│   ├── index.js           # Conexión a PostgreSQL (Pool de conexiones)
│   └── setup.sql          # Script de inicialización (Tablas y datos)
├── docs/
│   ├── openapi.yaml       # Especificación y contrato OpenAPI 3.1.0 de la API
│   └── Documentación IA con prompt.md # Registro del proceso de desarrollo asistido por IA
├── middlewares/
│   └── errorHandler.js    # Middleware global para manejo centralizado de errores
├── routes/
│   ├── authors.js         # Endpoints y ruteo HTTP de autores
│   └── posts.js           # Endpoints y ruteo HTTP de posts
├── services/
│   ├── authorService.js   # Lógica de negocios y consultas SQL de autores
│   └── postService.js     # Lógica de negocios y consultas SQL de posts
├── validators/
│   ├── authorValidator.js # Validaciones de datos de entrada para autores
│   └── postValidator.js   # Validaciones de datos de entrada para posts
├── tests/
│   ├── api.test.js        # Suite de pruebas con Vitest + Supertest
│   └── edgecases.test.js  # Pruebas de robustez, límites e inyección SQL
├── server.js              # Punto de entrada de la aplicación Express
├── package.json           # Scripts del sistema y dependencias anotadas
└── vitest.config.js       # Configuración de entorno de pruebas

---

## 📝 Endpoints Principales (Contrato de la API)

### Autores (`/api/authors`)
- GET /api/authors — Listar todos los autores.
- GET /api/authors/:id` — Obtener un autor específico por su ID.
- POST /api/authors — Crear un nuevo autor (requiere name y email).
- PUT /api/authors/:id — Actualizar los datos de un autor por su ID.
- DELETE /api/authors/:id — Eliminar un autor por su ID.

### Posts (`/api/posts`)
- GET /api/posts — Listar todos los posts registrados.
- GET /api/posts/:id — Obtener un post específico por su ID.
- GET /api/posts/author/:authorId — Listar todas las publicaciones de un autor específico.
- POST /api/posts — Crear un nuevo post (requiere title, content y author_id).
- PUT /api/posts/:id — Actualizar el contenido de un post por su ID.
- DELETE /api/posts/:id — Eliminar un post por su ID.

---

## ⚠️ Manejo de Errores y Validaciones de Robustez

La API aplica validaciones rigurosas en la capa de entrada (`validators/`) y centraliza las excepciones mediante un middleware global (`errorHandler.js`), devolviendo respuestas controladas:
- **400 Bad Request:** Formatos incorrectos (emails inválidos sin `@`, nombres vacíos, IDs negativos).
- **404 Not Found:** Intentos de búsqueda o edición sobre recursos inexistentes.
- **500 Internal Server Error:** Excepciones imprevistas o restricciones relacionales directas de la DB (violación de Claves Foráneas, longitudes excedidas).

### Pruebas de Robustez (`edgecases.test.js`)
Para medir la tolerancia a fallos y asegurar la estabilidad de la aplicación frente a fallas o entradas maliciosas, la suite evalúa escenarios límite:
- Envío de strings extremadamente largos que superen el límite de caracteres de las columnas.
- Intentos de ataques por **Inyección SQL** para garantizar la seguridad de las consultas parametrizadas.
- Limpieza automatizada de recursos temporales creados durante el testeo para evitar efectos secundarios en la base de datos local.

Para ejecutar toda la suite de pruebas automatizadas, simplemente corré en tu terminal el comando: npm test