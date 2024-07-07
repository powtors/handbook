<script lang="ts">
  import "$lib/pico.scss";

  import { Header } from "$lib/components";
</script>

<Header />
<slot />

<style lang="scss">
  :global(html, body) {
    height: 100%;
  }

  :global(body) {
    display: flex;
    flex-direction: column;
  }

  :global(body > div > main) {
    flex: 1;
  }
</style>
