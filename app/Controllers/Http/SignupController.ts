import User from "App/Models/User";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
// import Mail from "@ioc:Adonis/Addons/Mail";

/**
 * Controller to handle user signup requests. We keep it simple
 * for now and do not do email verification
 */
export default class SignupController {
  /**
   * Show form to signup
   */
  public async create({ view }: HttpContextContract) {
    return view.render("pages/signup");
  }

  /**
   * Handle signup form submissions
   */
  public async store({
    request,
    response,
    auth,
    session,
  }: HttpContextContract) {
    /**
     * Validate new user account creation form
     */
    const payload = await request.validate(CreateUserValidator);

    /**
     * Create a new user
     */
    const user = new User();
    user.email = payload.email;
    user.password = payload.email;
    user.name = payload.name;
    await user.save();
    session.flash({ notification: "User created successfully" });
    /*
    await Mail.send((message) => {
      message
        .from("yann.boisselier@gmail.com")
        .to(user.email)
        .subject("Welcome Onboard!")
        .htmlView("emails/welcome", { name: user.email });
    });
    */

    /**
     * Login the user
     */
    await auth.login(user);

    /**
     * Redirect to the home page
     */
    response.redirect("/");
  }
}
