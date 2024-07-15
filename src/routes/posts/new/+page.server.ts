import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions } from "@sveltejs/kit";
import db, { type Post, type Author } from "$lib/db";
import fs from "fs/promises";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (!session) return error(401, "Unauthorized!");
};

export const actions = {
  default: async (event) => {
    const session = await event.locals.auth();
    if (!session) return error(401, "Unauthorized!");

    const data = await event.request.formData();

    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString().slice(0, 256);
    const markdown = data.get("markdown")?.toString();

    if (!title || !markdown) return error(400, "Bad request!");

    const [author]: [Author?] =
      await db`SELECT * FROM authors WHERE github = ${session.user.github.user}`;
    if (!author) return error(401, "Unauthorized!");

    const [post]: [Post?] =
      await db`INSERT INTO posts (author, title, description) VALUES (${author.id}, ${title}, ${description ?? null}) RETURNING *`;
    if (!post) return error(500, "Internal Server Error");

    await fs.writeFile(`posts/${post.id}.md`, markdown);

    return redirect(301, `/posts/${title.replaceAll(" ", "_").toLowerCase()}`);
  },
} satisfies Actions;
