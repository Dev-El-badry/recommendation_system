import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { tables } from '../../constants/tables.enum';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tables.USERS).del();

  const user1 = {
    email: 'user1@computer.null',
    first_name: 'user1',
    last_name: 'test',
    password: await bcrypt.hash('password', 12),
  };

  // Inserts seed entries
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createdUser] = await knex(tables.USERS).insert(user1).returning('*');
}
