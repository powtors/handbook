import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions } from "@sveltejs/kit";
import db, { type Post } from "$lib/db";
import fs from "fs/promises";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (!session) throw error(401);
};

export const actions = {
  default: async ({ locals, request }) => {
    const session = await locals.auth();
    if (!session) throw error(401);

    const data = await request.formData();

    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString().slice(0, 256);
    const markdown = data.get("markdown")?.toString();

    if (!title || !markdown) throw error(400);

    // FIXME: don't let anyone post
    const [post]: [Post?] = await db`INSERT INTO posts (author, title, description) VALUES (${session.user.github.id}, ${title}, ${description ?? null}) RETURNING *`;
    if (!post) throw error(500);

    await fs.mkdir("posts", { recursive: true });
    await fs.writeFile(`posts/${post.id}.md`, markdown);

    return redirect(301, `/posts/${encodeURI(post.title)}`);
  },
} satisfies Actions;
