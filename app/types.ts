export interface ConfirmDeleteOptions {
  title: string;
  id: number;
  formAction: string;
  returnUrl: string;
}

export enum HTTP_METHODS {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
