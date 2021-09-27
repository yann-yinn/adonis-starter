import { ConfirmDeleteOptions } from "App/types";
import { RoleId } from "App/types";
import User from "App/Models/User";

export function createConfirmDeleteLink(params: ConfirmDeleteOptions) {
  let vars: string[] = [];
  for (const property in params) {
    vars.push(`${property}=${params[property]}`);
  }
  const url = `/admin/confirm-delete?${vars.join("&")}`;
  return url;
}

export function userHasRoles(roles: RoleId[], user: User) {
  for (const role of roles) {
    if (user.roles.includes(role)) {
      return true;
    }
  }
  return false;
}
