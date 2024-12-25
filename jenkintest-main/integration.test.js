const request = require('supertest');
const app = require('./app');

describe('Integration Tests', () => {
    it('should return 200 for the root route', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    it('should handle non-existent routes gracefully', async () => {
        const res = await request(app).get('/non-existent');
        expect(res.statusCode).toBe(404);
    });
});
