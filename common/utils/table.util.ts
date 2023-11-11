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
