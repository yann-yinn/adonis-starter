import VerificationProcedure from "App/Models/VerificationProcedure";

interface verificationProcedurePayload {
  id: string;
  userId: string;
  type: string;
}

function create(payload: verificationProcedurePayload) {
  const verificationProcedure = new VerificationProcedure();
  verificationProcedure.id = payload.id;
  verificationProcedure.userId = payload.userId;
  verificationProcedure.type = payload.type;
  return verificationProcedure.save();
}

function findById(id: string): Promise<VerificationProcedure> {
  return VerificationProcedure.findOrFail(id);
}

export default { create, findById };
