import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  beforeCreate,
} from "@ioc:Adonis/Lucid/Orm";
import Post from "App/Models/Post";
import { RoleId } from "App/types";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number | string;

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;

  @column()
  public roles: RoleId[];

  @column()
  public email: string;

  @column()
  public name: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public picture?: string;

  @column()
  public emailVerified: boolean;

  @column()
  public blocked: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @beforeCreate()
  public static async saveFirstUserAsRoot(user: User) {
    // special case: first created user in the database is automatically root
    if ((await User.first()) === null) {
      user.roles = ["root"];
    }
  }

  @beforeSave()
  public static async onlyOneRootUser(user: User) {
    // security: do not allow to create several root users, for now.
    const rootUser = await User.findBy("roles", ["root"]);
    if (user.roles.includes("root") && rootUser) {
      throw new Error(
        "Security: a root user already exists. Abort saving operation."
      );
    }
  }
}
