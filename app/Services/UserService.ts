import User from "App/Models/User";
import { RoleId } from "App/types";
import Application from "@ioc:Adonis/Core/Application";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";

interface createUserFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: RoleId;
  picture: MultipartFileContract;
}

interface updateUserFormValues {
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

async function create(formValues: createUserFormValues) {
  const user = new User();
  user.email = formValues.email;
  user.password = formValues.password;
  user.name = formValues.name;
  user.roles = ["member"];
  await user.save();
}

async function update(formValues: updateUserFormValues) {
  const user = await User.findOrFail(formValues.id);
  if (formValues.email) user.email = formValues.email.trim();
  if (formValues.name) user.name = formValues.name.trim();
  if (formValues.role) user.roles = [formValues.role];
  if (formValues.password && formValues.password_confirmation) {
    user.password = formValues.password.trim();
  }
  if (formValues.picture) {
    await formValues.picture.moveToDisk(`./user-${user.id}`);
  }
  await user.save();
}

function initFormValues(entity?: User): formValues {
  const formValues = {
    id: entity?.id ? entity.id : "",
    name: entity?.name ? entity.name : "",
    email: entity?.email ? entity.email : "",
    picture: entity?.picture ? entity.picture : "",
    password: "",
    password_confirmation: "",
    role: entity ? entity.roles[0] : "member",
  };
  return formValues;
}

export default { initFormValues, create, update };
