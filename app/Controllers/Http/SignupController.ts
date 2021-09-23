import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import UserService from "App/Services/UserService";
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import User from "App/Models/User";

export default class SignupController {
  public async create({ view }: HttpContextContract) {
    return view.render("pages/signup");
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    const user = await UserService.create(payload);
    await Mail.send((message) => {
      message
        .from(Env.get("EMAIL_FROM"))
        .to(payload.email)
        .subject(`Welcome Onboard ${payload.name}`)
        .htmlView("emails/welcome", {
          user: payload,
          siteUrl: Env.get("SITE_URL"),
          siteName: Env.get("SITE_URL"),
        });
    });
    response.redirect(`/signup/check-email/${user.id}`);
  }

  public async checkEmail({ view, params }: HttpContextContract) {
    const user = await User.findOrFail(params.userId);
    return view.render("pages/check-email", {
      user,
    });
  }
}
