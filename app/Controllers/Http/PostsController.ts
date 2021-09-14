import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all();
    return view.render("posts.index", { posts: posts });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("pages/postCreate");
  }

  public async store({ session, response }: HttpContextContract) {
    const post = new Post();
    post.title = post.title;
    post.content = post.content;
    await post.save();
    session.flash({ notification: "post created successfully" });
    response.redirect("/posts");
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
