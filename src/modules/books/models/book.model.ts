import { tables } from '@constants/tables.enum';
import { Model } from 'objection';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require('../schemas/book.schema.json');

export class Book extends Model {
  public id: string;
  public title: string;
  public num_of_pages: number;
  public created_at: Date;
  public updated_at: Date;

  public static get tableName(): string {
    return tables.BOOKS;
  }

  public static get schema() {
    return schema;
  }
}
