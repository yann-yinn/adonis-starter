import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/CreatePostValidator";
import UpdatePostValidator from "App/Validators/UpdatePostValidator";
import PostsService from "App/Services/PostsService";
import { createConfirmDeleteLink } from "App/Services/HelpersService";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class AdminPostsController {
  /**
   * Liste des posts pour l'admin
   */
  public async index({ view, request }: HttpContextContract) {
    const page = request.input("page", 1);
    const limit = 5;
    const posts = await Database.from("posts")
      .join("users", "users.id", "=", "posts.user_id")
      .select("posts.*")
      .select("users.name as userName", "users.id as userId")
      .paginate(page, limit);
    posts.baseUrl("/admin/posts");

    // add delete links and edit Links for each post.
    posts.forEach((post) => {
      const deleteLink = createConfirmDeleteLink({
        entity: "Post",
        id: post.id,
        title: `Étes vous sûr de vouloir supprimer "${post.title}" ?`,
        formAction: "/admin/posts/" + post.id + "/delete",
      });
      post.created_at = new Date(post.created_at).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      post._deleteLink = deleteLink;
      post._editLink = `/admin/posts/${post.id}/edit`;
    });

    return view.render("pages/admin/posts", { posts });
  }

  public async create({ view }: HttpContextContract) {
    const formValues = PostsService.prepareFormValues();
    return view.render("pages/admin/postForm", {
      formValues,
      formAction: "/admin/posts",
    });
  }

  public async store({
    session,
    request,
    response,
    auth,
  }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator);
    await PostsService.save(payload, auth.user as User);
    session.flash({
      notification: "Le billet de blog a été crée",
    });
    response.redirect("/admin/posts");
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, request, response, bouncer }: HttpContextContract) {
    const post = await Post.find(request.param("id"));
    if (!post) {
      response.status(404);
      return;
    }
    await bouncer.authorize("editOwnPost", post);
    if (post) {
      const formValues = PostsService.prepareFormValues(post);
      return view.render("pages/admin/postForm", {
        formValues,
        formAction: "/admin/posts/" + post.id,
      });
    }
  }

  public async update({
    request,
    session,
    response,
    auth,
  }: HttpContextContract) {
    const payload = await request.validate(UpdatePostValidator);
    await PostsService.save(payload, auth.user as User);
    session.flash({ notification: "Le billet de blog a été mis à jour" });
    response.redirect("/admin/posts");
  }

  public async delete({ request, response, session }: HttpContextContract) {
    const post = await Post.find(request.param("id"));
    if (post) {
      post.delete();
      session.flash({ notification: "Le billet de blog a été supprimé" });
      response.redirect("/admin/posts");
    }
  }
}
