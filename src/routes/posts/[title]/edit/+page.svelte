<script lang="ts">
  import { onMount } from "svelte";

  export let data;

  let titleValid = true;
  let markdownValid = true;

  let titleInput: HTMLInputElement;
  let markdownTextArea: HTMLTextAreaElement;

  onMount(async () => {
    titleInput.value = data.post.title;
    markdownTextArea.value = data.post.markdown;

    markdownTextArea.focus();
  });

  $: valid = titleValid && markdownValid;
</script>

<main class="container">
  <form method="post">
    <article>
      <header>
        <input name="title" type="text" required
          placeholder="Title"
          bind:this={titleInput}
          on:input={(e) => {
            titleValid = !!e.currentTarget.value;
            // @ts-ignore
            e.currentTarget.ariaInvalid = !titleValid;
          }}
        />
      </header>
      <textarea name="markdown" required
        bind:this={markdownTextArea}
        on:input={(e) => (markdownValid = !!e.currentTarget.value)}
      ></textarea>
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
