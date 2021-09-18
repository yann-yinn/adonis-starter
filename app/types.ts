export interface ConfirmDeleteOptions {
  title: string;
  id: number;
  formAction: string;
  returnUrl: string;
}

export enum Role {
  MEMBER = "member",
  ADMINISTRATOR = "administrator",
}

export interface Roles {
  id: string;
  label: string;
}
