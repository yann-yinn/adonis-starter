import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SessionController {
  // page de login
  public async create({ view }: HttpContextContract) {
    return view.render("pages/login");
  }
  // page de soumission du formulaire de login
  public async store({ request, auth, response }: HttpContextContract) {
    await auth.attempt(request.input("email"), request.input("password"));
    response.redirect("/");
  }
  // page de logout
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout();
    response.redirect("/");
  }
}
