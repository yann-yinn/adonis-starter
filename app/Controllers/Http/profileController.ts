import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AdminUsersController {
  public async show({ view, request }: HttpContextContract) {
    const entity = await User.findOrFail(request.param("id"));
    return view.render("pages/profile", { entity });
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  /*
  private prepareFormValues(entity?: User) {
    const formValues = {
      id: entity ? entity.id : "",
      name: entity ? entity.name : "",
      email: entity ? entity.email : "",
      password: "",
      password_confirmation: "",
      role: entity ? entity.roles[0] : "member",
    };
    return formValues;
  }*/
}
