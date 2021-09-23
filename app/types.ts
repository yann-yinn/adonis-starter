export interface ConfirmDeleteOptions {
  title: string;
  id: number;
  formAction: string;
  returnUrl: string;
}

export type RoleId = "member" | "admin";

export interface Role {
  id: RoleId;
  label: string;
}

export enum VerificationProcedureType {
  PASSWORD_RENEWAL = "PASSWORD_RENEWAL",
  SIGNUP_VERIFY_EMAIL = "SIGNUP_VERIFY_EMAIL",
}
