<script lang="ts">
  import { onMount } from "svelte";
  import { DragNDrop } from "$lib/components";

  interface Props {
    title?: string;
    markdown?: string;

    dnd?: boolean;
  };

  let { title, markdown, dnd }: Props = $props();

  let form: HTMLFormElement;

  let file: boolean | undefined = $state(false);
  let valid = $derived(!!title && (!!markdown || file));

  onMount(() => {
    if (dnd) form.enctype = "multipart/form-data";
  })
</script>

<form method="post" bind:this={form}>
  <article>
    <header>
      <!-- TODO: block post with same title as another -->
      <input name="title" required
        type="text" bind:value={title}
        oninput={(e) => (e.currentTarget.ariaInvalid = `${!title}`)}
        placeholder="Title"
      />
    </header>
    <section>
      {#if dnd}
        <DragNDrop name="file" required
          accept="text/markdown"
          validate={(filename) => {
            if (!filename.endsWith(".md"))
              return "Must be a markdown file";
          }}
          bind:valid={file} />
      {:else}
        <textarea name="markdown" required
          bind:value={markdown}>
        </textarea>
      {/if}
    </section>
    <footer>
      <button type="submit" disabled={!valid}>Finish</button>
    </footer>
  </article>
</form>

<style lang="scss">
  form {
    display: contents;
  }

  article {
    --pico-spacing: 0;

    display: flex;
    flex-direction: column;
  }

  section {
    display: contents;

    :global(> :first-child) {
      height: 100%;
    }

    textarea {
      resize: none;
    }
  }
</style>
