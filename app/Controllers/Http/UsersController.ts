import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import LoginUserValidator from "App/Validators/LoginUserValidator";

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all();
    return users;
  }

  public async create({ view }: HttpContextContract) {
    return view.render("register");
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    const user = new User();
    user.email = payload.email;
    user.password = payload.email;
    await user.save();
    return "hello";
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async login({ view }: HttpContextContract) {
    return view.render("login");
  }

  public async loginSubmit({ request, auth, response }: HttpContextContract) {
    const payload = await request.validate(LoginUserValidator);
    const email = payload.email;
    const password = payload.password;
    console.log("payload", payload);

    await auth.use("web").attempt(email, password);
    response.redirect("/");
  }
}
