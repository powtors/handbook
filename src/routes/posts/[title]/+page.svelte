<script lang="ts">
  export let data;

  const { post } = data;

  const formatter = new Intl.DateTimeFormat(navigator.language, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
</script>

<main class="container">
  <article>
    <header>
      <h1>{post.title}</h1>
    </header>
    <section>
      {@html post.html}
    </section>
    <footer>
      <a href={post.author.url}>
        <div class="avatar" style="background-image: url('{post.author.avatar}')"></div>
      </a>
      <div class="info">
        <a href={post.author.url} class="contrast">
          <b>{post.author.name}</b>
        </a>
        <br />
        <small>{formatter.format(post.created_at)}</small>
      </div>
    </footer>
  </article>
</main>

<style lang="scss">
  article {
    > * > :global(:last-child) {
      margin-bottom: 0;
    }

    header h1 {
      font-size: calc(var(--pico-font-size) * 1.375);
    }

    section {
      padding: var(--pico-spacing);
    }

    footer {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;

      gap: 0.5rem;

      .avatar {
        height: 2.75rem;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        aspect-ratio: 1/1;

        border-radius: 30%;

        transition: filter var(--pico-transition);

        &:hover {
          filter: brightness(1.375);
        }
      }

      .info {
        --pico-typography-spacing-vertical: 0;

        text-align: right;
        line-height: 1.15rem;
      }

      a {
        text-decoration: none;
      }
    }
  }
</style>
