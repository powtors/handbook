import fs from "fs/promises";
import db, { type Post as DbPost } from "$lib/db";
import type { User } from "$lib";

export type Post = Omit<DbPost, "author"> & { author: User };
export type RenderedPost = Post & { markdown: string; html: string; };

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import footnote from "marked-footnote";

const headings = gfmHeadingId({ prefix: "" });
const footnotes = footnote({ prefixId: ":" });

const renderer = marked
  .use(headings)
  .use(footnotes);

export async function renderPost(post: Post): Promise<RenderedPost> {
  const markdown = await fs.readFile(`posts/${post.id}.md`).then((buffer) => buffer.toString());

  // TODO: SANITIZE MARKDOWN OUTPUT!!
  const html = await renderer.parse(markdown);

  return Object.assign(post, { markdown, html });
}

// Bind svelte's custom `fetch` using `.bind({ fetch })` to use this function
export async function getPost(this: { fetch: typeof fetch }, title: string): Promise<Post> {
  const [post]: [DbPost?] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${title})`;
  if (!post) throw new Error("Not found");

  const res = await this.fetch(`/api/accounts/${post.author}`);
  const author: User = await res.json();

  return { ...post, author };
}

export async function createPost(author: User, data: { title: string, content: string }): Promise<Post> {
  const [post]: [Post?] = await db`INSERT INTO posts (author, title) VALUES (${author.id}, ${data.title}) RETURNING *`;
  if (!post) throw new Error("Failed");

  await fs.mkdir("posts", { recursive: true });
  await fs.writeFile(`posts/${post.id}.md`, data.content);

  return post;
}

export async function updatePost(post: Post, data: { title?: string; content?: string }): Promise<Post> {
  if (data.title) {
    const [updated]: [Post?] = await db`UPDATE posts SET title = ${data.title} WHERE title = ${post.title} RETURNING *`;
    if (!updated) throw new Error("Failed");

    post = updated;
  }

  if (data.content) {
    await fs.writeFile(`posts/${post.id}.md`, data.content);
  }

  return post;
}

export async function deletePost(post: Post): Promise<Post> {
  const [deleted]: [DbPost?] = await db`DELETE FROM posts WHERE id = ${post.id}`;
  if (!deleted) throw new Error("Failed");

  await fs.rename(`posts/${deleted.id}.md`, `posts/trash.${deleted.id}.md`);

  return post;
}
