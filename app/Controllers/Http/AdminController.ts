import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ConfirmDeleteValidator from "App/Validators/ConfirmDeleteValidator";

export default class AdminController {
  public async confirmDelete({ view, request }: HttpContextContract) {
    let errors;
    try {
      await request.validate(ConfirmDeleteValidator);
    } catch (e) {
      errors = e.messages;
    }

    return view.render("pages/admin/confirm-delete", {
      ...request.qs(),
      errors,
    });
  }
}
