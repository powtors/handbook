import { error, text, type RequestHandler } from "@sveltejs/kit";
import { getPost, renderPost } from "$lib/post";

export const GET: RequestHandler = async ({ params }) => {
  const post = await getPost(params.title!).then(renderPost);
  if (!post) throw error(404, "Post Not Found");

  return text(post.markdown, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
