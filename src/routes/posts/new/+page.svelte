<script lang="ts">
  import { onMount } from "svelte";

  let autofocus: HTMLElement;
  onMount(async () => {
    autofocus.focus();
  });

  $: title = "";
  $: markdown = "";
  $: description = "";

  $: valid = !!title && !!markdown && !!description;
</script>

<main class="container">
  <form method="post">
    <article>
      <header>
        <input name="title" type="text" required
          placeholder="Title"
          bind:value={title}
          on:input={(e) => e.currentTarget.ariaInvalid = `${!title}` }
        />
        <input name="description" type="hidden" required bind:value={description} />
        <div class="description" contenteditable
          aria-hidden="true"
          data-len={`${description.length}/${256}`}
          bind:innerText={description}
          on:input={e => {
            e.currentTarget.ariaInvalid = `${description.length > 256}`;
            e.currentTarget.dataset.len = `${description.length}/256`;
          }}>
        </div>
      </header>
      <textarea name="markdown" required bind:value={markdown} bind:this={autofocus}></textarea>
      <footer>
        <button type="submit" disabled={!valid}>Publish</button>
      </footer>
    </article>
  </form>
</main>

<style lang="scss">
  form {
    display: contents;
  }

  article {
    height: 100%;

    display: flex;
    flex-direction: column;

    > * > :last-child {
      margin-bottom: 0;
    }
  }

  textarea {
    flex: 1;

    margin-bottom: 0;

    resize: none;
  }
</style>
