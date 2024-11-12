// tests/auth.controller.test.js

const request = require('supertest');
const express = require('express');
const { login, register } = require('../controllers/auth.controller');

const app = express();
app.use(express.json());
app.post('/login', login);
app.post('/register', register);

describe('Auth Controller', () => {

  describe('POST /login', () => {
    it('should return status 200 if credentials are correct', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login successful');
    });

    it('should return status 401 if credentials are incorrect', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'wrongpassword' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return status 400 if username or password is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'admin' }); // missing password

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Username and password are required');
    });
  });

  describe('POST /register', () => {
    it('should return status 201 when registration is successful', async () => {
      const res = await request(app)
        .post('/register')
        .send({ username: 'newuser', password: 'newpassword123', email: 'user@example.com' });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Registration successful');
    });

    it('should return status 400 if any required field is missing', async () => {
      const res = await request(app)
        .post('/register')
        .send({ username: 'newuser', password: 'newpassword123' }); // missing email

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('All fields are required');
    });
  });
});
