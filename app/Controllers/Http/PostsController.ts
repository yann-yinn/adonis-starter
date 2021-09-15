import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/CreatePostValidator";
import UpdatePostValidator from "App/Validators/UpdatePostValidator";
import postsService from "App/Services/PostsService";
import { createConfirmDeleteLink } from "App/Services/HelpersService";

interface PostListResult {
  meta: {
    deleteLink: string;
    editLink: string;
  };
  entity: Post;
}

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all();
    const results: PostListResult[] = [];
    posts.forEach((post) => {
      const deleteLink = createConfirmDeleteLink({
        entity: "Post",
        id: post.id,
        title: `Étes vous sûr de vouloir supprimer "${post.title}" ?`,
        formAction: "/admin/posts",
        redirect: "/admin/posts",
      });
      results.push({
        meta: {
          deleteLink,
          editLink: `/admin/posts/${post.id}/edit`,
        },
        entity: post,
      });
    });

    return view.render("pages/admin/posts", { results });
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
        editLink: "/admin/posts/" + post.id + "/edit",
        deleteLink,
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
