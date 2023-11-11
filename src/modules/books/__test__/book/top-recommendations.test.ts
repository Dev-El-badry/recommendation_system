import request from 'supertest';
import app from '@src/app';
import db from '@config/database/db-config';
import { tables } from '@constants/tables.enum';
import { randomIntFromInterval } from '@common/utils/helper.util';

it('has a route handler listing to /api/v1/books/top-recommendations for get requests', async () => {
  const response = await request(app).get('/api/v1/books/top-recommendations').send({});
  expect(response.status).not.toEqual(404);
});

const createRandomUser = async () => {
  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: `test${randomIntFromInterval(3, 1000)}@test.com`,
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(200);

  return response.body.data;
};

it('can fetch a top 5 recommendations books', async () => {
  const user1 = await createRandomUser();
  const user2 = await createRandomUser();
  const user3 = await createRandomUser();

  const [book1] = (await db(tables.BOOKS).insert({ title: 'Book A', num_of_pages: 28 }).returning('*')) as any;
  const [book2] = (await db(tables.BOOKS).insert({ title: 'Book B', num_of_pages: 20 }).returning('*')) as any;

  const intervals = [
    {
      user_id: user1.id,
      book_id: book1.id,
      start_page: 10,
      end_page: 30,
    },
    {
      user_id: user2.id,
      book_id: book1.id,
      start_page: 2,
      end_page: 25,
    },
    {
      user_id: user1.id,
      book_id: book2.id,
      start_page: 40,
      end_page: 50,
    },
    {
      user_id: user3.id,
      book_id: book2.id,
      start_page: 1,
      end_page: 10,
    },
  ];

  await db(tables.READING_INTERVALS).insert(intervals);

  const response = await request(app).get('/api/v1/books/top-recommendations').send().expect(200);
  expect(response.body.data.length).toEqual(2);

  expect(response.body.data[0].book_name).toEqual(book1.title);
  expect(response.body.data[0].num_of_pages).toEqual(28);

  expect(response.body.data[1].book_name).toEqual(book2.title);
  expect(response.body.data[1].num_of_pages).toEqual(20);
});
