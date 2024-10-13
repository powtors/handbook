<script lang="ts">
  interface Props {
    title?: string;
    markdown?: string;
  };

  let { title, markdown, ...props }: Props = $props();

  let valid = $derived(!!title && !!markdown);
</script>

<article {...props}>
  <header>
    <!-- TODO: block post with same title as another -->
    <input type="text" name="title" required bind:value={title}
      oninput={(e) => (e.currentTarget.ariaInvalid = `${!title}`)}
      placeholder="Title"
    />
  </header>
  <section>
    <!-- TODO: make this a drop-down file dialog -->
    <textarea name="markdown" required bind:value={markdown}></textarea>
  </section>
  <footer>
    <button type="submit" disabled={!valid}>Finish</button>
  </footer>
</article>

<style lang="scss">
  article {
    --pico-spacing: 0;

    display: flex;
    flex-direction: column;
  }

  section {
    display: contents;

    textarea {
      height: 100%;
      resize: none;
    }
  }
</style>
