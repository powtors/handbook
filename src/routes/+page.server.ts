import type { PageServerLoad } from "./$types"
import type { Modify } from "$lib";
import type { Post } from "$lib/db";
import type { GithubUser } from "$lib/cache";

export const load: PageServerLoad = async ({ fetch }) => {
  const posts: Modify<Post, { author: GithubUser }>[] = await fetch("/posts?take=3")
    .then(async res => await res.json());

  return { posts };
}
