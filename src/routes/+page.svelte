<script lang="ts">
  import PostCard from "$lib/components/PostCard.svelte";

  export let data;
</script>

<main class="container">
  <article>
    <header>
      <a href="/posts">
        <h1>Posts</h1>
      </a>
    </header>
    <section>
      {#each data.posts as post}
        <PostCard {post} />
      {/each}
    </section>
  </article>
</main>

<style lang="scss">
  article > header {
    --pico-typography-spacing-vertical: 0;
  }
</style>
