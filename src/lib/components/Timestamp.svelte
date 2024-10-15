<script lang="ts">
  import { prettyDate, type Post } from "$lib";

  interface Props {
    post: Post;

    simple?: boolean;
    reverse?: boolean;
  }

  const { post, simple, reverse }: Props = $props();
</script>


<small style:flex-direction={reverse ? "row" : "row-reverse"}>
  {#if !simple}
    {#if post.updated_at}
      <span>{prettyDate(post.updated_at)}</span>
      <span>&middot;</span>
    {/if}
  {/if}
  <b>{prettyDate(post.created_at)}</b>
</small>

<style lang="scss">
  small {
    display: flex;

    gap: 0.375rem;

    text-wrap: nowrap;
  }

  span {
    color: var(--pico-muted-color);
  }
</style>
