import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.table(this.tableName, (table) => {
      // Create new column with table.<type>(<name>)
      table.string("name");
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      // Create new column with table.<type>(<name>)
      table.dropColumn("name");
    });
  }
}
