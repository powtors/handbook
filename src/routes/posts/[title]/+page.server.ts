import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import db, { type Post, type Author } from "$lib/db";
import fs from "fs/promises";
import { marked } from 'marked';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const title = params.title.replaceAll("_", " ");

  const [post]: [Post?] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${title})`;
  if (!post) return error(404, "Post not found!");

  const markdown = await fs.readFile(`posts/${post.id}.md`)
    .then(buffer => buffer.toString());

  const [author]: [Author] = await db`SELECT * FROM authors WHERE id = ${post.author}`;
  const user = await fetch(`https://api.github.com/users/${author.github}`)
    .then(async res => await res.json() as {
      login: string;
      name: string;
      avatar_url: string;
      html_url: string;
    });

  // FIXME: SANITIZE MARKDOWN OUTPUT!!
  const html = await marked
    .parse(markdown);

  return {
    post: {
      title: post.title,
      description: post.description,
      html,
      author: {
        name: user.name,
        github: user.login,
        url: user.html_url,
        avatar: user.avatar_url,
      },
      created_at: post.created_at,
      updated_at: post.updated_at,
    }
  };
}
