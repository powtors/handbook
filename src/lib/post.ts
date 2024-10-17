import fs from "fs/promises";
import db, { type Post as DbPost } from "$lib/db";
import { Cache, type User } from "$lib";

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
  if (renderings.has(post.id))
    return Object.assign(post, renderings.get(post.id)!);

  const markdown = await fs.readFile(`posts/${post.id}.md`)
    .then((buffer) => buffer.toString());

  // TODO: SANITIZE MARKDOWN OUTPUT!!
  const html = await renderer.parse(markdown);

  return Object.assign(post, renderings.set(post.id, { markdown, html }));
}

const posts = new Cache<string, Post>(5 * 60 * 60);
const renderings = new Cache<number, { markdown: string; html: string }>(5 * 60 * 60);

// Bind svelte's custom `fetch` using `.bind({ fetch })` to use this function
export async function getPost(this: { fetch: typeof fetch }, title: string): Promise<Post> {
  if (posts.has(title.toLowerCase()))
    return posts.get(title.toLowerCase())!;

  const [post]: [DbPost?] = await db`SELECT * FROM posts WHERE LOWER(title) = LOWER(${title})`;
  if (!post) throw new Error("Not found");

  const res = await this.fetch(`/api/accounts/${post.author}`);
  const author: User = await res.json();

  return posts.set(post.title.toLowerCase(), { ...post, author });
}

export async function createPost(author: User, data: { title: string, content: string }): Promise<Post> {
  const [post]: [DbPost?] = await db`INSERT INTO posts (author, title) VALUES (${author.id}, ${data.title}) RETURNING *`;
  if (!post) throw new Error("Failed");

  await fs.mkdir("posts", { recursive: true });
  await fs.writeFile(`posts/${post.id}.md`, data.content);

  return posts.set(post.title.toLowerCase(), { ...post, author });
}

export async function updatePost(post: Post, data: { title?: string; content?: string }): Promise<Post> {
  if (data.title) {
    const [updated]: [DbPost?] = await db`UPDATE posts SET title = ${data.title} WHERE title = ${post.title} RETURNING *`;
    if (!updated) throw new Error("Failed");

    const { author } = post;
    posts.invalidate(post.title.toLowerCase())
    post = posts.set(updated.title.toLowerCase(), { ...updated, author });
  }

  if (data.content) {
    await fs.writeFile(`posts/${post.id}.md`, data.content);
    renderings.invalidate(post.id);
  }

  return post;
}

export async function deletePost(post: Post): Promise<Post> {
  const [deleted]: [DbPost?] = await db`DELETE FROM posts WHERE id = ${post.id} RETURNING *`;
  if (!deleted) throw new Error("Failed");

  await fs.rename(`posts/${deleted.id}.md`, `posts/${deleted.id}.trash.md`);

  posts.invalidate(deleted.title.toLowerCase());
  renderings.invalidate(post.id);
  return post;
}
