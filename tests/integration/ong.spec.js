const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rowback(); // zera o db 
        await connection.migrate.latest();  // realiza as migrates
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            // .set('authorization', '<id>') => setando header
            .send({
                name: "Test",
                email: "test@test.com",
                whatsapp: "12991282028",
                city: "Test",
                uf: "TS"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});