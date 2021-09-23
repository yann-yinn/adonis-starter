import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuidv4 } from "uuid";
import UserService from "App/Services/UserService";
import VerificationProcedureService from "App/Services/VerificationProcedureService";
import { VerificationProcedureType } from "App/types";
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";

export default class ForgotPasswordController {
  public async showEmailForm({ view }: HttpContextContract) {
    return view.render("pages/forgotPassword");
  }

  // submit email form
  public async submitEmailForm({
    request,
    response,
    session,
  }: HttpContextContract) {
    const renewalId = uuidv4();
    const user = await UserService.findByEmail(request.input("email"));
    session.put("tmpUser", user);
    VerificationProcedureService.create({
      id: renewalId,
      userId: user.id.toString(),
      type: VerificationProcedureType.PASSWORD_RENEWAL.toString(),
    });

    const verifyUrl = `${Env.get("SITE_URL")}/forgot-password/${renewalId}`;
    await Mail.send((message) => {
      message
        .from(Env.get("EMAIL_FROM"))
        .to(user.email)
        .subject(`[${Env.get("SITE_NAME")}]- Reset your password`)
        .htmlView("emails/reset-password", {
          user,
          verifyUrl,
          siteName: Env.get("SITE_URL"),
        });
    });
    response.redirect("/forgot-password/check-your-inbox");
  }

  public async showCheckYourInbox({ view, session }: HttpContextContract) {
    return view.render("pages/forgotPasswordCheckYourInbox", {
      user: session.get("tmpUser"),
    });
  }

  public async showResetPasswordForm({ view, request }: HttpContextContract) {
    return view.render("pages/resetPassword", {
      renewalId: request.ctx?.params.id,
    });
  }

  public async submitResetPasswordForm({
    request,
    response,
    session,
  }: HttpContextContract) {
    const passwordRenewal = await VerificationProcedureService.findById(
      request.ctx?.params.id
    );
    UserService.update({
      id: passwordRenewal.userId,
      password: request.input("password"),
      password_confirmation: request.input("password"),
    });
    passwordRenewal.delete();
    session.flash({
      notification: "Your password has been updated.",
    });
    response.redirect("/");
  }
}
