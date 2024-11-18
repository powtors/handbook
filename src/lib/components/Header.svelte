<header>
  <a href="/">
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
