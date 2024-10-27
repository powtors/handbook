<script lang="ts">
  import { PostCard } from "$lib/components";

  let { data } = $props();
  const { posts } = data;
</script>

<main>
  <section>
    {#each posts as post}
      <PostCard {post} />
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
