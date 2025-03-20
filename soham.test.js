const userController = require('../userController');
const request = require('supertest');
const express = require('express');

// Create an Express app instance
const app = express();
app.use(express.json());

// Define routes to use the controller functions
app.get('/users/:id', userController.getUser);
app.post('/users', userController.createUser);


describe('userController', () => {
    describe('getUser', () => {
        it('should return a JSON response with the user ID', async () => {
            const userId = '123';
            const response = await request(app).get(`/users/${userId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: `Fetching user with ID: ${userId}`,
                userId: userId,
            });
        });
    });

    describe('createUser', () => {
        it('should create a user and return a 201 status code', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
            };
            const response = await request(app)
                .post('/users')
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: 'User created successfully!',
                user: {
                    name: userData.name,
                    email: userData.email,
                },
            });
        });

        it('should return a 400 status code if name is missing', async () => {
            const userData = {
                email: 'john.doe@example.com',
            };
            const response = await request(app)
                .post('/users')
                .send(userData);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Name and email are required' });
        });

        it('should return a 400 status code if email is missing', async () => {
            const userData = {
                name: 'John Doe',
            };
            const response = await request(app)
                .post('/users')
                .send(userData);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Name and email are required' });
        });

        it('should return a 400 status code if both name and email are missing', async () => {
            const userData = {};
            const response = await request(app)
                .post('/users')
                .send(userData);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Name and email are required' });
        });
    });
});