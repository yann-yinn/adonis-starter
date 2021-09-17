import User from "App/Models/User";

interface formValues {
  id?: number | string;
  email: string;
  name: string;
}

function prepareFormValues(entity?: User): formValues {
  const formValues = {
    id: entity ? entity.id : "",
    name: entity ? entity.name : "",
    email: entity ? entity.email : "",
  };
  return formValues;
}

async function save(values) {
  const user = values.id ? await User.find(values.id) : new User();
  if (user) {
    user.name = values.name;
    user.email = values.email;
    await user.save();
    return user;
  }
}

export default {
  prepareFormValues,
  save,
};
