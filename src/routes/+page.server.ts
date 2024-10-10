import type { PageServerLoad } from "./$types"
import type { Post } from "$lib";

export const load: PageServerLoad = async ({ fetch }) => {
  const posts: Post[] = await fetch("/api/posts")
    .then(async res => await res.json());

  return { posts };
}
