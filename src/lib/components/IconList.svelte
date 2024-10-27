<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    vertical?: boolean;
    
    children: Snippet<[]>;
  }

  const { vertical, children }: Props = $props();
</script>

<span style:flex-direction={vertical ? "column" : "row"}>
  {@render children()}
</span>

<style lang="scss">
  span {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;

    gap: 0.625rem 0.75rem;
  }

  span :global(a) {
    --pico-transition: 0.1s ease-in;

    color: inherit;

    &:hover {
      color: var(--pico-primary-hover);
    }
  }
</style>
