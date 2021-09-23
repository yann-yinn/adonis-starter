import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import UserService from "App/Services/UserService";
// import Mail from "@ioc:Adonis/Addons/Mail";
// import Env from "@ioc:Adonis/Core/Env";

export default class SignupController {
  public async create({ view }: HttpContextContract) {
    return view.render("pages/signup");
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    const user = await UserService.create(payload);
    session.put("tmpUser", user);
    /*
    await Mail.send((message) => {
      message
        .from(Env.get("EMAIL_FROM"))
        .to(payload.email)
        .subject(`Welcome Onboard ${payload.name}`)
        .htmlView("emails/welcome", {
          user: payload,
          verifyEmailLink: Env.get("SITE_URL"),
          siteName: Env.get("SITE_URL"),
        });
    });
    response.redirect(`/signup/check-email`);
    */
    session.flash({
      notification: "Your account has been created, you can log in now.",
    });
    response.redirect("/");
  }

  public async checkEmail({ view, session }: HttpContextContract) {
    return view.render("pages/check-email", {
      user: session.get("tmpUser"),
    });
  }
}
