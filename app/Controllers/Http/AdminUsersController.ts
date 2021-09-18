import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import UpdatePostValidator from "App/Validators/UpdatePostValidator";
import UsersService from "App/Services/UsersService";
import { createConfirmDeleteLink } from "App/Services/HelpersService";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class AdminUsersController {
  // controller config
  private entityTable = "users";
  private entityModel = User;
  private entityService = UsersService;
  private entityListPath = "/admin/users";
  private entityIndexView = "pages/admin/users";
  private entityFormView = "pages/admin/postForm";
  private entityFormAction = (entity) => {
    "/admin/users/" + entity.id;
  };
  private entityCreationNotification = () => "L'utilisateur a été crée";
  private entityUpdateNotification = () => "L'utilisateur a été crée";
  private entityDeleteNotification = () => "L'utilisateur a été supprimé";

  /**
   * Liste des posts pour l'admin
   */
  public async index({ view, request }: HttpContextContract) {
    const page = request.input("page", 1);
    const limit = 5;
    const entities = await Database.from(this.entityTable).paginate(
      page,
      limit
    );
    entities.baseUrl(this.entityListPath);

    // add delete links and edit Links for each post.
    entities.forEach((entity) => {
      const deleteLink = createConfirmDeleteLink({
        id: entity.id,
        title: `Étes vous sûr de vouloir supprimer "${entity.title}" ?`,
        formAction: `${this.entityListPath}/${entity.id}/delete`,
        returnUrl: this.entityListPath,
      });
      entity._deleteLink = deleteLink;
      entity._editLink = `${this.entityListPath}/${entity.id}/edit`;
    });

    return view.render(this.entityIndexView, { entities });
  }

  public async create({ view }: HttpContextContract) {
    const formValues = this.entityService.prepareFormValues();
    return view.render(this.entityFormView, {
      formValues,
      formAction: this.entityListPath,
    });
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    await this.entityService.save(payload);
    session.flash({
      notification: this.entityCreationNotification(),
    });
    response.redirect(this.entityListPath);
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, request, response }: HttpContextContract) {
    const entity = await this.entityModel.find(request.param("id"));
    if (!entity) {
      response.status(404);
      return;
    }
    if (entity) {
      const formValues = this.entityService.prepareFormValues(entity);
      return view.render(this.entityFormView, {
        formValues,
        formAction: this.entityFormAction(entity),
      });
    }
  }

  public async update({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(UpdatePostValidator);
    await this.entityService.save(payload);
    session.flash({ notification: this.entityUpdateNotification() });
    response.redirect(this.entityListPath);
  }

  public async delete({ request, response, session }: HttpContextContract) {
    const user = await this.entityModel.find(request.param("id"));
    if (user) {
      user.delete();
      session.flash({ notification: this.entityDeleteNotification() });
      response.redirect(this.entityListPath);
    }
  }
}
