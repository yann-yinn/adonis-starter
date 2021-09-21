import User from "App/Models/User";

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
export default { prepareFormValues };
