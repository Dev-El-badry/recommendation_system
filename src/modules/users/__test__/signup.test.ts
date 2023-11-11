import request from 'supertest';
import app from '@src/app';

it('returns a 200 on successfully sign up', async () => {
  return request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(200);
});

it('returns a 400 with a invalid email', async () => {
  return request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'testtest',
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(400);
});
it('returns a 400 with a invalid password', async () => {
  return request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test2@test.com',
      password: 'pa',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(400);
});
it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      password: 'pas',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400);
});
it('disallowed duplicate emails', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test1@test.com',
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(200);
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test1@test.com',
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(400);
});
it('sends a token after successfully signup', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test4@test.com',
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(200);
});
