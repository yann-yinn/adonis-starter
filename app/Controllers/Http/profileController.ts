import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import roles from "Config/roles";
import UserService from "App/Services/UserService";

export default class profileController {
  private entityService = UserService;

  public async show({ view, request, bouncer }: HttpContextContract) {
    const entity = await User.findOrFail(request.param("id"));
    await bouncer.authorize("viewProfile", entity);
    return view.render("pages/profile", { entity, roles });
  }

  public async edit({ request, bouncer, view }: HttpContextContract) {
    const entity = await User.findOrFail(request.param("id"));
    await bouncer.authorize("editProfile", entity);
    const formValues = this.entityService.prepareFormValues(entity);
    return view.render("pages/profileEdit", {
      formValues,
      roles,
      formAction: "/admin/users?_method=PUT",
    });
  }

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
