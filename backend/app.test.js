const request = require('supertest')

const app = require('./app').app;

describe('app module', () => {
    // beforeAll(async() => {

    // })
    it('should print first test', () => {
        expect(true).toBe(true);
    });
    it('should test hello api', async () => {
        const res = await request(app)
        .get('/api/hello').send();
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('message');
    });
})