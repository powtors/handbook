<script lang="ts">
export let title = "";
export let description = "";
export let markdown = "";

export let max = 256;

$: valid = !!title && !!markdown;
</script>

<article {...$$restProps}>
  <header>
    <input name="title" placeholder="Title"
      type="text" required
      bind:value={title}
      on:input={e => e.currentTarget.ariaInvalid = `${!title}`}
    />
    <input name="description"
      type="hidden" required
      bind:value={description}
    />
    <div class="description"
      contenteditable aria-hidden="true"
      data-len={`${description.length}/${max}`}
      bind:innerText={description}
      on:input={e => {
        e.currentTarget.ariaInvalid = `${description.length > max}`;
        e.currentTarget.dataset.len = `${description.length}/${max}`;
      }}>
    </div>
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
