import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import db, { type Post } from "$lib/db";
import fs from "fs/promises";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import footnote from "marked-footnote";

const headings = gfmHeadingId({ prefix: "" });
const footnotes = footnote({ prefixId: ":" });

export const load: LayoutServerLoad = async ({ params, fetch }) => {
  const [post]: [Post?] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${params.title})`;
  if (!post) throw error(404);

  const markdown = await fs.readFile(`posts/${post.id}.md`).then((buffer) => buffer.toString());

  const res = await fetch(`/api/accounts/${post.author}`);
  const author = await res.json();

  // TODO: SANITIZE MARKDOWN OUTPUT!!
  const html = await marked.use(headings).use(footnotes).parse(markdown);

  const { id, title, description, created_at, updated_at } = post;

  return {
    post: {
      id,
      href: params.title,
      title,
      description,
      markdown,
      html,
      author,
      created_at,
      updated_at,
    },
  };
};
