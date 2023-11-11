import request from 'supertest';
import app from '@src/app';

it('fails when a email that does not exists is supplied', async () => {
  return request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(200);

  await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'invalid-password',
    })
    .expect(400);
});

it('responds with a success when given valid credentials', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test12@test.com',
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(200);

  await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test12@test.com',
      password: 'password',
    })
    .expect(200);
});
