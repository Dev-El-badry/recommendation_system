import { tables } from '@constants/tables.enum';
import { Model } from 'objection';
import { Book } from './book.model';
import { User } from '@module/auth/models/user.model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require('../schemas/reading-intervals.schema.json');

export class ReadingInterval extends Model {
  public id: string;
  public user_id: string;
  public book_id: string;
  public start_page: number;
  public end_page: number;
  public created_at: Date;
  public updated_at: Date;

  public static get tableName(): string {
    return tables.READING_INTERVALS;
  }

  public static get schema() {
    return schema;
  }

  public static get relationMappings() {
    return {
      book: {
        relation: Model.HasOneRelation,
        modelClass: Book,
        join: {
          from: `${tables.READING_INTERVALS}.book_id`,
          to: `${tables.BOOKS}.id`,
        },
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${tables.READING_INTERVALS}.user_id`,
          to: `${tables.USERS}.id`,
        },
      },
    };
  }
}
