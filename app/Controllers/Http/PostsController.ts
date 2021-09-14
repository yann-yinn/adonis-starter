import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/CreatePostValidator";

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all();
    return view.render("pages/posts", { posts: posts });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("pages/postForm");
  }

  public async store({ session, request, response }: HttpContextContract) {
    console.log("store");
    const payload = await request.validate(CreatePostValidator);
    console.log("payload", payload);
    const post = new Post();
    post.title = payload.title;
    post.content = <string>payload.content;
    await post.save();

    session.flash({ notification: "post created successfully" });
    response.redirect("/posts");
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, request }: HttpContextContract) {
    const post = await Post.find(request.param("id"));
    return view.render("pages/postForm", { post: post });
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
