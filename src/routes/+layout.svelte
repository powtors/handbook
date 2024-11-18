<script lang="ts">
  import "$lib/pico.scss";
  import "$lib/global.scss";

  import { Header } from "$lib/components";

  let { children } = $props();
</script>

<Header />
{@render children()}
