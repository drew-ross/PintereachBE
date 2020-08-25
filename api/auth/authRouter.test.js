const supertest = require('supertest');
const db = require('../../data/dbConfig');
const server = require('../server');
const bcrypt = require('bcryptjs');
const { bcryptRounds } = require('../../config/secrets');

describe('authentication', () => {

  describe('register', () => {

    beforeEach(async () => {
      await db('users').truncate();
    });
    afterAll(async () => {
      await db('users').truncate();
    });

    it('should create a new user', async () => {
      let users = await db('users');
      expect(users).toHaveLength(0);

      await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'anewuser', password: bcrypt.hashSync('password', bcryptRounds) })
        .then()
        .catch(err => console.log(err));
      users = await db('users');

      expect(users).toHaveLength(1);
      expect(users[0]).toHaveProperty('username', 'anewuser');
    });

    it('should return 201 when successful', async () => {
      await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'anewuser', password: bcrypt.hashSync('password', bcryptRounds) })
        .then(res => expect(res.status).toBe(201))
        .catch(err => console.log(err));
    });

    it('should return 400 with ill-formed request', async () => {
      await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'anewuser' })
        .then(res => expect(res.status).toBe(400))
        .catch(err => console.log(err));
    });

    it('should return a token and username when successful', async () => {
      await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'anewuser', password: bcrypt.hashSync('password', bcryptRounds) })
        .then(res => {
          expect(res.body).toHaveProperty('token');
          expect(res.body).toHaveProperty('username');
        })
        .catch(err => console.log(err));
    });
  });

  describe('login', () => {

    beforeAll(async () => {
      await db('users').truncate();
      await db('users')
        .insert({ username: 'anewuser', password: bcrypt.hashSync('password', bcryptRounds) });
    });
    afterAll(async () => {
      await db('users').truncate();
    });

    it('should return 200 when successfully logged in', async () => {
      await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'anewuser', password: 'password' })
        .then(res => expect(res.status).toBe(200))
        .catch(err => console.log(err));
    });

    it('should return a token and username when successful', async () => {
      await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'anewuser', password: 'password' })
        .then(res => {
          expect(res.body).toHaveProperty('token');
          expect(res.body).toHaveProperty('username');
        })
        .catch(err => console.log(err));
    });

    it('should return 400 with ill-formed request', async () => {
      await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'anewuser' })
        .then(res => expect(res.status).toBe(400))
        .catch(err => console.log(err));
    });
  });
});