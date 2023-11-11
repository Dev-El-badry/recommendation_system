import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { tables } from '../../constants/tables.enum';
import books from '../../constants/books';
import { randomIntFromInterval } from '../../common/utils/helper.util';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tables.READING_INTERVALS).del();
  await knex(tables.BOOKS).del();
  await knex(tables.USERS).del();

  const user1 = {
    email: 'user1@computer.null',
    first_name: 'user1',
    last_name: 'test',
    password: await bcrypt.hash('password', 12),
  };

  const user2 = {
    email: 'user2@computer.null',
    first_name: 'user2',
    last_name: 'test',
    password: await bcrypt.hash('password', 12),
  };

  // Inserts seed entries
  const [createdUser1] = await knex(tables.USERS).insert(user1).returning('*');
  const [createdUser2] = await knex(tables.USERS).insert(user2).returning('*');

  //Insert books
  const createdBooks = await knex(tables.BOOKS).insert(books).returning('*');

  for (const [index, book] of createdBooks.entries()) {
    if (index % 2 === 0) {
      await knex(tables.READING_INTERVALS).insert({
        user_id: createdUser1.id,
        book_id: book.id,
        start_page: randomIntFromInterval(1, 6),
        end_page: randomIntFromInterval(7, 20),
      });
    } else {
      await knex(tables.READING_INTERVALS).insert({
        user_id: createdUser2.id,
        book_id: book.id,
        start_page: randomIntFromInterval(1, 6),
        end_page: randomIntFromInterval(7, 20),
      });
    }
  }
}
