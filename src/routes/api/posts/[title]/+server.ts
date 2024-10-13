import { json, error, type RequestHandler } from "@sveltejs/kit";
import { getPost, renderPost } from "$lib/post";

export const GET: RequestHandler = async ({ params, url, fetch }) => {
  const post = await getPost(params.title!, { fetch });
  if (!post) throw error(404, "Post not found");

  const raw = url.searchParams.get("raw");
  const render = url.searchParams.get("render");
  if (raw || render) {
    const { markdown, html } = await renderPost(post);

    if (raw && render) return json({ ...post, markdown, html });
    if (raw) return json({ ...post, markdown });
    if (render) return json({ ...post, html });
  }

  return json(post);
};
