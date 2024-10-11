import type { PageServerLoad } from "./$types"
import type { Post } from "$lib";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch("/api/posts");
  const posts: Post[] = await res.json();

  return { posts };
}
