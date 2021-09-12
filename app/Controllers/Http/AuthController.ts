import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class AuthController {
  public async register({ view }) {
    return view.render("register");
  }

  public async store({ request }: HttpContextContract) {
    const validatedData = await request.validate(CreateUserValidator);
    return validatedData;
  }
}
