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

describe('Pruebas de la API Miniblog', () => {

    test('Debería obtener la lista de posts con status 200', async () => {
        const response = await request(app).get('/api/posts');
        
        // Si sale 500, imprimimos el error para ver qué pasó en la DB
        if (response.statusCode === 500) console.error('Error 500 en Posts:', response.body);
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Debería responder status 200 al pedir autores', async () => {
        const response = await request(app).get('/api/authors');
        
        if (response.statusCode !== 200) {
            console.log('--- DEBUG AUTORES ---');
            console.log('STATUS:', response.statusCode);
            console.log('BODY:', response.body);
        }
        
        expect(response.statusCode).toBe(200);
    });

    // Cerramos cualquier proceso colgado
    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
});