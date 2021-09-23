import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SigninController {
  // signin page
  public async create({ view }: HttpContextContract) {
    return view.render("pages/signin");
  }
  // login form action
  public async store({ request, auth, response }: HttpContextContract) {
    await auth.attempt(request.input("email"), request.input("password"));
    response.redirect("/");
  }
  //logout
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout();
    response.redirect("/");
  }
}
