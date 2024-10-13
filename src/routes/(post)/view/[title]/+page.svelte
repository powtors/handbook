<script lang="ts">
  import "@catppuccin/highlightjs/css/catppuccin-mocha.css";

  import { FileText, PencilSimple as Pencil } from "phosphor-svelte";


  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { prettyDate } from "$lib";
  import hljs from "highlight.js";

  const { data } = $props();
  let { session, post } = data;

  let markdown: HTMLElement;

  onMount(async () => {
    // Change footnotes heading id from '<prefix>label' to '<prefix>footnotes'
    const footnotes = markdown.querySelector(".footnotes")!;
    if (footnotes) {
      const child = footnotes.firstElementChild!;
      child.id = child.id.replace(/label$/, "footnotes");
    }

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
      };
    }

    // Highlight.js
    const codeblocks = markdown.querySelectorAll<HTMLElement>("pre code");
    for (const codeblock of codeblocks) {
      const language = codeblock.className.split(" ")
        .find(value => value.search(/^language-\w+$/) != -1);

      if (!language) continue;

      hljs.highlightElement(codeblock);
    }
  });
</script>

<main class="container">
  <article>
    <header>
      <h1>{post.title}</h1>
      {#if session}
        <a href="/edit/{$page.params.title}">
          <Pencil size="1.75rem" />
        </a>
      {/if}
    </header>
    <section class="markdown" bind:this={markdown}>
      {@html post.html}
    </section>
    <footer>
        <span class="actions">
          <a href="/raw/{$page.params.title}" title="See raw file">
            <FileText size="1.75rem" />
          </a>
        </span>
        <div class="author">
          <a href="https://github.com/{post.author.name}">
            <div class="avatar" style:background-image="url('https://github.com/{post.author.name}.png')"></div>
          </a>
          <div class="info">
            <a href="https://github.com/{post.author.name}" class="contrast">
              <b>{post.author.name}</b>
            </a>
            <br />
            <small>
              {#if post.updated_at}
                <span class="dimmed">
                  {prettyDate(post.updated_at)}
                  &middot;
                </span>
              {/if}
              {prettyDate(post.created_at)}
            </small>
          </div>
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

    header {
      --pico-typography-spacing-vertical: 0;

      display: flex;
      align-items: center;
      justify-content: space-between;
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
      align-items: center;
      justify-content: space-between;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }
  }

  a {
    color: inherit;

    transition: filter var(--pico-transition);

    &:hover {
      filter: brightness(1.375);
    }
  }

  .author {
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

  :global(code.hljs) {
    background: none;
  }
</style>
