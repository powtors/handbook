<script lang="ts">
  import { page } from "$app/stores";
</script>

<main>
  <hgroup>
    <h1>{$page.status}</h1>
    {#if $page.error}
      <p>{$page.error.message}</p>
    {/if}
  </hgroup>
</main>

<style lang="scss">
  main {
    display: grid;
    place-items: center;

    text-align: center;
  }
</style>
