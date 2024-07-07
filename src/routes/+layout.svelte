<script lang="ts">
  import "$lib/pico.scss";

  import { Header, Footer } from "$lib/components";
</script>

<Header />
<slot />
<Footer />

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
