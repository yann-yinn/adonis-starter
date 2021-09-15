import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/CreatePostValidator";
import UpdatePostValidator from "App/Validators/UpdatePostValidator";
import postsService from "App/Services/postsService";

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all();
    return view.render("pages/admin/posts", { posts: posts });
  }

  public async indexAdmin({ view }: HttpContextContract) {
    const posts = await Post.all();
    return view.render("pages/admin/posts", { posts: posts });
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

  public async destroy({}: HttpContextContract) {}
}
