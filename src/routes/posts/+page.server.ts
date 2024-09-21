import type { PageServerLoad } from "./$types"
import type { Modify } from "$lib";
import type { Post } from "$lib/db";
import type { Account } from "$lib/github";

export const load: PageServerLoad = async ({ fetch }) => {
  // TODO: holy shit this is dangerous
  const res = await fetch("/api/posts");
  const posts: Modify<Post, { author: Account }>[] = await res.json();

  return { posts };
}
