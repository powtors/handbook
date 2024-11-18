import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
  const post = await import(`$lib/posts/${params.slug}.svx`).catch(() => null);
  if (!post) throw error(404, "Not Found");

  const { title, date } = post.metadata;
  const Markdown = post.default;

  return { title, date, Markdown };
};
