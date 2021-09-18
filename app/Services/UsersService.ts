import User from "App/Models/User";

interface userSaveValues {
  id?: number | string;
  name: string;
  email: string;
  roles: string[];
  password: string;
  password_confirmation: string;
}

function prepareFormValues(entity?: User) {
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

async function save(values: userSaveValues) {
  const user = values.id ? await User.find(values.id) : new User();
  if (user) {
    user.name = values.name;
    user.email = values.email;
    user.roles = values.roles;
    if (values.password && values.password_confirmation) {
      user.password = values.password.trim();
    }
    await user.save();
    return user;
  }
}

export default {
  prepareFormValues,
  save,
};
