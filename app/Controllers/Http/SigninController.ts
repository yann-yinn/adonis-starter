import Session from "@ioc:Adonis/Addons/Session";
import Route from "@ioc:Adonis/Core/Route";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import starter from "Config/starter";

export default class SigninController {
  // signin page
  public async create({ view }: HttpContextContract) {
    return view.render("pages/signin");
  }
  // login form action
  public async store({ request, session, auth, response }: HttpContextContract) {
    await auth.attempt(request.input("email"), request.input("password"));
    if (starter.signup.blockUserUntilEmailVerification && auth.user && !auth.user.emailVerified) {
      const url = Route.makeUrl('send-email-verification');
      const message = `You must confirm your email, check your inbox. <a href="${url}">Click here to resend an email verification for your account</a>`;
      session.flash({notification: message});
      session.clear();
    }
    response.redirect("/");
  }
  //logout
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout();
    response.redirect("/");
  }
}
