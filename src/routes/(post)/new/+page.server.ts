import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions } from "@sveltejs/kit";
import { createPost } from "$lib/post";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (!session) throw error(401, "Unauthorized");
};

export const actions = {
  default: async ({ locals, request }) => {
    const session = await locals.auth();
    if (!session) throw error(401, "Unauthorized");

    const data = await request.formData();
    const title = data.get("title") as string;
    const markdown = data.get("markdown") as string;

    const missing = [!title && "`title`", !markdown && "`markdown`"].filter(Boolean).join(" & ");
    if (!title || !markdown) throw error(400, `Missing ${missing}`);

    // FIXME: don't let anyone post
    const post = await createPost(session.user, { title, content: markdown });
    if (!post) throw error(500, "Failed");

    return redirect(301, `/view/${encodeURI(post.title)}`);
  },
} satisfies Actions;
