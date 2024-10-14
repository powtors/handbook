import { error, type ServerLoad } from "@sveltejs/kit";
import { getPost, renderPost } from "$lib/post";

export const load: ServerLoad = async ({ params, fetch }) => {
  if (!params.title) throw error(500, "Unreachable #(post)");

  const post = await getPost.bind({ fetch })(params.title).then(renderPost);
  if (!post) throw error(404, "Not Found");

  return { post };
};
