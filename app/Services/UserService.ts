import User from "App/Models/User";
import { RoleId } from "App/types";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import config from "Config/starter";
import VerificationProcedureService from "App/Services/VerificationProcedureService";
import { VerificationProcedureType } from "App/types";
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import { v4 as uuidv4 } from "uuid";
import starterConfig from "Config/starter";

interface createUserPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: RoleId;
  picture?: MultipartFileContract;
}

interface updateUserPayload {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role?: RoleId;
  picture?: MultipartFileContract;
}

interface formValues {
  id?: number | string;
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
  picture: string;
}

interface createOptions {
  sendEmail?: boolean;
}

async function create(payload: createUserPayload, options?: createOptions) {
  // default values for options
  if (!options) options = {};
  if (!options.sendEmail) {
    options.sendEmail = true;
  }

  const user = new User();
  user.email = payload.email;
  user.name = payload.name;
  user.emailVerified = false;
  user.blocked = config.signup.blockUserUntilEmailVerification ? true : false;

  // special case: first created user is automatically the super admin
  if ((await User.first()) === null) {
    user.roles = ["root"];
  } else {
    if (payload.role) {
      user.roles = [payload.role];
    } else {
      user.roles = ["member"];
    }
  }

  user.password = payload.password.trim();

  if (payload.picture) {
    await payload.picture.moveToDisk("./");
    user.picture = payload.picture.fileName;
  }
  const userSaved = await user.save();

  if (options?.sendEmail && starterConfig.signup.verifyEmail) {
    const verifyEmailId = uuidv4();
    VerificationProcedureService.create({
      id: verifyEmailId,
      userId: userSaved.id.toString(),
      type: VerificationProcedureType.SIGNUP_VERIFY_EMAIL,
    });
    const verifyUrl = Env.get("SITE_URL") + "/verify-email/" + verifyEmailId;
    await Mail.send((message) => {
      message
        .from(Env.get("EMAIL_FROM"))
        .to(userSaved.email)
        .subject(`[${Env.get("SITE_NAME")}]- Welcome Onboard ${userSaved.name}`)
        .htmlView("emails/welcome", {
          user: userSaved,
          verifyUrl,
          siteName: Env.get("SITE_NAME"),
        });
    });
  }

  return userSaved;
}

async function update(payload: updateUserPayload): Promise<User> {
  const user = await User.findOrFail(payload.id);
  if (payload.email) user.email = payload.email.trim();
  if (payload.name) user.name = payload.name.trim();
  if (payload.role) user.roles = [payload.role];
  if (payload.password && payload.password_confirmation) {
    user.password = payload.password.trim();
  }
  if (payload.picture) {
    await payload.picture.moveToDisk("./");
    user.picture = payload.picture.fileName;
  }
  const savedUser = await user.save();
  return savedUser;
}

// return values to populate the userForm
function initFormValues(entity?: User): formValues {
  const payload = {
    id: entity?.id ? entity.id : "",
    name: entity?.name ? entity.name : "",
    email: entity?.email ? entity.email : "",
    picture: entity?.picture ? entity.picture : "",
    password: "",
    password_confirmation: "",
    role: entity ? entity.roles[0] : "member",
  };
  return payload;
}

export default { initFormValues, create, update };
