import type { PageLoad } from "./$types";
import type { Post } from "$lib";

export const load: PageLoad = async ({ fetch }) => {
  const posts = await fetch("/posts").then(res => res.json()) as Post[];

  return { posts };
};
