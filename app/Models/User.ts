import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import Drive from "@ioc:Adonis/Core/Drive";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
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

  // hash password before persisting in database
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @beforeSave()
  public static async cleanupPictureStorage(user: User) {
    if (user.$dirty.picture && user.$original.picture) {
      await Drive.delete(user.$original.picture);
    }
  }

  @beforeSave()
  public static async preventMultipleRootUsers(user: User) {
    const rootUser = await User.findBy("roles", ["root"]);
    if (rootUser && user.roles.includes("root") && user.id !== rootUser.id) {
      throw new Error("Only one root user is allowed. Abort saving");
    }
  }
}
