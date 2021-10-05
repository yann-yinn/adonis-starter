import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuidv4 } from "uuid";
import UserService from "App/Services/UserService";
import VerificationProcedureService from "App/Services/VerificationProcedureService";
import { VerificationProcedureType } from "App/types";
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import User from "App/Models/User";
import { ForgotPasswordValidator } from "App/Validators/UserValidators";

export default class SendEmailVerificationController {
  public async emailForm({ view }: HttpContextContract) {
    return view.render("pages/forgotPassword");
  }

  public async submitEmailForm({
    request,
    response,
    session,
  }: HttpContextContract) {
    const renewalId = uuidv4();

    const user = await User.findBy("email", request.input("email"));
    if (!user) {
      session.flash({
        error: "Sorry, we found no user found with this email.",
      });
      return response.redirect("/forgot-password");
    }
    session.put("tmpUser", user);
    VerificationProcedureService.create({
      id: renewalId,
      userId: user.id.toString(),
      type: VerificationProcedureType.PASSWORD_RENEWAL,
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

  public async checkYourInbox({ view, session }: HttpContextContract) {
    return view.render("pages/forgotPasswordCheckYourInbox", {
      user: session.get("tmpUser"),
    });
  }

  public async resetPasswordForm({ view, request }: HttpContextContract) {
    return view.render("pages/resetPassword", {
      renewalId: request.ctx?.params.id,
    });
  }

  public async submitResetPasswordForm({
    request,
    response,
    session,
  }: HttpContextContract) {
    const payload = await request.validate(ForgotPasswordValidator);
    const passwordRenewal = await VerificationProcedureService.findById(
      request.ctx?.params.id
    );
    UserService.update({
      id: passwordRenewal.userId,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
    });
    await passwordRenewal.delete();
    session.flash({
      notification: "Your password has been updated.",
    });
    response.redirect("/");
  }
}
