<!-- TODO: make a component for this "edit page" thing to reutilize with "new" one, only setting the initial values -->
<script lang="ts">
  import { onMount } from "svelte";

  export let data;

  let autofocus: HTMLElement;
  onMount(async () => {
    autofocus.focus();
  });

  $: title = data.post.title;
  $: markdown = data.post.markdown;
  $: description = data.post.description ?? "";

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
        <div contenteditable
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
        <button type="submit" disabled={!valid}>Finish</button>
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
