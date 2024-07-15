<script lang="ts">
  import type { Post } from "$lib/db";
  import type { GithubUser } from "$lib/cache";
  import { prettyDate, type Modify } from "$lib";
  import { onMount } from "svelte";

  let posts: Modify<Post, { author: GithubUser }>[] = $state([]);

  async function fetchPosts(take: number = 1) {
    const _posts = await fetch(
      `/posts?skip=${posts.length}${take > 0 ? "&take=" + take : ""}`
    ).then(async (res) => await res.json());

    posts = [...posts, ..._posts];
  }

  onMount(async () => {
    await fetchPosts(0);
  });
</script>

<main class="container">
  <h1>Posts</h1>
  <div class="posts">
    {#each posts as post}
      {@const title = post.title.replaceAll(" ", "_").toLowerCase()}
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
    {/each}
  </div>
</main>

<style lang="scss">
  .posts {
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

      .author {
        display: flex;
        align-items: center;

        gap: 0.75rem;

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
    }
  }
</style>
