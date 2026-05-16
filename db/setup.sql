-- 1. CREACIÓN DE TABLAS (Por si las dudas, con IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS authors (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(150) UNIQUE NOT NULL,
	bio VARCHAR(1000),
 created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
 id SERIAL PRIMARY KEY,
 title VARCHAR(255) NOT NULL,
 content TEXT NOT NULL CHECK (char_length(content) <= 5000),
 author_id INTEGER NOT NULL,
 published BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMPTZ DEFAULT NOW(),
 FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- 2. LIMPIEZA (Para asegurarnos de que empiece de cero y limpio)
TRUNCATE TABLE posts, authors RESTART IDENTITY CASCADE;

-- 3. INSERCIÓN DE AUTORES (10 Autores Profesionales)
INSERT INTO authors (name, email, bio) VALUES
 ('Santiago Chavez', 'santiago@example.com', 'Desarrollador Full Stack en formación, apasionado por el backend y PostgreSQL.'),
 ('Heidi', 'heidi@example.com', 'Colaboradora del proyecto Miniblog, especialista en testing y QA.'),
 ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js y la arquitectura de software.'),
 ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en optimización de bases de datos relacionales.'),
 ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST y seguridad web.'),
 ('Lucas Martínez', 'lucas@example.com', 'Evangelista de Javascript, entusiasta del open source y creador de contenido.'),
 ('Florencia Díaz', 'flor@example.com', 'Diseñadora de UI/UX y maquetadora frontend con debilidad por las animaciones en CSS.'),
 ('Javier Peralta', 'javier@example.com', 'SysAdmin y DevOps con años de experiencia en despliegues en la nube y Docker.'),
 ('Gabriela Torres', 'gaby@example.com', 'Científica de datos, curiosa del machine learning y fanática del café fuerte.'),
 ('Esteban Quito', 'esteban@example.com', 'Programador veterano que todavía extraña los puntos y comas obligatorios.');

-- 4. INSERCIÓN DE POSTS (Más de 30 posts para poblar la API masivamente)
INSERT INTO posts (title, content, author_id, published) VALUES
 ('Introducción a Node.js', 'Node.js es un entorno de ejecución para JavaScript construido con el motor V8 de Chrome...', 3, true),
 ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas, pero hoy analizamos por qué Postgres lidera en Henry...', 4, true),
 ('APIs RESTful desde cero', 'REST es un estilo arquitectónico que define un conjunto de restricciones para crear servicios web...', 5, true),
 ('Manejo de errores en Express', 'El manejo apropiado de errores con middlewares globales evita que tu servidor se caiga en producción...', 5, true),
 ('Async/Await explicado de forma simple', 'Las promesas simplifican el código asíncrono. En este post veremos cómo estructurarlo limpiamente...', 3, true),
 ('Configurando el Pool de Conexiones', 'Para escalar una base de datos relacional con Node, la estrategia de un Pool es indispensable...', 1, true),
 ('Por qué Vitest es más rápido que Jest', 'Hoy analizamos la velocidad de ejecución y la facilidad de configuración de Vitest en proyectos modernos...', 2, true),
 ('El orden de los Middlewares importa', 'Express ejecuta el código de manera secuencial. Si pones el error handler arriba, nada va a funcionar...', 1, true),
 ('Variables de entorno seguras con .env', 'Nunca subas tus contraseñas a GitHub. Te enseñamos a usar .env y .env.example correctamente...', 1, true),
 ('Mi primer despliegue en Railway', 'Pasos detallados para subir una API hecha en Express y conectar una base de datos PostgreSQL...', 1, true),
 ('¿Qué es SQL Injection y cómo evitarlo?', 'Aprende a usar consultas parametrizadas para proteger tu base de datos de ataques maliciosos...', 4, true),
 ('Buenas prácticas de Git en equipos', 'El uso correcto de ramas, commits descriptivos y Pull Requests mejora la salud de tu repositorio...', 2, true),
 ('Optimizando índices en Postgres', 'Si tus consultas GET tardan demasiado, probablemente te haga falta configurar un índice estratégico...', 4, true),
 ('Diseño de Base de Datos para Blogs', 'Análisis del modelo Entidad-Relación entre las tablas de autores y publicaciones en un sistema moderno...', 4, true),
 ('Introducción a las consultas con JOIN', 'Cómo vincular la tabla de posts con autores para traer el nombre del creador en un solo endpoint...', 1, true),
 ('Uso de CSS Grid vs Flexbox', 'Cuándo utilizar un sistema bidimensional y cuándo resolver tus diseños con un eje unidimensional...', 7, true),
 ('Mejorando el rendimiento del Frontend', 'Estrategias de carga diferida, compresión de imágenes y optimización de bundles para el cliente...', 7, true),
 ('Estrategias de Deploy en la Nube', 'Comparativa exhaustiva entre Railway, Render y Vercel para subir proyectos Full Stack...', 8, true),
 ('Introducción a Docker para Node', 'Crea contenedores livianos para asegurar que tu código corra igual en tu PC que en el servidor...', 8, true),
 ('Principios SOLID en JavaScript', 'Cómo escribir código mantenible, escalable y fácil de testear aplicando buenas prácticas...', 6, true),
 ('El rol de un QA en el Módulo 2', 'Por qué escribir pruebas de integración con Supertest te ahorra horas de debugging manual...', 2, true),
 ('Cómo manejar JWT de forma segura', 'Estrategias para almacenar tokens de autenticación sin vulnerar la seguridad del usuario...', 5, true),
 ('Estructura de carpetas profesional', 'Por qué separar rutas, servicios y controladores te convierte en un desarrollador más ordenado...', 3, true),
 ('El futuro de JavaScript en 2026', 'Nuevas características del lenguaje que están cambiando la forma en que escribimos código moderno...', 6, true),
 ('¿Qué es el pool de conexiones?', 'Una explicación profunda de cómo reutilizar conexiones TCP para no saturar tu motor de base de datos...', 4, true),
 ('Manejo de fechas en bases de datos', 'Por qué siempre debes usar el tipo de dato TIMESTAMPTZ para evitar líos con los husos horarios...', 4, true),
 ('Escribiendo tu primer Readme profesional', 'Tu portafolio habla por ti. Aprende a documentar una API para que destaque en cualquier entrevista...', 1, true),
 ('Herramientas de testing infaltables', 'Un repaso por herramientas clave para asegurar la calidad de tu código sin volverte loco...', 2, true),
 ('Middleware de validación personalizado', 'Cómo frenar las peticiones mal formadas antes de que toquen la lógica de tu negocio...', 3, true),
 ('Consejos para entrevistas técnicas', 'Lo que buscan los reclutadores cuando revisan tus proyectos integradores de Henry...', 6, true),
 ('Saliendo del bucle de tutoriales', 'Cómo empezar a crear proyectos propios aplicando lo aprendido en la Tecnicatura...', 1, false),
 ('Próximos pasos hacia el Módulo 3', 'Mentiras y verdades sobre lo que se viene en la carrera y cómo prepararse mentalmente...', 2, false);