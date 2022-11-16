const request = require('supertest');
const app = require('../../../app');
const {User} = require('../../../app/models');

describe('POST /v1/auth/register', () => {
  const regCred = {
    name: 'Impostor',
    email: new Date().getDate() + '@amongus.com',
    password: 'password',
  };

  afterAll(async () => {
    await User.destroy({
      where: {email: regCred.email},
    });
  });

  it('should response code 201 and return token if create success.',
      async () => {
        return request(app)
            .post('/v1/auth/register')
            .set('Content-Type', 'application/json')
            .send(regCred)
            .then((res) => {
              expect(res.statusCode).toBe(201);
              expect(res.body).toHaveProperty('accessToken');
            });
      });

  it('should response code 422 if email already reg.', async () => {
    return request(app)
        .post('/v1/auth/register')
        .set('Content-Type', 'application/json')
        .send(regCred)
        .then((res) => {
          expect(res.statusCode).toBe(422);
        });
  });
});
