/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("pages/home");
});

Route.resource("users", "UsersController");
Route.get("signup", "SignupController.create");
Route.post("signup", "SignupController.store");
Route.get("login", "SessionController.create").middleware("guest");
Route.post("login", "SessionController.store").middleware("guest");
Route.get("logout", "SessionController.destroy").middleware("auth");

// route générique pour confirmer la suppression d'une entité
Route.get("admin/confirm-delete", "AdminController.confirmDelete").middleware(
  "auth"
);

// administration des posts
Route.get("admin/posts", "AdminPostsController.index").middleware("auth");
Route.get("admin/posts/create", "AdminPostsController.create").middleware(
  "auth"
);
Route.get("admin/posts/:id", "AdminPostsController.show").middleware("auth");
Route.get("admin/posts/:id/edit", "AdminPostsController.edit").middleware(
  "auth"
);
Route.post("admin/posts", "AdminPostsController.store").middleware("auth");
Route.post("admin/posts/:id", "AdminPostsController.update").middleware("auth");
Route.post("admin/posts/:id/delete", "AdminPostsController.delete").middleware(
  "auth"
);

// administration des utilisateurs
Route.resource("/admin/users", "AdminUsersController").middleware({
  "*": "auth",
});
/*
Route.get("admin/users", "AdminUsersController.index").middleware("auth");
Route.get("admin/users/:id/edit", "AdminUsersController.edit").middleware(
  "auth"
);
Route.get("admin/users/create", "AdminUsersController.create").middleware(
  "auth"
);
Route.post("admin/users", "AdminUsersController.store").middleware("auth");
Route.post("admin/users/:id", "AdminUsersController.update").middleware("auth");
Route.post("admin/users/:id/delete", "AdminUsersController.delete").middleware(
  "auth"
);*/
