<script lang="ts">
  import { Plus } from "phosphor-svelte";

  import { PostCard } from "$lib/components";

  let { data } = $props();
  const { session, posts } = data;
</script>

<main class="container">
  <div class="heading">
    <h1>Posts</h1>
    {#if session?.user?.github.user}
      <a href="/posts/new"><Plus size="1.45rem"/></a>
    {/if}
  </div>
  <ul class="posts">
    {#each posts as post}
      <li><PostCard {post} /></li>
    {/each}
  </ul>
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
