import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.minLength(3),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [
      rules.confirmed("password_confirmation"),
      rules.minLength(6),
      rules.maxLength(255),
    ]),
    password_confirmation: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(255),
    ]),
    role: schema.string.optional({}, []),
    picture: schema.file({
      size: "5mb",
      extnames: ["jpg", "gif", "png", "webp", "jpeg"],
    }),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    "email.required": "Le champ email est requis",
    "email.unique": "Un compte avec cette adresse email existe déjà",
    "password.required": "Le champ password est requis",
    "password_confirmation.required": "ce champ est requis",
    "password_confirmation.confirmed":
      "Les deux mots de passe ne sont pas identiques",
  };
}
