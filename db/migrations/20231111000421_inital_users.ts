import { Knex } from 'knex';
import { tables } from '../../constants/tables.enum';
import { addDefaultColumns, uuid } from '../../common/utils/table.util';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable(tables.USERS, (table) => {
    uuid(table, knex);
    table.string('first_name', 120).notNullable();
    table.string('last_name', 120).notNullable();
    table.string('email', 255).index().unique();
    table.string('password', 125).notNullable();
    addDefaultColumns(table);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tables.USERS);
}
