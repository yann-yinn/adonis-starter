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

export default { create };
