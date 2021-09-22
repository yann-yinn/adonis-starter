import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersSchema extends BaseSchema {
  protected tableName = "password_renewals";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id", 255).primary();
      table.string("user_id", 255).notNullable();
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
