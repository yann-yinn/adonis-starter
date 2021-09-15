import User from "App/Models/User";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class SignupController {
  public async create({ view }: HttpContextContract) {
    return view.render("pages/signup");
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    const user = new User();
    user.email = payload.email;
    user.password = payload.password;
    user.name = payload.name;
    await user.save();
    session.flash({
      notification:
        "Votre compte a été crée. Vous pouvez vous connecter désormais.",
    });
    response.redirect("/");
  }
}
