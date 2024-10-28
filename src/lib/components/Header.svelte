<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client";

  function sign(event: MouseEvent) {
    if (!event.shiftKey && !event.ctrlKey) return;
    event.preventDefault();

    if (event.shiftKey) signIn("github");
    if (event.ctrlKey) signOut();
  }
</script>

<header>
  <a href="/" on:contextmenu={sign}>
    <h1>Handbook</h1>
  </a>
  <slot />
</header>

<style lang="scss">
  header {
    --pico-typography-spacing-vertical: 0;
    --pico-block-spacing-horizontal: 1.375rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 2rem;

    border-bottom: 1px solid var(--pico-muted-border-color);
  }
</style>
