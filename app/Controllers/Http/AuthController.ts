import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
  public async register({ view }) {
    return view.render("register");
  }

  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({}, [rules.minLength(1)]),
      name: schema.string({ trim: true }, [rules.minLength(1)]),
      password: schema.string(),
      password_confirmation: schema.string(),
    });
    console.log("submit");

    const validatedData = await request.validate({
      schema: validationSchema,
    });

    return validatedData;
  }
}
