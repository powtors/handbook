import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions } from "@sveltejs/kit";
import { createPost } from "$lib/post";
import maintainer from "$lib/maintainer";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (!session) throw error(401, "Unauthorized");

  if (session.user.id !== maintainer.id) throw error(401, "Unauthorized");
};

export const actions = {
  default: async ({ locals, request }) => {
    const session = await locals.auth();
    if (!session) throw error(401, "Unauthorized");

    if (session.user.id !== maintainer.id) throw error(401, "Unauthorized");

    const data = await request.formData();
    const title = data.get("title") as string;
    const file = data.get("file") as File;
    let markdown = data.get("markdown") as string;

    if (!title) throw error(400, "Missing `title`");
    if (!file && !markdown) throw error(400, "Missing `markdown`");

    if (file) markdown = await file.text();

    const post = await createPost(session.user, { title, content: markdown });
    if (!post) throw error(500, "Failed");

    return redirect(301, `/view/${encodeURI(post.title)}`);
  },
} satisfies Actions;
