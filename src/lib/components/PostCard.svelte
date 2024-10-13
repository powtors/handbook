<script lang="ts">
  import type { Snippet } from "svelte";
  import { type Post, prettyDate } from "$lib";
  import { User } from "$lib/components";

  interface Props {
    post: Post;
    header: Snippet<[Post]>;
  };

  const { post, header }: Props = $props();
</script>

<article>
  <header>
    <a href="/view/{post.title}">
      <h1>{post.title}</h1>
    </a>
    {@render header?.(post)}
  </header>
  <footer>
    <small class="timestamp">
      {prettyDate(post.created_at)}
      {#if post.updated_at}
        <span class="dimmed">
          &middot;
          {prettyDate(post.updated_at)}
        </span>
      {/if}
    </small>
    <User account={post.author} />
  </footer>
</article>

<style lang="scss">
  article {
    display: flex;
    flex-direction: column;

    header {
      --pico-typography-spacing-vertical: 0;

      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 0;

      white-space: nowrap;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 1rem;

      margin-top: 0;
    }
  }

  .timestamp {
    text-wrap: nowrap;
  }
</style>
