<script lang="ts">
  import "$lib/styles.scss";

  import { Header } from "$lib/components";
</script>

<Header />
<slot />

<style lang="scss">
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(html, body) {
    height: 100%;
  }

  :global(body) {
    display: flex;
    flex-direction: column;
  }

  :global(body > main) {
    flex: 1;
  }
</style>
