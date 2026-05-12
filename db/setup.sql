-- Borramos las tablas si existen para poder resetear la base
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS authors;

-- Tabla de autores
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- Datos de ejemplo para probar
INSERT INTO authors (name, email, bio) VALUES
  ('Santiago Chavez', 'santiago@example.com', 'Desarrollador Full Stack en formación'),
  ('Heidi', 'heidi@example.com', 'Colaboradora del proyecto');

INSERT INTO posts (title, content, author_id, published) VALUES
  ('Mi primer post', 'Contenido del post inicial...', 1, true);