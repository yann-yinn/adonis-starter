import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/CreatePostValidator";
import UpdatePostValidator from "App/Validators/UpdatePostValidator";
import postsService from "App/Services/PostsService";
import { createConfirmDeleteLink } from "App/Services/HelpersService";
import Database from "@ioc:Adonis/Lucid/Database";

export default class PostsController {
  /**
   * Liste des posts pour l'admin
   */
  public async index({ view, request }: HttpContextContract) {
    const page = request.input("page", 1);
    const limit = 5;
    const posts = await Database.from("posts").paginate(page, limit);
    posts.baseUrl("/admin/posts");

    // add delete links and edit Links for each post.
    posts.forEach((post) => {
      const deleteLink = createConfirmDeleteLink({
        entity: "Post",
        id: post.id,
        title: `Étes vous sûr de vouloir supprimer "${post.title}" ?`,
        formAction: "/admin/posts/" + post.id + "/delete",
      });
      post._deleteLink = deleteLink;
      post._editLink = `/admin/posts/${post.id}/edit`;
    });

    return view.render("pages/admin/posts", { posts });
  }

  public async create({ view }: HttpContextContract) {
    const formValues = postsService.prepareFormValues();
    return view.render("pages/admin/postForm", {
      formValues,
      operation: "create",
      formAction: "/admin/posts",
    });
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator);
    await postsService.save(payload);
    session.flash({ notification: "post created successfully" });
    response.redirect("/admin/posts");
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, request, response }: HttpContextContract) {
    const post = await Post.find(request.param("id"));
    if (post) {
      const formValues = postsService.prepareFormValues(post);
      return view.render("pages/admin/postForm", {
        formValues,
        operation: "edit",
        formAction: "/admin/posts/" + post.id,
      });
    } else {
      response.status(404);
    }
  }

  public async update({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(UpdatePostValidator);
    await postsService.save(payload);
    session.flash({ notification: "post updated successfully" });
    response.redirect("/admin/posts");
  }

  public async delete({ request, response }: HttpContextContract) {
    const post = await Post.find(request.param("id"));
    if (post) {
      post.delete();
      response.redirect("/admin/posts");
    }
  }
}
