<script lang="ts">
  import { prettyDate, type Modify } from "$lib";
  import type { Post } from "$lib/db";
  import type { Account } from "$lib/github";

  export let post: Modify<Post, { author: Account }>;

  const title = post.title.toLowerCase();
</script>

<article>
  <header>
    <a href="/posts/{title}"><h1>{post.title}</h1></a>
  </header>
  {#if post.description}
    <section>{post.description}</section>
  {/if}
  <footer>
    <small>
      {prettyDate(post.created_at)}
      {#if post.updated_at}
        <span class="dimmed">
          &nbsp; &middot; &nbsp;
          {prettyDate(post.updated_at)}
        </span>
      {/if}
    </small>
    <a href={post.author.url} class="author contrast">
      <b>{post.author.name}</b>
      <div class="avatar" style="background-image: url('{post.author.avatar}')"></div>
    </a>
  </footer>
</article>

<style lang="scss">
    article {
      header {
        --pico-typography-spacing-vertical: 0;

        margin-bottom: 0;
      }

      section {
        flex: 1;

        max-height: 5rem;

        margin-block: var(--pico-block-spacing-vertical);
      }

      footer {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-top: 0;
      }
    }


.author {
  display: flex;
  align-items: center;

  gap: 0.75rem;

  color: inherit;
  text-decoration: none;

  .avatar {
    height: 2rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    aspect-ratio: 1/1;
    border-radius: 30%;
  }

  transition: filter var(--pico-transition);

  &:hover {
    filter: brightness(1.375);
  }
}
</style>
