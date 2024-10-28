<script lang="ts">
  import "@catppuccin/highlightjs/css/catppuccin-mocha.css";

  import { FileText, PencilSimple as Pencil, TrashSimple as Trash } from "phosphor-svelte";

  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Timestamp, User, IconList } from "$lib/components";
  import hljs from "highlight.js";

  const { data } = $props();
  let { post } = data;

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

<main>
  <article>
    <header>
      <h1>{post.title}</h1>
    </header>
    <section class="markdown" bind:this={markdown}>
      {@html post.html}
    </section>
    <footer>
      <span>
        <IconList>
          <a href="/raw/{$page.params.title}"><FileText /></a>
          <a href="/edit/{$page.params.title}"><Pencil /></a>
          <a href="/delete/{$page.params.title}"><Trash /></a>
        </IconList>
      </span>
      <span>
        <Timestamp {post} />
        <User user={post.author} />
      </span>
    </footer>
  </article>
</main>

<style lang="scss">
  article {
    display: flex;
    flex-direction: column;

    height: 100%;
  }

  header {
    --pico-typography-spacing-vertical: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: calc(var(--pico-font-size) * 1.25);
    }
  }

  section {
    flex: 1;

    padding: var(--pico-spacing);

    &, > :global(:last-child) {
      margin-bottom: 0;
    }
  }

  footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    gap: 0.75rem 1rem;

    > :last-child {
      margin-left: auto;
    }
  }

  span {
    display: flex;
    align-items: baseline;

    gap: 1rem;
  }
</style>
