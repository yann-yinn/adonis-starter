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
