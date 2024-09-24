<script lang="ts">
  import PostCard from "$lib/components/PostCard.svelte";

  let { data } = $props();
  const { posts } = data;
</script>

<main class="container">
  <article>
    <header>
      <a href="/posts">
        <h1>Posts</h1>
      </a>
    </header>
    <section>
      <div>
        {#each posts as post}
          <PostCard {post} />
        {/each}
      </div>
    </section>
  </article>
</main>

<style lang="scss">
  article > header {
    --pico-typography-spacing-vertical: 0;
  }
</style>
