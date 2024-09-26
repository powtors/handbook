<script lang="ts">
  import PostCard from "$lib/components/PostCard.svelte";

  let { data } = $props();
  const { posts } = data;
</script>

<main class="container">
  <article class="posts">
    <header>
      <a href="/posts">
        <h1>Posts</h1>
      </a>
    </header>
    <section>
      {#each posts as post}
        <PostCard {post} />
      {/each}
    </section>
  </article>
</main>

<style lang="scss">
  .posts > header {
    --pico-typography-spacing-vertical: 0;
  }

  .posts > section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 1rem;

    :global(> *) {
      flex: 1 0;
    }

    &, :global(> *) {
      margin-bottom: 0;
    }
  }

</style>
