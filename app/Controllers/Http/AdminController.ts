import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ConfirmDeleteValidator from "App/Validators/ConfirmDeleteValidator";

export default class PostsController {
  public confirmDelete({ view, request }: HttpContextContract) {
    const payload = request.validate(ConfirmDeleteValidator);
    console.log(payload);
    return view.render("pages/admin/confirm-delete", {
      entity: request.param("entity"),
      id: request.param("id"),
      formAction: request.param("formAction"),
      redirect: request.param("redirect"),
    });
  }
}
