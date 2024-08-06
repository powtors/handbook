<script lang="ts">
  import { Plus } from "phosphor-svelte";

  import type { Post } from "$lib/db";
  import type { GithubUser } from "$lib/cache";
  import { type Modify } from "$lib";
  import { onMount } from "svelte";
  import PostCard from "$lib/components/PostCard.svelte";

  let { data } = $props();
  const { session } = data;

  let posts: Modify<Post, { author: GithubUser }>[] = $state([]);

  async function fetchPosts(take: number = 1) {
    posts = [...posts, ...await fetch(
      `/posts?skip=${posts.length}${take > 0 ? "&take=" + take : ""}`
    ).then(async (res) => await res.json())];
  }

  onMount(async () => {
    await fetchPosts(0);
  });
</script>

<main class="container">
  <span class="heading">
    <h1>Posts</h1>
    {#if session?.user?.github.user}
      <a href="/posts/new"><Plus size="1.45rem"/></a>
    {/if}
  </span>
  <div class="posts">
    {#each posts as post}
      <PostCard {post} />
    {/each}
  </div>
</main>

<style lang="scss">
  .heading {

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;

    a {
      color: inherit;

      margin-left: 1rem;
      margin-bottom: var(--pico-typography-spacing-vertical);
    }
  }
</style>
