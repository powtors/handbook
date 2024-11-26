<script lang="ts">
  import { Author } from "$lib/components";

  const { data } = $props();
</script>

<main>
  {#each data.posts as post}
    <section>
      <a href={post.href}>
        <h2>{post.title}</h2>
      </a>
      <Author />
    </section>
  {/each}
</main>

<style lang="scss">
  main {
    --pico-block-spacing-horizontal: 1.625remt;
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

    &:last-child {
      --pico-block-spacing-vertical: 0;
    }
  }
</style>
