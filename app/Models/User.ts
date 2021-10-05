import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import Drive from '@ioc:Adonis/Core/Drive';
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Post from "App/Models/Post";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number | string;

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;

  @column()
  // example: ['member', 'admin']
  public roles: string[];

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

  @beforeSave()
  public static async cleanupPictureStorage(user: User) {
    if (user.$dirty.picture && user.$original.picture) {
      await Drive.delete(user.$original.picture)
    }
  }
}
