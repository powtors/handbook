import type { ServerLoad } from "@sveltejs/kit";
import { getPost } from "$lib/post";

export const load: ServerLoad = async ({ params, fetch }) => {
  if (!params.title) return;

  return { post: await getPost(params.title, { fetch }) };
};
