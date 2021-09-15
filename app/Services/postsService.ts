import Post from "App/Models/Post";

interface formValues {
  title: string;
  content: string;
}

function prepareFormValues(post?: Post): formValues {
  const formValues = {
    id: post && post.id ? post.id : "",
    title: post ? post.title : "",
    content: post ? post.content : "",
  };
  return formValues;
}

async function save(values) {
  const post = values.id ? await Post.find(values.id) : new Post();
  if (post) {
    post.title = values.title;
    post.content = values.content;
    await post.save();
  }
  return post;
}

export default {
  prepareFormValues,
  save,
};
