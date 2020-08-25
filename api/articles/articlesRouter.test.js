const supertest = require('supertest');
const db = require('../../data/dbConfig');
const server = require('../server');
const bcrypt = require('bcryptjs');
const { bcryptRounds } = require('../../config/secrets');

describe('articles endpoints', () => {
  let token = '';

  beforeAll(async () => {
    await db('users').truncate();
    await db('articles').truncate();
  });
  afterAll(async () => {
    await db('users').truncate();
    await db('articles').truncate();
  });

  it('should get a token for next tests', async () => {
    await supertest(server)
      .post('/api/auth/register')
      .send({ username: 'articlestest', password: bcrypt.hashSync('password', bcryptRounds) })
      .then(res => {
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
        console.log(token);
      })
      .catch(err => console.log(err));
  });

  it('should POST an article, 201', async () => {
    const newArticle = {
      title: 'New Article'
    };
    await supertest(server)
      .post('/api/articles')
      .send(newArticle)
      .set('Authorization', token)
      .then(res => {
        expect(res.body).toHaveProperty('title', 'New Article');
        expect(res.status).toBe(201);
      })
      .catch(err => console.log(err));
  });

  it('should return 400 with ill-formed POST', async () => {
    const newArticle = {
      article: 'New Article'
    };
    await supertest(server)
      .post('/api/articles')
      .send(newArticle)
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(400);
      })
      .catch(err => console.log(err));
  });

  it('should return 401 without auth to POST', async () => {
    const newArticle = {
      title: 'New Article'
    };
    await supertest(server)
      .post('/api/articles')
      .send(newArticle)
      .then(res => {
        expect(res.status).toBe(401);
      })
      .catch(err => console.log(err));
  });
  
  it('should GET articles, 200', async () => {
    await supertest(server)
      .get('/api/articles')
      .set('Authorization', token)
      .then(res => {
        expect(res.body[0]).toHaveProperty('title', 'New Article');
        expect(res.status).toBe(200);
      })
      .catch(err => console.log(err));
  });

  it('should return 401 without auth to GET', async () => {
    await supertest(server)
      .get('/api/articles')
      .then(res => {
        expect(res.status).toBe(401);
      })
      .catch(err => console.log(err));
  });

  it('should UPDATE an article, 200', async () => {
    const updateArticle = {
      title: 'Updated Article'
    };
    await supertest(server)
      .put('/api/articles/1')
      .send(updateArticle)
      .set('Authorization', token)
      .then(res => {
        expect(res.body).toHaveProperty('title', 'Updated Article');
        expect(res.status).toBe(200);
      })
      .catch(err => console.log(err));
  });

  it('should return 401 without auth to UPDATE', async () => {
    const updateArticle = {
      title: 'Updated Article'
    };
    await supertest(server)
      .put('/api/articles/1')
      .send(updateArticle)
      .then(res => {
        expect(res.status).toBe(401);
      })
      .catch(err => console.log(err));
  });

  it('return 401 without auth to DELETE', async () => {
    await supertest(server)
      .delete('/api/articles/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(401);
      })
      .catch(err => console.log(err));
  });

  it('should DELETE an article, 200', async () => {
    await supertest(server)
      .delete('/api/articles/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.body).toHaveProperty('message', 'Deleted.');
        expect(res.status).toBe(200);
      })
      .catch(err => console.log(err));
  });
});


