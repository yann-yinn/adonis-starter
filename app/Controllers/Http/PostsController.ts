import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/CreatePostValidator";
import postsService from "App/Services/postsService";

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all();
    return view.render("pages/posts", { posts: posts });
  }

  public async create({ view }: HttpContextContract) {
    const formValues = postsService.prepareFormValues();
    return view.render("pages/postForm", { formValues });
  }

  public async store({ session, request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator);
    const post = new Post();
    post.title = payload.title;
    post.content = <string>payload.content;
    await post.save();
    session.flash({ notification: "post created successfully" });
    response.redirect("/posts");
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, request, response }: HttpContextContract) {
    const post = await Post.find(request.param("id"));
    if (post) {
      const formValues = postsService.prepareFormValues(post);
      return view.render("pages/postForm", { formValues });
    } else {
      response.status(404);
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
