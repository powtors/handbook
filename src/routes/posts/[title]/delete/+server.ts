import { redirect, error, type RequestHandler } from "@sveltejs/kit";
import db, { type Post } from "$lib/db";
import fs from "fs/promises";

export const GET: RequestHandler = async ({ locals, params }) => {
  const session = await locals.auth();

  const [post]: Post[] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${params.title!})`;
  if (!post) throw error(404);

  if (post.author != session?.user.github.id) throw error(401);

  await db`DELETE FROM posts WHERE id = ${post.id}`;
  await fs.rm(`posts/${post.id}.md`);

  return redirect(301, "/posts");
}
