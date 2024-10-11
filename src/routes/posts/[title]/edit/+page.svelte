<script lang="ts">
  import { Editor } from "$lib/components";

  let { data } = $props();
  const { title, markdown } = data.post;
</script>

<main class="container">
  <form method="post">
    <Editor class="editor" {title} {markdown} />
  </form>
</main>

<style lang="scss">
  form {
    display: contents;
  }

  :global(.editor) {
    height: 100%;
  }
</style>
