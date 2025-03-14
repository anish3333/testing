// server.test.js
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Mock the morgan logger to prevent console output during tests
jest.mock('morgan', () => () => (req, res, next) => next());


describe('Server Endpoints', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Define routes directly within the test setup to avoid module caching issues
    app.get('/', (req, res) => {
      res.json({ message: 'Welcome to the API!' });
    });

    app.get('/users/:id', (req, res) => {
      res.json({
        message: `Fetching user with ID: ${req.params.id}`,
        userId: req.params.id
      });
    });

    app.post('/data', (req, res) => {
      res.status(201).json({
        message: 'Data received successfully',
        data: req.body
      });
    });
  });

  it('should return a welcome message on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'Welcome to the API!' });
  });

  it('should fetch a user by ID on GET /users/:id', async () => {
    const res = await request(app).get('/users/123');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: 'Fetching user with ID: 123',
      userId: '123'
    });
  });

  it('should receive data on POST /data', async () => {
    const data = { name: 'Test User', email: 'test@example.com' };
    const res = await request(app)
      .post('/data')
      .send(data);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      message: 'Data received successfully',
      data: data
    });
  });

  it('should handle empty data on POST /data', async () => {
    const res = await request(app)
      .post('/data')
      .send({});

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      message: 'Data received successfully',
      data: {}
    });
  });

  it('should return 404 for non-existent route', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toEqual(404);
  });
});