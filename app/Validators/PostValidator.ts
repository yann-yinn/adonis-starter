import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

function customMessages() {
  return {
    "title.required": "Title field is required",
  };
}

export class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }),
    content: schema.string.optional(),
  });

  public messages = customMessages();
}

export class UpdatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string(),
    title: schema.string({ trim: true }),
    content: schema.string.optional(),
  });

  public messages = customMessages();
}
