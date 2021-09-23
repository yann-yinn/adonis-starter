import VerificationProcedure from "App/Models/VerificationProcedure";


interface verificationProcedurePayload {
  id:string,
  userId:string,
  type:string
}

async function create(payload: verificationProcedurePayload) {
  const verificationProcedure = new VerificationProcedure();
  verificationProcedure.id = payload.id;
  verificationProcedure.userId = payload.userId;
  verificationProcedure.type = payload.type;

  await verificationProcedure.save();
}

async function findById(id: string):Promise<VerificationProcedure> {
  return await VerificationProcedure.findOrFail(id)
}

export default {  create, findById };
