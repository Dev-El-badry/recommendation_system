import request from 'supertest';
import app from '@src/app';

it('responds with details with current user', async () => {
  const accessToken = await (globalThis as any).signin();

  const response = await request(app)
    .get('/api/v1/auth/me')
    .send()
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);

  expect(response.body.data.email).toEqual('test100@test.com');
});

it('responds with null if not authenticate', async () => {
  await request(app).get('/api/v1/auth/me').send().expect(401);
});
