import User from "App/Models/User";
import { RoleId } from "App/types";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";

interface createUserPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: RoleId;
  picture: MultipartFileContract;
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

async function create(payload: createUserPayload) {
  const user = new User();
  user.email = payload.email;
  user.name = payload.name;
  user.roles = payload.role ? [payload.role] : ["member"];
  user.password = payload.password.trim();
  if (payload.picture) {
    await payload.picture.moveToDisk("./");
    user.picture = payload.picture.fileName;
  }
  await user.save();
}

async function update(payload: updateUserPayload) {
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
  await user.save();
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
