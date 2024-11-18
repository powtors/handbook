<script lang="ts">
  const { data } = $props();
</script>

<main>
  {#each data.posts as post}
    <section>
      <a href={post.href}>
        <h2>{post.title}</h2>
      </a>
      <a href="https://github.com/potors">
        <img src="https://github.com/potors.png" alt="author" />
      </a>
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

    &:last-child {
      --pico-block-spacing-vertical: 0;
    }
  }

  img {
    width: 2rem;
    height: 2rem;

    border-radius: 30%;

    transition: var(--pico-transition);

    &:hover {
      filter: brightness(1.375);
    }
  }
</style>
