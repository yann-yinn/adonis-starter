import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import UserService from "App/Services/UserService";

export default class SignupController {
  public async create({ view }: HttpContextContract) {
    return view.render("pages/signup");
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    UserService.create(payload);
    session.flash({
      notification: "Votre compte a été crée. Vous pouvez vous connecter.",
    });
    response.redirect("/");
  }
}
