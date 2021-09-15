import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ConfirmDeleteValidator from "App/Validators/ConfirmDeleteValidator";

export default class PostsController {
  public async confirmDelete({ view, request }: HttpContextContract) {
    let errors;
    try {
      await request.validate(ConfirmDeleteValidator);
    } catch (e) {
      errors = e.messages;
    }

    return view.render("pages/admin/confirm-delete", {
      entity: request.param("entity"),
      id: request.param("id"),
      formAction: request.param("formAction"),
      redirect: request.param("redirect"),
      errors,
    });
  }
}
