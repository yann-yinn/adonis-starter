import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validator, schema } from "@ioc:Adonis/Core/Validator";
import { passwordRules } from "App/Validators/UserValidators";

export default class PasswordController {
  public async strength({ params }: HttpContextContract) {
    const password = decodeURIComponent(params.password);
    try {
      await validator.validate({
        schema: schema.create({
          password: schema.string({ trim: true }, passwordRules(false)),
        }),
        data: {
          password,
        },
      });
    } catch (error) {
      return { success: false, errors: error.messages.password };
    }
    return { success: true, errors: [] };
  }
  public async test({ view }: HttpContextContract) {
    return view.render("pages/passwordTest");
  }
}
