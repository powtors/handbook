<script lang="ts">
  import type { Route } from "$lib";
  import { signIn, signOut } from "@auth/sveltekit/client";

  const routes: Route[] = [];

  function sign(event: MouseEvent) {
    if (event.shiftKey) {
      event.preventDefault();
      signIn("github");
    }

    if (event.ctrlKey) {
      event.preventDefault();
      signOut();
    }
  }
</script>

<header>
  <a href="/" on:contextmenu={sign}>
    <h1>Handbook</h1>
  </a>
  <nav>
    <ul>
      {#each routes as { label, href }}
        <li>
          <a {href} class="contrast">{label}</a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style lang="scss">
  header {
    --pico-typography-spacing-vertical: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding:
      var(--pico-block-spacing-vertical)
      calc(var(--pico-block-spacing-horizontal) * 1.375);

    border-bottom: 1px solid var(--pico-muted-border-color);
    margin-bottom: var(--pico-block-spacing-vertical);
  }

  nav {
    --pico-nav-element-spacing-vertical: 0;
  
    a {
      text-decoration: none;
    }
  }
</style>
