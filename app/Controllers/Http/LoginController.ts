import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LoginController {
  /**
   * Show form to login
   */
  public async create({ view }: HttpContextContract) {
    return view.render("pages/login");
  }

  /**
   * Handle login form submissions
   */
  public async store({ request, auth, response }: HttpContextContract) {
    /**
     * Attempt to login the user with the email and password. The
     * "auth.attempt" method will perform all the required
     * validations.
     */
    try {
      await auth.attempt(request.input("email"), request.input("password"));
    } catch (error) {
      console.log("error", error);
    }

    /**
     * Redirect to the home page
     */
    response.redirect("/");
  }

  /**
   * Destroy user session (aka logout)
   */
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout();
    response.redirect("/");
  }
}
