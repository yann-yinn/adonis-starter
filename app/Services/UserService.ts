import User from "App/Models/User";
import { RoleId } from "App/types";

interface createUserFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: RoleId;
}

interface updateUserFormValues {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role?: RoleId;
}

interface formValues {
  id?: number | string;
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
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
  await user.save();
}

function initFormValues(entity?: User): formValues {
  const formValues = {
    id: entity ? entity.id : "",
    name: entity ? entity.name : "",
    email: entity ? entity.email : "",
    password: "",
    password_confirmation: "",
    role: entity ? entity.roles[0] : "member",
  };
  return formValues;
}

export default { initFormValues, create, update };
