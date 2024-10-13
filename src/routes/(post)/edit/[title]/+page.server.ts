import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions } from "@sveltejs/kit";
import { getPost, updatePost } from "$lib/post";

export const load: PageServerLoad = async ({ parent }) => {
  const { session, post } = await parent();

  if (!post) throw error(404, "Post not found");
  if (!session) throw error(401, "Logged out");

  const user = session.user.github;

  if (post.author.name != user.name) throw error(401, "Unauthorized");
};

export const actions = {
  async default({ locals, request, params, fetch }) {
    const session = await locals.auth();
    if (!session) throw error(401, "Unauthorized");

    const data = await request.formData();
    const title = data.get("title") as string;
    const markdown = data.get("markdown") as string;

    if (!title && !markdown) throw error(400, "Missing `title` & `markdown`");

    // TODO: authorization
    
    const oldPost = await getPost(params.title!, { fetch });
    if (!oldPost) throw error(404, "Post not found");

    const newPost = await updatePost(oldPost, { title, markdown });
    if (!newPost) throw error(500, "Update post error")

    return redirect(301, `/view/${encodeURI(newPost.title)}`);
  },
} satisfies Actions;
