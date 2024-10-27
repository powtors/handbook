<script lang="ts">
  import { Timestamp, User } from "$lib/components";

  let { data } = $props();
  const { posts } = data;
</script>

<main>
  {#each posts as post}
    <section>
      <a href="/view/{post.title}">
        <h2>{post.title}</h2>
      </a>
      <span>
        <Timestamp {post} simple />
        <User user={post.author} />
      </span>
    </section>
  {/each}
</main>

<style lang="scss">
  section {
    --pico-typography-spacing-vertical: 0;

    display: flex;
    justify-content: space-between;
    
    gap: 2rem;

    a, h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      display: flex;
      align-items: baseline;

      gap: 1rem;
    }

    &:not(:last-child) {
      margin-bottom: var(--pico-block-spacing-vertical);
    }
  }
</style>
