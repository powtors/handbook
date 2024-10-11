<script lang="ts">
  export let title: string;
  export let markdown: string;

  $: valid = !!title && !!markdown;
</script>

<article {...$$restProps}>
  <header>
    <input
      name="title"
      placeholder="Title"
      type="text"
      required
      bind:value={title}
      on:input={(e) => (e.currentTarget.ariaInvalid = `${!title}`)}
    />
  </header>
  <section>
    <textarea name="markdown" required bind:value={markdown}></textarea>
  </section>
  <footer>
    <button type="submit" disabled={!valid}>Finish</button>
  </footer>
</article>

<style lang="scss">
  article {
    display: flex;
    flex-direction: column;

    > * > :last-child {
      margin-bottom: 0;
    }
  }

  section {
    display: contents;
  }

  textarea {
    height: 100%;
    resize: none;
  }
</style>
