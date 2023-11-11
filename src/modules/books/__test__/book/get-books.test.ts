import request from 'supertest';
import app from '@src/app';
import db from '@config/database/db-config';
import { tables } from '@constants/tables.enum';

it('has a route handler listing to /api/v1/books for get requests', async () => {
  const response = await request(app).get('/api/v1/books').send({});
  expect(response.status).not.toEqual(404);
});

it('can fetch a list of books', async () => {
  const book1 = { title: 'Book A', num_of_pages: 10 };
  const book2 = { title: 'Book B', num_of_pages: 20 };

  await db(tables.BOOKS).insert([book1, book2]);

  const response = await request(app).get('/api/v1/books').send().expect(200);
  expect(response.body.data.length).toEqual(2);
});
