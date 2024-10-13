<script lang="ts">
  import { PencilSimple as Pencil } from "phosphor-svelte";

  import PostCard from "$lib/components/PostCard.svelte";
  import type { Post } from "$lib";

  let { data } = $props();
  const { session, posts } = data;
</script>

{#snippet header(post: Post)}
  {#if session}
    <a href="/edit/{post.title}">
      <Pencil size="1.75rem" />
    </a>
  {/if}
{/snippet}

<main>
  <section class="posts">
    {#each posts as post}
      <PostCard {post} {header} />
    {/each}
  </section>
</main>

<style lang="scss">
  .posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 1rem;

    :global(> *) {
      flex: 1 0 33%; // 2 posts per row
      margin-bottom: 0;
    }
  }

  a {
    color: inherit;
  }
</style>
