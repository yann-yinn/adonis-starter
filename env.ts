/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from "@ioc:Adonis/Core/Env";

export default Env.rules({
  HOST: Env.schema.string({ format: "host" }),
  SITE_URL: Env.schema.string(),
  SITE_NAME: Env.schema.string(),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  CACHE_VIEWS: Env.schema.boolean(),
  SESSION_DRIVER: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(["local"] as const),
  NODE_ENV: Env.schema.enum(["development", "production", "testing"] as const),
  PG_HOST: Env.schema.string({ format: "host" }),
  PG_PORT: Env.schema.number(),
  PG_USER: Env.schema.string(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string(),
  EMAIL_FROM: Env.schema.string(),

  // MAILING
  SMTP_HOST: Env.schema.string({ format: "host" }),
  SMTP_PORT: Env.schema.number(),
  // SMTP_USERNAME: Env.schema.string(),
  // SMTP_PASSWORD: Env.schema.string(),

  // MAILING - AWS
  // SES_ACCESS_KEY: Env.schema.string(),
  // SES_ACCESS_SECRET: Env.schema.string(),
  //SES_REGION: Env.schema.string(),

  // MAILING - Mailgun
  // MAILGUN_API_KEY: Env.schema.string(),
  // MAILGUN_DOMAIN: Env.schema.string(),

  // MAILING - Sparkpost
  // SPARKPOST_API_KEY: Env.schema.string(),
});
