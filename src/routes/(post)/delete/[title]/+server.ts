import { redirect, error, type RequestHandler } from "@sveltejs/kit";
import { getPost, deletePost } from "$lib/post";

export const GET: RequestHandler = async ({ locals, params, fetch }) => {
  const session = await locals.auth();
  if (!session) throw error(401, "Unauthorized");

  const user = session.user.github;

  const post = await getPost(params.title!, { fetch });
  if (!post) throw error(404, "Post not found");

  if (post.author != user.id) throw error(401, "Unauthorized");

  const deleted = await deletePost(post);
  if (!deleted) throw error(500, "Post deletion failed");

  return redirect(301, "/");
}
