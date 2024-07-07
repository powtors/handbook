<script lang="ts">
  type Link = {
    label: string;
    href: string;
  };

  const routes: Link[] = [];
</script>

<header>
  <a href="/">
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
