import request from 'supertest';
import app from '../../src/app';

import { tables } from '../../constants/tables.enum';
import db from '../database/db-config';

declare global {
  // eslint-disable-next-line no-var
  var signin: () => Promise<string>;
}

beforeAll(async () => {
  process.env.JWT_KEY = 'my-secret-key';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

beforeEach(async () => {
  jest.clearAllMocks();

  await Promise.all(
    Object.values(tables)
      .reverse()
      .map((table) => db(table).truncate()),
  );
});

global.afterAll(async () => {
  await db.destroy();
});

global.signin = async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test100@test.com',
      password: 'password',
      first_name: 'user',
      last_name: 'test',
    })
    .expect(200);

  const response = await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test100@test.com',
      password: 'password',
    })
    .expect(200);

  return response.body.access_token;
};
