import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import UserService from "App/Services/UserService";
import VerificationProcedureService from "App/Services/VerificationProcedureService";
import { VerificationProcedureType } from "App/types";
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import { v4 as uuidv4 } from "uuid";
import User from "App/Models/User";

export default class SignupController {
  public async signupForm({ view }: HttpContextContract) {
    return view.render("pages/signup");
  }

  public async submitSignupForm({
    request,
    response,
    session,
  }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    const user = await UserService.create(payload);
    session.put("tmpUser", user);

    const verifyEmailId = uuidv4();
    VerificationProcedureService.create({
      id: verifyEmailId,
      userId: user.id.toString(),
      type: VerificationProcedureType.SIGNUP_VERIFY_EMAIL,
    });
    const verifyUrl = Env.get("SITE_URL") + "/verify-email/" + verifyEmailId;
    await Mail.send((message) => {
      message
        .from(Env.get("EMAIL_FROM"))
        .to(payload.email)
        .subject(`[${Env.get("SITE_NAME")}]- Welcome Onboard ${payload.name}`)
        .htmlView("emails/welcome", {
          user: payload,
          verifyUrl,
          siteName: Env.get("SITE_URL"),
        });
    });

    response.redirect(`/signup/check-your-inbox`);
  }

  public async checkYourInbox({ view, session }: HttpContextContract) {
    return view.render("pages/SignUpCheckYourInbox", {
      user: session.get("tmpUser"),
    });
  }

  public async verifyEmail({ view, params }: HttpContextContract) {
    const verificationProcedure = await VerificationProcedureService.findById(
      params.id
    );
    const user = await User.findOrFail(verificationProcedure.userId);
    user.blocked = false;
    user.emailVerified = true;
    await user.save();

    await verificationProcedure.delete();
    return view.render("pages/verifyEmail", {});
  }
}
