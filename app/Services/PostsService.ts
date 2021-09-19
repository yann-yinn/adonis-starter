import Post from "App/Models/Post";
import User from "App/Models/User";

interface formValues {
  id?: number | string;
  title: string;
  content: string;
}

function prepareFormValues(post?: Post): formValues {
  const formValues = {
    id: post ? post.id : "",
    title: post ? post.title : "",
    content: post ? post.content : "",
  };
  return formValues;
}

async function save(values, user: User) {
  const post = values.id ? await Post.find(values.id) : new Post();
  if (post) {
    post.title = values.title;
    post.content = values.content;
    // author of the post.
    post.userId = user.id;
    await post.save();
    return post;
  }
}

export default {
  prepareFormValues,
  save,
};
