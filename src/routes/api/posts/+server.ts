import { json, type RequestHandler } from "@sveltejs/kit";
import db, { type Post } from "$lib/db";
import type { Account } from "$lib/github";

export const GET: RequestHandler = async ({ url, fetch }) => {
  const take = url.searchParams.get("take");
  const skip = url.searchParams.get("skip") ?? 0;

  const posts: Post[] = await db`
    SELECT * FROM posts
    ORDER BY created_at
    OFFSET ${skip}
    ${take ? db`LIMIT ${take}` : db`LIMIT ALL`}`;

  const output = await Promise.all(
    posts.map(async (post) => {
      const res = await fetch(`/api/accounts/${post.author}`);
      const author: Account = await res.json();

      return { ...post, author };
    })
  );

  return json(output);
};
