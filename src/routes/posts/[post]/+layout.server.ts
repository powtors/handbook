import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import db, { type Post, type Author } from "$lib/db";
import fs from "fs/promises";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import footnote from "marked-footnote";
import { getUser } from "$lib/cache";

const headings = gfmHeadingId({ prefix: "" });
const footnotes = footnote({ prefixId: ":" });

export const load: LayoutServerLoad = async ({ params, parent }) => {
  const { session } = await parent();
  const [post]: [Post?] =
    await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${params.post.replaceAll("_", " ")})`;
  if (!post) return error(404, "Post not found!");

  const markdown = await fs.readFile(`posts/${post.id}.md`).then((buffer) => buffer.toString());

  const [{ github: name }]: [Author] = await db`SELECT * FROM authors WHERE id = ${post.author}`;
  const author = await getUser(name, session?.user.authorization);

  // FIXME: SANITIZE MARKDOWN OUTPUT!!
  const html = await marked.use(headings).use(footnotes).parse(markdown);

  const { title, description, created_at, updated_at } = post;

  return {
    post: {
      href: params.post,
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
