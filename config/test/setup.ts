import { tables } from '../../constants/tables.enum';
import db from '../database/db-config';

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
