import { DateTime } from "luxon";
import {
  column,
  BaseModel,
} from "@ioc:Adonis/Lucid/Orm";

export default class PasswordRenewal extends BaseModel {
  @column({ isPrimary: true })
  public id: number | string;

  @column()
  public userId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
}
