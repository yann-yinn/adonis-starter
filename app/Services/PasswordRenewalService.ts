import PasswordRenewal from "App/Models/PasswordRenewal";


interface passwordRenewalPayload {
  id:string,
  userId:string
}

async function create(payload: passwordRenewalPayload) {
  const passwordRenewal = new PasswordRenewal();
  passwordRenewal.id = payload.id;
  passwordRenewal.userId = payload.userId;

  await passwordRenewal.save();
}

async function findById(id: string):Promise<PasswordRenewal > {
  return await PasswordRenewal.findOrFail(id)
}

export default {  create, findById };
