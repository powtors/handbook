import type { PageServerLoad } from "./$types";
import { redirect, error } from "@sveltejs/kit";
import { deletePost } from "$lib/post";

export const load: PageServerLoad = async ({ parent }) => {
  const { session, post } = await parent();
  if (!session) throw error(401, "Unauthorized");

  if (session.user.id !== post.author.id) throw error(401, "Unauthorized");

  const deleted = await deletePost(post);
  if (!deleted) throw error(500, "Post Deletion Failed");

  return redirect(301, "/");
};
