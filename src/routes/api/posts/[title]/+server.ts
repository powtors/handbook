import { json, error, type RequestHandler } from "@sveltejs/kit";
import db, { type Post } from "$lib/db";
import type { Account } from "$lib/github";

export const GET: RequestHandler = async ({ params, fetch }) => {
  const [post]: Post[] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${params.title!})`;

  if (!post) throw error(404);

  const res = await fetch(`/api/accounts/${post.author}`);
  const author: Account = await res.json();

  return json({ ...post, author });
};
