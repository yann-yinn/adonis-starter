import Post from "App/Models/Post";

interface formValues {
  title: string;
  content: string;
}

export function prepareFormValues(post?: Post): formValues {
  const formValues = {
    title: post ? post.title : "",
    content: post ? post.content : "",
  };
  return formValues;
}

export default {
  prepareFormValues,
};
