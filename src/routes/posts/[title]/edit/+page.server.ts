import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions } from "@sveltejs/kit";
import db, { type Post, type Author } from "$lib/db";
import fs from "fs/promises";

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  if (data.post.author.github != data.session?.user.github.login)
    return error(401, "Unauthorized!");

  return data;
};

export const actions = {
  default: async ({ locals, request, params }) => {
    const session = await locals.auth();
    if (!session) return error(401, "Unauthorized!");

    const originalTitle = params.title!.replaceAll("_", " ");

    const data = await request.formData();

    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString().slice(0, 256);
    const markdown = data.get("markdown")?.toString();

    if (!title || !markdown) return error(400, "Bad request!");

    const [author]: [Author?] = await db`SELECT * FROM authors WHERE github = ${session.user.github.login}`;
    if (!author) return error(401, "Unauthorized!");

    const [post]: [Post?] = await db`UPDATE posts SET author = ${author.id}, title = ${title}, description = ${description ?? null} WHERE title = ${originalTitle} RETURNING *`;
    if (!post) return error(500, "Internal Server Error")

    await fs.writeFile(`posts/${post.id}.md`, markdown);

    return redirect(301, `/posts/${title.replaceAll(" ", "_").toLowerCase()}`);
  }
} satisfies Actions;
