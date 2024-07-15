import { json, type RequestHandler } from "@sveltejs/kit";
import db, { type Author, type Post } from "$lib/db";
import { getUser } from "$lib/cache";

export const GET: RequestHandler = async ({ locals, url }) => {
  const session = await locals.auth();

  const take = url.searchParams.get("take");
  const skip = url.searchParams.get("skip") ?? 0;

  const posts: (Post & Author)[] = await db`
    SELECT *, posts.id FROM posts
    JOIN authors
      ON authors.id = posts.author
    ORDER BY created_at
    OFFSET ${skip}
    ${take ? db`LIMIT ${take}` : db`LIMIT ALL`}`;

  const output = await Promise.all(
    posts.map(async (post) => {
      const author = await getUser(post.github, session?.user.authorization);

      return { ...post, author };
    })
  );

  return json(output);
};
