<script lang="ts">
  import { Editor } from "$lib/components";
</script>

<main class="container">
  <form method="post">
    <Editor class="editor" />
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
