<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { prettyDate } from "$lib";

  export let data;

  const { post } = data;

  let markdown: HTMLElement;

  onMount(async () => {
    // Change footnotes heading id from '<prefix>label' to '<prefix>footnotes'
    const footnotes = markdown.querySelector(".footnotes")!;
    if (footnotes) footnotes.firstElementChild!.id = footnotes.firstElementChild!.id.replace(/label$/, "footnotes");

    // Link Headings
    const headings = markdown.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");
    for (const heading of headings) {
      const visit = () => goto(`#${heading.id}`, { keepFocus: true });

      heading.role = "link";
      heading.tabIndex = 0;
      heading.onmousedown = visit;
      heading.onkeydown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          visit();
        }
      }
    }
  });
</script>

<main class="container">
  <article>
    <header>
      <h1>{post.title}</h1>
    </header>
    <section class="markdown" bind:this={markdown}>
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
        <small>
          {#if post.updated_at}
            <span class="dimmed">
              {prettyDate(post.updated_at)}
              &nbsp;
              &middot;
              &nbsp;
            </span>
          {/if}
          {prettyDate(post.created_at)}
        </small>
      </div>
    </footer>
  </article>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
  }

  article {
    flex: 1;

    display: flex;
    flex-direction: column;

    > * > :global(:last-child) {
      margin-bottom: 0;
    }

    header h1 {
      font-size: calc(var(--pico-font-size) * 1.375);
    }

    section {
      flex: 1;

      padding: var(--pico-spacing);
      margin-bottom: 0;
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
