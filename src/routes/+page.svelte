<script lang="ts">
  import { PencilSimple as Pencil, TrashSimple as Trash } from "phosphor-svelte";

  import { PostCard, IconList } from "$lib/components";
  import type { Post } from "$lib";

  let { data } = $props();
  const { session, posts } = data;
</script>

{#snippet header(post: Post)}
  {#if post.author.id === session?.user.id}
    <IconList>
      <a href="/edit/{post.title}"><Pencil /></a>
      <a href="/delete/{post.title}"><Trash /></a>
    </IconList>
  {/if}
{/snippet}

<main>
  <section>
    {#each posts as post}
      <PostCard {post} {header} />
    {/each}
  </section>
</main>

<style lang="scss">
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 1rem;

    :global(> *) {
      flex: 1 0 33%; // 2 posts per row
      margin-bottom: 0;
    }
  }
</style>
