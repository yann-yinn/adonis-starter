import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LoginController {
  public async create({ view }: HttpContextContract) {
    return view.render("pages/login");
  }

  public async store({ request, auth, response }: HttpContextContract) {
    await auth.attempt(request.input("email"), request.input("password"));
    response.redirect("/");
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout();
    response.redirect("/");
  }
}
