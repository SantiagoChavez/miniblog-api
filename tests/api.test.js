// 1. CARGA DE ENTORNO (Debe ser lo primero, antes que cualquier require)
const { loadEnvFile } = require('node:process');
try {
    loadEnvFile('.env');
} catch (err) {
    console.log("Aviso: No se pudo cargar el .env, verificando variables de entorno...");
}

// 2. IMPORTACIONES
const request = require('supertest');
const app = require('../server');

describe('Pruebas completas del CRUD - API Miniblog', () => {
    let createdAuthorId;
    let createdPostId;

    describe('CRUD de Autores', () => {
        test('GET /api/authors - Debería obtener lista de autores (200)', async () => {
            const response = await request(app).get('/api/authors');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('POST /api/authors - Debería crear un autor (201)', async () => {
            const authorData = {
                name: 'Juan Pérez',
                email: 'juan@example.com',
                bio: 'Escritor apasionado'
            };

            const response = await request(app)
                .post('/api/authors')
                .send(authorData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(authorData.name);
            expect(response.body.email).toBe(authorData.email);
            expect(response.body.bio).toBe(authorData.bio);

            createdAuthorId = response.body.id;
        });

        test('POST /api/authors - Debería fallar con datos inválidos (400)', async () => {
            const response = await request(app)
                .post('/api/authors')
                .send({ name: 'Solo nombre' });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('requeridos');
        });

        test('POST /api/authors - Debería fallar con email duplicado (400)', async () => {
            const authorData = {
                name: 'Otro Juan',
                email: 'juan@example.com', // Email ya usado
                bio: 'Otro bio'
            };

            const response = await request(app)
                .post('/api/authors')
                .send(authorData);

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('ya existe');
        });

        test('GET /api/authors/:id - Debería obtener autor por ID (200)', async () => {
            const response = await request(app).get(`/api/authors/${createdAuthorId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe(createdAuthorId);
            expect(response.body.name).toBe('Juan Pérez');
        });

        test('GET /api/authors/:id - Debería fallar con ID inexistente (404)', async () => {
            const response = await request(app).get('/api/authors/99999');
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toContain('no encontrado');
        });

        test('PUT /api/authors/:id - Debería actualizar autor (200)', async () => {
            const updateData = {
                name: 'Juan Pérez Actualizado',
                email: 'juan.actualizado@example.com',
                bio: 'Bio actualizada'
            };

            const response = await request(app)
                .put(`/api/authors/${createdAuthorId}`)
                .send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe(createdAuthorId);
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.email).toBe(updateData.email);
        });

        test('PUT /api/authors/:id - Debería fallar con datos inválidos (400)', async () => {
            const response = await request(app)
                .put(`/api/authors/${createdAuthorId}`)
                .send({ name: '' }); // Nombre vacío

            expect(response.statusCode).toBe(400);
        });

        test('PUT /api/authors/:id - Debería fallar con ID inexistente (404)', async () => {
            const updateData = {
                name: 'Nombre',
                email: 'email@test.com',
                bio: 'Bio'
            };

            const response = await request(app)
                .put('/api/authors/99999')
                .send(updateData);

            expect(response.statusCode).toBe(404);
        });
    });

    describe('CRUD de Posts', () => {
        test('GET /api/posts - Debería obtener lista de posts (200)', async () => {
            const response = await request(app).get('/api/posts');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('POST /api/posts - Debería crear un post (201)', async () => {
            const postData = {
                title: 'Mi primer post',
                content: 'Este es el contenido del post',
                author_id: createdAuthorId,
                published: true
            };

            const response = await request(app)
                .post('/api/posts')
                .send(postData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(postData.title);
            expect(response.body.content).toBe(postData.content);
            expect(response.body.author_id).toBe(postData.author_id);

            createdPostId = response.body.id;
        });

        test('POST /api/posts - Debería fallar con datos inválidos (400)', async () => {
            const response = await request(app)
                .post('/api/posts')
                .send({ title: 'Solo título' });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('requeridos');
        });

        test('POST /api/posts - Debería fallar con author_id inexistente (500)', async () => {
            const postData = {
                title: 'Post con autor inválido',
                content: 'Contenido',
                author_id: 99999
            };

            const response = await request(app)
                .post('/api/posts')
                .send(postData);

            expect(response.statusCode).toBe(500); // Error de foreign key
        });

        test('GET /api/posts/:id - Debería obtener post por ID (200)', async () => {
            const response = await request(app).get(`/api/posts/${createdPostId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe(createdPostId);
            expect(response.body.title).toBe('Mi primer post');
        });

        test('GET /api/posts/:id - Debería fallar con ID inexistente (404)', async () => {
            const response = await request(app).get('/api/posts/99999');
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toContain('no encontrado');
        });

        test('GET /api/posts/author/:authorId - Debería obtener posts por autor (200)', async () => {
            const response = await request(app).get(`/api/posts/author/${createdAuthorId}`);
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0].author_id).toBe(createdAuthorId);
        });

        test('PUT /api/posts/:id - Debería actualizar post (200)', async () => {
            const updateData = {
                title: 'Post actualizado',
                content: 'Contenido actualizado',
                published: false
            };

            const response = await request(app)
                .put(`/api/posts/${createdPostId}`)
                .send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe(createdPostId);
            expect(response.body.title).toBe(updateData.title);
            expect(response.body.content).toBe(updateData.content);
            expect(response.body.published).toBe(updateData.published);
        });

        test('PUT /api/posts/:id - Debería fallar con datos inválidos (400)', async () => {
            const response = await request(app)
                .put(`/api/posts/${createdPostId}`)
                .send({ title: '' }); // Título vacío

            expect(response.statusCode).toBe(400);
        });

        test('PUT /api/posts/:id - Debería fallar con ID inexistente (404)', async () => {
            const updateData = {
                title: 'Título',
                content: 'Contenido',
                published: true
            };

            const response = await request(app)
                .put('/api/posts/99999')
                .send(updateData);

            expect(response.statusCode).toBe(404);
        });

        test('DELETE /api/posts/:id - Debería eliminar post (204)', async () => {
            const response = await request(app).delete(`/api/posts/${createdPostId}`);
            expect(response.statusCode).toBe(204);

            // Verificar que ya no existe
            const checkResponse = await request(app).get(`/api/posts/${createdPostId}`);
            expect(checkResponse.statusCode).toBe(404);
        });

        test('DELETE /api/posts/:id - Debería fallar con ID inexistente (404)', async () => {
            const response = await request(app).delete('/api/posts/99999');
            expect(response.statusCode).toBe(404);
        });
    });

    describe('Limpieza - Eliminar datos de prueba', () => {
        test('DELETE /api/authors/:id - Debería eliminar autor (204)', async () => {
            const response = await request(app).delete(`/api/authors/${createdAuthorId}`);
            expect(response.statusCode).toBe(204);

            // Verificar que ya no existe
            const checkResponse = await request(app).get(`/api/authors/${createdAuthorId}`);
            expect(checkResponse.statusCode).toBe(404);
        });

        test('DELETE /api/authors/:id - Debería fallar con ID inexistente (404)', async () => {
            const response = await request(app).delete('/api/authors/99999');
            expect(response.statusCode).toBe(404);
        });
    });

    // Cerramos cualquier proceso colgado
    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
});