import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuidv4 } from "uuid";
import UserService from "App/Services/UserService";
import VerificationProcedureService from "App/Services/VerificationProcedureService";
import { VerificationProcedureType } from "App/Enums/VerificationProcedureType";

export default class ForgotPasswordController {
  public async render({ view }: HttpContextContract) {
    return view.render("pages/forgotPassword");
  }

  public async send({ request, response }: HttpContextContract) {
    const renewalId = uuidv4();
    const user = await UserService.findByEmail(request.input("email"));
    VerificationProcedureService.create({
      id: renewalId,
      userId: user.id.toString(),
      type: VerificationProcedureType.PASSWORD_RENEWAL.toString(),
    });
    console.log(
      `Fake sending email to ${request.input(
        "email"
      )} with link /forgot-password/${renewalId}`
    );
    response.redirect("/");
  }

  public async renderWithId({ view, request }: HttpContextContract) {
    return view.render("pages/resetPassword", {
      renewalId: request.ctx?.params.id,
    });
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const passwordRenewal = await VerificationProcedureService.findById(
      request.ctx?.params.id
    );
    UserService.update({
      id: passwordRenewal.userId,
      password: request.input("password"),
      password_confirmation: request.input("password"),
    });
    passwordRenewal.delete();
    response.redirect("/");
  }
}
