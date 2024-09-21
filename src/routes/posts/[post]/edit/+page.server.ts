import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions } from "@sveltejs/kit";
import db, { type Post } from "$lib/db";
import fs from "fs/promises";

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  if (data.post.author.user != data.session?.user.github.user) throw error(401);

  return data;
};

export const actions = {
  default: async ({ locals, request, params }) => {
    const session = await locals.auth();
    if (!session) throw error(401);

    const data = await request.formData();

    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString().slice(0, 256);
    const markdown = data.get("markdown")?.toString();

    if (!title || !markdown) throw error(400);

    // TODO: authorization

    const [post]: [Post?] = await db`
      UPDATE posts SET
        author = ${session.user.github.id},
        title = ${title},
        description = ${description ?? null}
      WHERE title = ${params.post!}
      RETURNING *`;
    if (!post) throw error(500);

    await fs.writeFile(`posts/${post.id}.md`, markdown);

    return redirect(301, `/posts/${encodeURI(title)}`);
  },
} satisfies Actions;
