import { redirect, error, type RequestHandler } from "@sveltejs/kit";
import { getPost, deletePost } from "$lib/post";

export const GET: RequestHandler = async ({ locals, params, fetch }) => {
  const session = await locals.auth();
  if (!session) throw error(401, "Unauthorized");

  const post = await getPost.bind({ fetch })(params.title!);
  if (!post) throw error(404, "Post Not Found");

  if (post.author.id != session.user.id) throw error(401, "Unauthorized");

  const deleted = await deletePost(post);
  if (!deleted) throw error(500, "Post Deletion Failed");

  return redirect(301, "/");
}
