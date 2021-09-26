import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import roles from "Config/roles";
const roleIds = roles.map((r) => r.id);

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 255;

function emailRules() {
  return [rules.maxLength(255), rules.minLength(5)];
}

function passwordRules() {
  return [
    rules.confirmed("password_confirmation"),
    rules.minLength(PASSWORD_MIN_LENGTH),
    rules.maxLength(PASSWORD_MAX_LENGTH),
  ];
}

function passwordConfirmationRules() {
  return [
    rules.minLength(PASSWORD_MIN_LENGTH),
    rules.maxLength(PASSWORD_MAX_LENGTH),
  ];
}

function pictureRules() {
  return {
    size: "5mb",
    extnames: ["jpg", "gif", "png", "webp", "jpeg"],
  };
}

function nameRules() {
  return [rules.maxLength(255), rules.minLength(3)];
}

function customMessages() {
  return {
    "email.required": "Email field is required",
    "email.unique": "An account with this email already exists",
    "password.required": "Password field is required",
    "password.minLength": "Password must be at least 6 characters long",
    "password_confirmation.required": "This field is required",
    "password_confirmation.confirmed":
      "Password and confirm password does not match.",
    "role.array": `Role must be one of the following value : ${roleIds.join(
      ","
    )}`,
  };
}

export class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, nameRules()),
    email: schema.string({ trim: true }, [
      ...emailRules(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, passwordRules()),
    password_confirmation: schema.string(
      { trim: true },
      passwordConfirmationRules()
    ),
    picture: schema.file.optional(pictureRules()),
  });

  public messages = customMessages();
}

export class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string(),
    email: schema.string({ trim: true }),
    name: schema.string({ trim: true }, nameRules()),
    password: schema.string.optional({ trim: true }, passwordRules()),
    password_confirmation: schema.string.optional(
      { trim: true },
      passwordConfirmationRules()
    ),
    role: schema.enum(roleIds),
    picture: schema.file.optional(pictureRules()),
  });

  public messages = customMessages();
}

export class CreateAdminUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, nameRules()),
    email: schema.string({ trim: true }, emailRules()),
    password: schema.string({ trim: true }, passwordRules()),
    password_confirmation: schema.string(
      { trim: true },
      passwordConfirmationRules()
    ),
    role: schema.enum(roleIds),
    picture: schema.file.optional(pictureRules()),
  });

  public messages = customMessages();
}

export class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string(),
    email: schema.string({ trim: true }, emailRules()),
    name: schema.string({ trim: true }, nameRules()),
    password: schema.string.optional({ trim: true }, passwordRules()),
    password_confirmation: schema.string.optional(
      { trim: true },
      passwordConfirmationRules()
    ),
    picture: schema.file.optional(pictureRules()),
    // do NOT put role here, we don't want a user to be able
    // to change its own role with a POST request.
  });

  public messages = customMessages();
}

export class ForgotPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({ trim: true }, passwordRules()),
    password_confirmation: schema.string(
      { trim: true },
      passwordConfirmationRules()
    ),
  });

  public messages = customMessages();
}
