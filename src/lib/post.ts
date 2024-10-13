import fs from "fs/promises";
import db, { type Post as DbPost } from "$lib/db";
import type { Account } from "$lib/github";

export type Post = Omit<DbPost, "author"> & { author: Account };

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import footnote from "marked-footnote";

const headings = gfmHeadingId({ prefix: "" });
const footnotes = footnote({ prefixId: ":" });

export async function renderPost(post: Post): Promise<{ markdown: string; html: string; }> {
  const markdown = await fs.readFile(`posts/${post.id}.md`).then((buffer) => buffer.toString());

  // TODO: SANITIZE MARKDOWN OUTPUT!!
  const html = await marked
    .use(headings)
    .use(footnotes)
    .parse(markdown);

  return { markdown, html };
}

export async function getPost(title: string, custom?: { fetch?: typeof fetch }): Promise<Post> {
  const [dbpost]: [DbPost?] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${title})`;
  if (!dbpost) throw new Error("Not found");

  const res = await (custom?.fetch ?? fetch)(`/api/accounts/${dbpost.author}`);
  const author: Account = await res.json();

  const post = { ...dbpost, author } as Post;

  return post;
}

export async function createPost(author: Account, title: string, markdown: string): Promise<Post> {
  const [post]: [Post?] = await db`INSERT INTO posts (author, title) VALUES (${author.id}, ${title}) RETURNING *`;
  if (!post) throw new Error("Failed");

  await fs.mkdir("posts", { recursive: true });
  await fs.writeFile(`posts/${post.id}.md`, markdown);

  return post;
}

export async function updatePost(post: Post, data: { title?: string; markdown?: string }): Promise<Post> {
  if (data.title) {
    const [updated]: [Post?] = await db`UPDATE posts SET title = ${data.title} WHERE title = ${post.title} RETURNING *`;
    if (!updated) throw new Error("Failed");

    post = updated;
  }

  if (data.markdown) {
    await fs.writeFile(`posts/${post.id}.md`, data.markdown);
  }

  return post;
}

export async function deletePost(post: Post): Promise<Post> {
  const [deleted]: [Post?] = await db`DELETE FROM posts WHERE id = ${post.id}`;
  if (!deleted) throw new Error("Failed");

  await fs.rm(`posts/${deleted.id}.md`);

  return deleted;
}
