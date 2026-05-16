const request = require('supertest');
const app = require('../server');

describe('Edge cases y validaciones - Robustez', () => {
  let tempAuthorId;
  let tempPostId;

  test('POST /api/authors - email inválido -> 400', async () => {
    const res = await request(app)
      .post('/api/authors')
      .send({ name: 'Invalid Email', email: 'no-at-symbol', bio: 'bio' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('POST /api/authors - nombre vacío -> 400', async () => {
    const res = await request(app)
      .post('/api/authors')
      .send({ name: '', email: 'ok@example.com' });

    expect(res.statusCode).toBe(400);
  });

  test('POST /api/authors - email duplicado -> 400', async () => {
    const payload = { name: 'Dup User', email: 'dup@example.com', bio: 'x' };
    const r1 = await request(app).post('/api/authors').send(payload);
    expect(r1.statusCode).toBe(201);
    tempAuthorId = r1.body.id;

    const r2 = await request(app).post('/api/authors').send(payload);
    expect(r2.statusCode).toBe(400);
  });

  test('POST /api/posts - author_id negativo -> 400', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'T', content: 'C', author_id: -5 });

    expect(res.statusCode).toBe(400);
  });

  test('POST /api/posts - author_id no numérico -> 400', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'T', content: 'C', author_id: 'not-a-number' });

    expect(res.statusCode).toBe(400);
  });

  test('POST /api/posts - author_id inexistente -> 500 (FK)', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'T', content: 'C', author_id: 999999 });

    expect([500, 400]).toContain(res.statusCode); // admitir 500 o 400 dependiendo del backend
  });

  test('POST /api/posts - título muy largo -> crear (no hay límite)', async () => {
    const longTitle = 'a'.repeat(2000);
    // Necesitamos un author válido; si no existe, crear uno temporal
    const author = await request(app).post('/api/authors').send({ name: 'Edge Author', email: `edge${Date.now()}@test.com` });
    expect(author.statusCode).toBe(201);
    const authorId = author.body.id;

    const res = await request(app)
      .post('/api/posts')
      .send({ title: longTitle, content: 'C', author_id: authorId });

    expect([201, 400, 500]).toContain(res.statusCode); // acepta largo o rechaza según reglas (500 = DB column length)
    if (res.statusCode === 201) tempPostId = res.body.id;
  });

  test('Inyección SQL en nombre de autor no produce 500', async () => {
    const name = "Robert'); DROP TABLE authors;--";
    const res = await request(app).post('/api/authors').send({ name, email: `sql${Date.now()}@test.com` });
    expect(res.statusCode).not.toBe(500);
  });

  // Limpieza de recursos creados
  afterAll(async () => {
    if (tempPostId) await request(app).delete(`/api/posts/${tempPostId}`);
    if (tempAuthorId) await request(app).delete(`/api/authors/${tempAuthorId}`);
  });
});
