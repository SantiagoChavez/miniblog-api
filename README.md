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

### Descripción de directorios

- **db/**: Manejo de base de datos. `index.js` crea el pool de conexiones, `setup.sql` define tablas e inserta datos iniciales.
- **middlewares/**: Middlewares de Express. `errorHandler.js` captura todos los errores y devuelve respuestas consistentes.
- **routes/**: Define los endpoints HTTP. Importan servicios y validadores.
- **services/**: Lógica de negocio. Ejecutan queries SQL y retornan datos procesados.
- **validators/**: Validación de datos. Validan entrada de usuario antes de procesarla.
- **tests/**: Suite de pruebas automatizadas. Usan Vitest para correr y Supertest para probar endpoints HTTP.

## ⚙️ Variables de Entorno

Para que este proyecto funcione correctamente (tanto de forma local como en producción), se deben configurar las siguientes variables de entorno. En Railway, estas credenciales se vinculan dinámicamente desde el panel web para conectar la base de datos de la nube sin exponer datos sensibles.

### Configuración Local
Crea un archivo `.env` en la raíz del proyecto con estas variables mínimas:

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
NODE_ENV=development

🚀 Despliegue en Railway (Producción)
Para subir con éxito esta API a Railway junto a la base de datos PostgreSQL, seguí rigurosamente estos dos pasos de configuración.

📌 Paso 1: Configurar las Variables de Entorno en la Nube
Antes de encender el servidor, Railway necesita conocer los accesos de la base de datos remota. Si no se configuran, el backend intentará buscar la base de datos local (localhost) y arrojará un error crítico de conexión.

En el tablero principal de Railway, hacé doble clic sobre el bloque del servicio de tu API (miniblog-api).

Andá a la pestaña Variables en el menú de la derecha.

En la sección Suggested Variables (Variables sugeridas), el sistema leerá de forma automática lo que tu código requiere. Reemplazá los valores por defecto escribiendo el signo $ para mapear las credenciales reales de la nube:

DB_HOST: Borrá localhost, escribí $ y seleccioná ${{Postgres.PGHOST}}

DB_PASSWORD: Borrá el texto por defecto, escribí $ y seleccioná ${{Postgres.POSTGRES_PASSWORD}}

DB_USER: Borrá postgres, escribí $ y seleccioná ${{Postgres.POSTGRES_USER}}

DB_NAME: Borrá tu base de datos local, escribí $ y seleccioná ${{Postgres.POSTGRES_DB}}

DB_PORT: Dejá el valor por defecto (5432).

NODE_ENV: Cambiá development por la palabra production (en minúsculas).

Hacé clic en el botón morado ✓ Add abajo a la derecha de la lista para guardar todo junto.

📌 Paso 2: Solución al Error ENOENT: no such file or directory, open '.env'
En el entorno local, se utilizan funciones nativas de Node.js (como process.loadEnvFile()) que obligan al servidor a abrir físicamente un archivo .env. Como este archivo está en el .gitignore y nunca se sube a GitHub, cuando Railway levanta el contenedor en internet, la función de lectura rompe la ejecución del servidor porque el archivo no existe físicamente, dejando el servicio en estado Crashed.

Para solucionarlo sin necesidad de modificar el código de tu API, aplicamos un "engaño táctico" creando un archivo vacío desde la interfaz web:

En el panel de configuración de tu API, andá a la pestaña Settings (Configuración) arriba a la derecha.

Bajá con la rueda del mouse hasta la sección Build (Construcción).

En el campo de texto llamado Build Command (Comando de construcción), pegá exactamente el siguiente comando de Linux:

Bash
touch .env

Hacé clic afuera o salí del casillero para que guarde los cambios automáticamente.

¿Cómo funciona? El comando touch .env crea un archivo en blanco con ese nombre exacto un segundo antes de que la aplicación empiece a correr. Al iniciar, el código de Node.js encuentra el archivo físico, la función pasa de largo sin fallar, y el backend toma con éxito las variables de entorno reales que configuramos en el panel de Railway.

💻 Ejecución local
Clona el repositorio:

Bash
git clone [https://github.com/SantiagoChavez/miniblog-api.git](https://github.com/SantiagoChavez/miniblog-api.git)
cd api-miniblog
Instala dependencias:

Bash
npm install

Crea la base de datos y ejecuta el script de inicialización:

Con psql o tu herramienta favorita, ejecuta db/setup.sql.

Crea el archivo .env con los valores de conexión.

Inicia en modo desarrollo:

Bash
npm run dev

Abre http://localhost:3000 y prueba el endpoint raíz.

📦 Comandos disponibles
npm start — inicia el servidor en producción.

npm run dev — inicia el servidor en modo desarrollo con recarga automática.

npm test — ejecuta la suite de pruebas con Vitest y Supertest.

📝 Endpoints principales
Base URL: http://localhost:3000 (Local) o URL de producción de Railway.

Autores
GET /api/authors — listar autores.

GET /api/authors/:id — obtener autor por ID.

POST /api/authors — crear autor.

PUT /api/authors/:id — actualizar autor.

DELETE /api/authors/:id — eliminar autor.

Posts
GET /api/posts — listar posts.

GET /api/posts/:id — obtener post por ID.

GET /api/posts/author/:authorId — posts de un autor.

POST /api/posts — crear post.

PUT /api/posts/:id — actualizar post.

DELETE /api/posts/:id — eliminar post.

🌱 Configuración de entorno y tests
Copia .env.example a .env y completa los valores con tus credenciales locales.

No subas .env a GitHub; el repositorio debe usar solo .env.example.

.env.example muestra las variables necesarias sin exponer contraseñas.

Si estás en producción, usa variables de entorno reales configuradas en la plataforma de deployment.

Bash
cp .env.example .env

Para correr los tests unitarios y de integración se usa vitest con supertest.

Ejecuta:

Bash
npm test

⚠️ Manejo de errores y validaciones
La API aplica validaciones en el nivel de entrada (validators/) y maneja errores desde un middleware central (middlewares/errorHandler.js).

400 Bad Request: datos de entrada inválidos (campos requeridos faltantes, tipos incorrectos, formato de email inválido). Los validadores lanzan errores con statusCode: 400.

404 Not Found: recurso no encontrado (p. ej. autor o post inexistente).

201 Created / 200 OK / 204 No Content: respuestas exitosas según el endpoint.

500 Internal Server Error: errores imprevistos del servidor o restricciones de la base de datos (p. ej. violación de FK, longitud de columna excedida).

Dónde están las validaciones:

validators/authorValidator.js: valida name, email y bio.

validators/postValidator.js: valida title, content, author_id y published.

Consejos de pruebas:

Para probar robustez, revisá tests/edgecases.test.js que contiene casos de validación y ataques comunes (inputs inválidos, author_id inexistente, títulos muy largos, intentos de inyección SQL).

Ejecutá npm test para correr la suite completa (Vitest + Supertest).

Qué hace tests/edgecases.test.js (resumen fácil)

Valida respuestas ante entradas inválidas: emails sin @, nombres vacíos, author_id negativo o no numérico.

Prueba la reacción ante constraints de la base de datos: author_id inexistente (espera 500 o 400 según configuración), títulos extremadamente largos, y verifica que no se produzca un 500 por inyección SQL.

Crea recursos temporales cuando necesita (autor/post) y los limpia al final del suite para no ensuciar la DB.

Está pensado para medir la robustez de las validaciones y prevenir crashes en producción.

Interpretación rápida de resultados

Si todos los tests pasan: las validaciones están en su lugar y la API responde correctamente ante casos límite.

Si alguno falla con 500: revisar los validadores y/o límites de columnas en la base de datos; considera aumentar validaciones o ajustar esquema DB.

Integración continua (CI)

Hemos añadido un workflow de GitHub Actions en .github/workflows/ci.yml que:

Levanta un servicio de PostgreSQL (imagen postgres:15).

Ejecuta db/setup.sql para poblar la base de datos de pruebas.

Ejecuta la suite con npm test (Vitest + Supertest).

Nota: el workflow asume que se ejecuta contra la rama main. Si necesitás ajustar variables de entorno privadas, añadilas como Secrets en tu repo.

📄 Documentación OpenAPI
La documentación de la API se encuentra en openapi.yaml.