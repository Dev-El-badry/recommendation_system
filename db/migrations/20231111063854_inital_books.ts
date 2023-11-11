import { Knex } from 'knex';
import { tables } from '../../constants/tables.enum';
import { addDefaultColumns, uuid, references } from '../../common/utils/table.util';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tables.BOOKS, (table) => {
    uuid(table, knex);
    table.string('title', 120).notNullable().unique();
    table.integer('num_of_pages').defaultTo(0);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tables.READING_INTERVALS, (table) => {
    uuid(table, knex);
    references(table, tables.USERS, true, 'user_id');
    references(table, tables.BOOKS, true, 'book_id');
    table.integer('start_page').defaultTo(0);
    table.integer('end_page').defaultTo(0);
    addDefaultColumns(table);
  });
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([tables.BOOKS, tables.READING_INTERVALS].reverse().map((table) => knex.schema.dropTable(table)));
}
