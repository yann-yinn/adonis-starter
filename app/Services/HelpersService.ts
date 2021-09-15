interface createConfirmDeleteLinkArguments {
  id: number;
  entity: string;
  formAction: string;
  redirect: string;
  title: string;
}

export function createConfirmDeleteLink(
  params: createConfirmDeleteLinkArguments
) {
  let vars: string[] = [];
  for (const property in params) {
    vars.push(`${property}=${params[property]}`);
  }
  const url = `/admin/confirm-delete?${vars.join("&")}`;
  return url;
}
