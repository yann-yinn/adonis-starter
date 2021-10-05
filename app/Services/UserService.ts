import User from "App/Models/User";
import { RoleId } from "App/types";
import roles from "Config/roles";
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
  blocked?: boolean;
  picture?: MultipartFileContract;
}

interface updateUserPayload {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role?: RoleId;
  blocked?: boolean;
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

  // set users roles
  // special case: first create user is automatically the root user.
  if ((await User.first()) === null) {
    user.roles = ["root"];
  } else if (payload.role) {
    user.roles = [payload.role];
  } else {
    // defaut role is member, if no role has been provided.
    user.roles = ["member"];
  }

  user.password = payload.password.trim();

  if (payload.picture) {
    await payload.picture.moveToDisk("./");
    user.picture = payload.picture.fileName;
  }
  const userSaved = await user.save();

  await sendEmailVerification(userSaved, options);

  return userSaved;
}

async function sendEmailVerification(user: User, options?: createOptions) {
  if (!options) options = {};
  if (!options.sendEmail) {
    options.sendEmail = true;
  }

  if (options?.sendEmail && starterConfig.signup.verifyEmail) {
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
        .to(user.email)
        .subject(`[${Env.get("SITE_NAME")}]- Welcome Onboard ${user.name}`)
        .htmlView("emails/welcome", {
          user: user,
          verifyUrl,
          siteName: Env.get("SITE_NAME"),
        });
    });
  }
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
  user.blocked = payload.blocked?true:false;
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
    blocked: entity?.blocked ? entity.blocked : false
  };
  return payload;
}

function allRolesExceptRoot() {
  return roles.filter((r) => r.id !== "root");
}

export default { initFormValues, create, update, allRolesExceptRoot, sendEmailVerification };
