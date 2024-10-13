<script lang="ts">
  import { Editor } from "$lib/components";
</script>

<main class="container">
  <form method="post">
    <Editor />
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
