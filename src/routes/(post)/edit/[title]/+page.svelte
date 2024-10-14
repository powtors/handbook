<script lang="ts">
  import { Editor } from "$lib/components";

  let { data } = $props();
  const { title, markdown } = data.post;
</script>

<main>
  <Editor {title} {markdown} />
</main>

<style lang="scss">
  :global(article) {
    height: 100%;
  }
</style>
