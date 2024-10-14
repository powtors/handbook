import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions } from "@sveltejs/kit";
import { getPost, updatePost } from "$lib/post";

export const load: PageServerLoad = async ({ parent }) => {
  const { session, post } = await parent();

  if (!session) throw error(401, "Logged Out");
  if (!post) throw error(404, "Post Not Found");

  if (post.author.id !== session.user.id) throw error(401, "Unauthorized");
};

export const actions = {
  async default({ locals, request, params, fetch }) {
    const session = await locals.auth();
    if (!session) throw error(401, "Unauthorized");

    const data = await request.formData();
    const title = data.get("title") as string;
    const markdown = data.get("markdown") as string;

    if (!title && !markdown) throw error(400, "Missing `title` & `markdown`");

    let post = await getPost.bind({ fetch })(params.title!);
    if (!post) throw error(404, "Post Not Found");

    if (post.author.id !== session.user.id) throw error(401, "Unauthorized");

    post = await updatePost(post, { title, content: markdown });
    if (!post) throw error(500, "Update Post Error")

    return redirect(301, `/view/${encodeURI(post.title)}`);
  },
} satisfies Actions;
