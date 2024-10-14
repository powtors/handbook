import { json, error, type RequestHandler } from "@sveltejs/kit";
import { getPost, renderPost } from "$lib/post";

export const GET: RequestHandler = async ({ params, url, fetch }) => {
  const post = await getPost.bind({ fetch })(params.title!);
  if (!post) throw error(404, "Post Not Found");

  const render = url.searchParams.get("render");
  if (!render) return json(post);

  const renderedPost = await renderPost(post);
  return json(renderedPost);
};
