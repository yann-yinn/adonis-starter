import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import roles from "Config/roles";
import UserService from "App/Services/UserService";
import { UpdateProfileValidator } from "App/Validators/UserValidators";

export default class profileController {
  private entityService = UserService;
  private entityUpdateValidator = UpdateProfileValidator;
  private entityModel = User;
  private entityUpdateNotification = () => "Your profile has been updated";

  public async show({ view, request, bouncer }: HttpContextContract) {
    const entity = await User.findOrFail(request.param("id"));
    await bouncer.authorize("viewProfile", entity);
    return view.render("pages/profile", { entity, roles });
  }

  public async edit({ request, bouncer, view }: HttpContextContract) {
    const entity = await this.entityModel.findOrFail(request.param("id"));
    await bouncer.authorize("editProfile", entity);
    const formValues = this.entityService.initFormValues(entity);
    return view.render("pages/profileEdit", {
      hideFieldRole: true,
      formValues,
      formAction: "/profile/update?_method=PUT",
    });
  }

  public async update({
    request,
    session,
    response,
    bouncer,
  }: HttpContextContract) {
    const validatedData = await request.validate(this.entityUpdateValidator);
    const user = await this.entityModel.findOrFail(validatedData.id);
    await bouncer.authorize("editProfile", user);
    await this.entityService.update(validatedData);
    session.flash({ notification: this.entityUpdateNotification() });
    response.redirect("/profile/" + validatedData.id);
  }

  public async destroy({}: HttpContextContract) {}
}
