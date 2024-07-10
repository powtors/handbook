<script lang="ts">
  import { Editor } from "$lib/components";

  export let data;

  const { title, description, markdown } = data.post;
</script>

<main class="container">
  <form method="post">
    <Editor class="editor" {title} {description} {markdown} />
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
