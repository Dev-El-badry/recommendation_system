import request from 'supertest';
import app from '@src/app';
import { randomUUID } from 'crypto';
import { tables } from '@constants/tables.enum';
import db from '@config/database/db-config';

it('has a route handler listing to /api/v1/reading-intervals for post requests', async () => {
  const response = await request(app).post('/api/v1/reading-intervals').send({});
  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/v1/reading-intervals').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const accessToken = await (globalThis as any).signin();

  const response = await request(app)
    .post('/api/v1/reading-intervals')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid book ID', async () => {
  const accessToken = await (globalThis as any).signin();
  await request(app)
    .post('/api/v1/reading-intervals')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      book_id: 1,
      start_page: 1,
      end_page: 3,
    })
    .expect(400);
});

it('returns an error if an start page below than 1', async () => {
  const accessToken = await (globalThis as any).signin();
  await request(app)
    .post('/api/v1/reading-intervals')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      book_id: randomUUID(),
      start_page: 0,
      end_page: 3,
    })
    .expect(400);
});

it('create a interval with valid input', async () => {
  const [book1] = (await db(tables.BOOKS).insert({ title: 'Book D', num_of_pages: 28 }).returning('*')) as any;

  const accessToken = await (globalThis as any).signin();

  await request(app)
    .post('/api/v1/reading-intervals')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      book_id: book1.id,
      start_page: 2,
      end_page: 10,
    })
    .expect(200);
});
