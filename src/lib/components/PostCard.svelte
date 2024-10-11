<script lang="ts">
  import { prettyDate, type Post } from "$lib";
  import { User } from "$lib/components";

  export let post: Post;
</script>

<article>
  <header>
    <a href="/posts/{post.title}"><h1>{post.title}</h1></a>
  </header>
  <footer>
    <small class="timestamp">
      {prettyDate(post.created_at)}
      {#if post.updated_at}
        <span class="dimmed">
          &nbsp; &middot; &nbsp;
          {prettyDate(post.updated_at)}
        </span>
      {/if}
    </small>
    <User account={post.author} named />
  </footer>
</article>

<style lang="scss">
  article {
    display: flex;
    flex-direction: column;

    header {
      --pico-typography-spacing-vertical: 0;

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
