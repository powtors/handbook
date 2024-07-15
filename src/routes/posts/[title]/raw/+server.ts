import { error, text, type RequestHandler } from "@sveltejs/kit";
import fs from "fs/promises";
import db, { type Post } from "$lib/db";

export const GET: RequestHandler = async ({ params }) => {
  const title = params.title!.replaceAll("_", " ");

  const [post]: [Post?] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${title})`;
  if (!post) return error(404, "Post not found!");

  const markdown = await fs.readFile(`posts/${post.id}.md`).then((buffer) => buffer.toString());

  return text(markdown);
};
