import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import UpdatePostValidator from "App/Validators/UpdatePostValidator";
import UsersService from "App/Services/UsersService";
import { createConfirmDeleteLink } from "App/Services/HelpersService";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class AdminPostsController {
  public usersPath = "/admin/users";
  /**
   * Liste des posts pour l'admin
   */
  public async index({ view, request }: HttpContextContract) {
    const page = request.input("page", 1);
    const limit = 5;
    const users = await Database.from("users").paginate(page, limit);
    users.baseUrl(this.usersPath);

    // add delete links and edit Links for each post.
    users.forEach((user) => {
      const deleteLink = createConfirmDeleteLink({
        entity: "User",
        id: user.id,
        title: `Étes vous sûr de vouloir supprimer "${user.title}" ?`,
        formAction: `${this.usersPath}/${user.id}/delete`,
        returnUrl: this.usersPath,
      });
      user._deleteLink = deleteLink;
      user._editLink = `${this.usersPath}/${user.id}/edit`;
    });

    return view.render("pages/admin/users", { users });
  }

  public async create({ view }: HttpContextContract) {
    const formValues = UsersService.prepareFormValues();
    return view.render("pages/admin/postForm", {
      formValues,
      formAction: this.usersPath,
    });
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    await UsersService.save(payload);
    session.flash({
      notification: "L'utilisateur a été crée",
    });
    response.redirect(this.usersPath);
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, request, response }: HttpContextContract) {
    const user = await User.find(request.param("id"));
    if (!user) {
      response.status(404);
      return;
    }
    if (user) {
      const formValues = UsersService.prepareFormValues(user);
      return view.render("pages/admin/userForm", {
        formValues,
        formAction: "/admin/users/" + user.id,
      });
    }
  }

  public async update({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(UpdatePostValidator);
    await UsersService.save(payload);
    session.flash({ notification: "Le billet de blog a été mis à jour" });
    response.redirect(this.usersPath);
  }

  public async delete({ request, response, session }: HttpContextContract) {
    const user = await User.find(request.param("id"));
    if (user) {
      user.delete();
      session.flash({ notification: "Le billet de blog a été supprimé" });
      response.redirect(this.usersPath);
    }
  }
}
