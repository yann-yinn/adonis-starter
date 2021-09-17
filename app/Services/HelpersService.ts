import { ConfirmDeleteOptions } from "App/types";

export function createConfirmDeleteLink(params: ConfirmDeleteOptions) {
  let vars: string[] = [];
  for (const property in params) {
    vars.push(`${property}=${params[property]}`);
  }
  const url = `/admin/confirm-delete?${vars.join("&")}`;
  return url;
}
