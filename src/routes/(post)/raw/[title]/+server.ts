import { error, text, type RequestHandler } from "@sveltejs/kit";
import { getPost, renderPost } from "$lib/post";

export const GET: RequestHandler = async ({ params, fetch }) => {
  const post = await getPost(params.title!, { fetch });
  if (!post) throw error(404, "Post not found");

  const { markdown } = await renderPost(post);
  return text(markdown, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
