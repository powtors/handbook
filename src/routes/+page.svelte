<script lang="ts">
  import { User } from "$lib/components";

  let { data } = $props();
  const { posts } = data;
</script>

<main>
  {#each posts as post}
    <section>
      <a href="/view/{post.title}">
        <h2>{post.title}</h2>
      </a>
      <User user={post.author} slim />
    </section>
  {/each}
</main>

<style lang="scss">
  main {
    --pico-block-spacing-horizontal: 1.625rem;
  }

  section {
    --pico-typography-spacing-vertical: 0;

    display: flex;
    justify-content: space-between;

    gap: 0.75rem;

    a, h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:not(:last-child) {
      margin-bottom: var(--pico-block-spacing-vertical);
    }
  }
</style>
