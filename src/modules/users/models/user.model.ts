import { Model, QueryContext } from 'objection';
import bcrypt from 'bcrypt';
import { tables } from '@constants/tables.enum';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require('../schemas/user.schema.json');

export class User extends Model {
  public id: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public password: string;

  public created_at: Date | null;
  public updated_at: Date | null;

  public static get tableName(): string {
    return tables.USERS;
  }

  public static get schema() {
    return schema;
  }

  public async correctPassword(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  public async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.password = await bcrypt.hash(this.password, 12);
  }

  public toJson() {
    return {
      id: this.id,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
    };
  }
}
