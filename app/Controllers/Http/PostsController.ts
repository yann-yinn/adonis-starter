import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class PostsController {
  public async index({}: HttpContextContract) {}

  public async create({ view }: HttpContextContract) {
    return view.render("pages/postCreate");
  }

  public async store({ session, response }: HttpContextContract) {
    /**
     * Create a new post
     */
    const post = new Post();
    post.title = post.title;
    post.content = post.content;
    await post.save();
    session.flash({ notification: "post created successfully" });
    /**
     * Redirect to the home page
     */
    response.redirect("/");
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
