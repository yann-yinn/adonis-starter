import User from "App/Models/User";

interface formValues {
  id?: number | string;
  email: string;
  name: string;
  password: string;
}

function prepareFormValues(entity?: User): formValues {
  const formValues = {
    id: entity ? entity.id : "",
    name: entity ? entity.name : "",
    email: entity ? entity.email : "",
    password: "",
    password_confirmation: "",
  };
  return formValues;
}

async function save(values) {
  const user = values.id ? await User.find(values.id) : new User();
  if (user) {
    user.name = values.name;
    user.email = values.email;
    if (values.password.trim()) {
      user.password = values.password;
    }
    await user.save();
    return user;
  }
}

export default {
  prepareFormValues,
  save,
};
