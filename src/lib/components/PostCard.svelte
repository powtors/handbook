<script lang="ts">
  import type { Snippet } from "svelte";
  import { type Post } from "$lib";
  import { Timestamp, User } from "$lib/components";

  interface Props {
    post: Post;

    header?: Snippet<[Post]>;
    footer?: Snippet<[Post]>;
  };

  const { post }: Props = $props();
</script>

<article>
  <header>
    <a href="/view/{post.title}">
      <h1>{post.title}</h1>
    </a>
  </header>
  <footer>
    <span class="info">
      <Timestamp {post} simple />
      <User user={post.author} />
    </span>
  </footer>
</article>

<style lang="scss">
  header {
    --pico-typography-spacing-vertical: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 0;

    white-space: nowrap;
  }

  footer, .info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;
  }

  footer {
    margin-top: 0;
  }

  .info {
    flex: 1;

    align-items: baseline;
  }
</style>
