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
Route.get("login", "LoginController.create").middleware("guest");
Route.post("login", "LoginController.store").middleware("guest");
Route.get("logout", "LoginController.destroy").middleware("auth");

Route.get("admin/confirm-delete", "AdminController.confirmDelete").middleware(
  "auth"
);

// posts
Route.get("admin/posts", "PostsController.index").middleware("auth");
Route.get("admin/posts/create", "PostsController.create").middleware("auth");
Route.get("admin/posts/:id", "PostsController.show").middleware("auth");
Route.get("admin/posts/:id/edit", "PostsController.edit").middleware("auth");
Route.post("admin/posts", "PostsController.store").middleware("auth");
Route.post("admin/posts/:id", "PostsController.update").middleware("auth");
Route.post("admin/posts/:id/delete", "PostsController.delete").middleware(
  "auth"
);
//Route.resource("posts", "PostsController");
