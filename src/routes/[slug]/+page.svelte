<script lang="ts">
  import "./markdown.scss";
  import "./highlight.css";

  import { FileText } from "phosphor-svelte";

  import { Timestamp } from "$lib/components";
  import { page } from "$app/stores";

  const { data } = $props();

  const { title, date, Markdown } = data;
</script>

<main>
  <article>
    <header>
      <h1>{title}</h1>
    </header>
    <section class="markdown">
      <Markdown />
    </section>
    <footer>
      <a href="/{$page.params.slug}/raw">
        <FileText size="1.5rem" />
      </a>
      <b><Timestamp {date} /></b>
    </footer>
  </article>
</main>

<style lang="scss">
  header {
    --pico-typography-spacing-vertical: 0;
  }

  footer {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    a {
      color: inherit;

      transition: var(--pico-transition);

      &:hover {
        filter: brightness(1.375);
      }
    }

    b {
      font-weight: 500;
    }
  }
</style>
