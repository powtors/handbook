import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import db, { type Post, type Author } from "$lib/db";
import fs from "fs/promises";
import { marked } from 'marked';
import { gfmHeadingId } from "marked-gfm-heading-id";
import footnote from "marked-footnote";

const headings = gfmHeadingId({ prefix: "" });
const footnotes = footnote({ prefixId: ":" });

export const load: LayoutServerLoad = async ({ fetch, params }) => {
  const [post]: [Post?] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${params.title.replaceAll("_", " ")})`;
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
    .use(headings)
    .use(footnotes)
    .parse(markdown);

  const { title, description, created_at, updated_at } = post;

  return {
    post: {
      title,
      description,
      markdown,
      html,
      author: {
        name: user.name,
        github: user.login,
        avatar: user.avatar_url,
        url: user.html_url,
      },
      created_at,
      updated_at,
    }
  };
}
