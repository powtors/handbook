import type { PageServerLoad } from "./$types"
import type { Modify } from "$lib";
import type { Post } from "$lib/db";
import type { Account } from "$lib/github";

export const load: PageServerLoad = async ({ fetch }) => {
  const posts: Modify<Post, { author: Account }>[] = await fetch("/api/posts?take=5")
    .then(async res => await res.json());

  return { posts };
}
