<script lang="ts">
  import "./markdown.scss";
  import "./highlight.css";

  import { FileText } from "phosphor-svelte";

  import { Timestamp, Author } from "$lib/components";
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
      <span>
        <b><Timestamp {date} /></b>
        <Author />
      </span>
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
    }

    b {
      font-weight: 500;
      margin-right: 0.25rem;
    }
  }
</style>
