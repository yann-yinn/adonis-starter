import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class AuthController {
  public async register({ view }) {
    return view.render("register");
  }

  public async store({ request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CreateUserValidator);
      console.log("validatedData", validatedData);
    } catch (e) {
      console.log("e", e);
    }

    return "hello";
  }
}
