import { error, type ServerLoad } from "@sveltejs/kit";
import { getPost, renderPost } from "$lib/post";

export const load: ServerLoad = async ({ params, fetch }) => {
  if (!params.title) return;

  const post = await getPost(params.title, { fetch });
  if (!post) throw error(500, "Unreachable");
  const data = await renderPost(post!);

  return { post: { ...post, ...data } };
};
