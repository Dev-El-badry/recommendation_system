import { Knex } from 'knex';

export const addDefaultColumns = (table: Knex.CreateTableBuilder, softDelete: boolean = false) => {
  table.timestamps(false, true);
  if (softDelete) table.dateTime('deleted_at');
};

export const uuid = (table: Knex.CreateTableBuilder, knex: Knex, columnName: string = 'id') => {
  const definition = table.uuid(columnName).defaultTo(knex.raw('uuid_generate_v4()'));
  if (columnName === 'id') definition.primary();
  return definition;
};

export const references = (
  table: Knex.TableBuilder,
  tableName: string,
  notNullable: boolean = true,
  columnName: string,
  action: 'cascade' | 'set null' = 'cascade',
) => {
  const definition = table
    .uuid(`${columnName || tableName + '_id'}`)
    .references('id')
    .inTable(tableName)
    .onDelete(action);

  if (notNullable) {
    definition.notNullable();
  }

  return definition;
};
