export default class AuthController {
  public async register({ request, auth, view }) {
    return view.render("register");
  }
  public async registerSubmit({ response }) {
    response.redirect().toPath("/");
  }

  public async login({ request, auth, view }) {
    /*
    const email = request.input("email");
    const password = request.input("password");

    await auth
      .use("web") // 👈 using sessions guard
      .attempt(email, password);
*/
    return view.render("register");
  }
}
