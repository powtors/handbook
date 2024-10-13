<script lang="ts">
  import { Editor } from "$lib/components";

  let { data } = $props();
  const { title, markdown } = data.post;
</script>

<main>
  <form method="post">
    <Editor {title} {markdown} />
  </form>
</main>

<style lang="scss">
  form {
    display: contents;
  }

  :global(article) {
    height: 100%;
  }
</style>
