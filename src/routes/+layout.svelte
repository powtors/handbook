<script lang="ts">
  import "$lib/styles.scss";
  import "$lib/global.scss";

  import { Plus } from "phosphor-svelte";


  import { Header, User } from "$lib/components";

  let { data, children } = $props();
  const { session } = data;
</script>

<Header>
  <div class="user">
    {#if session}
      <User user={session.user} slim />
      <a href="/new">
        <Plus size="1.25rem"/>
      </a>
    {/if}
  </div>
</Header>
{@render children()}

<style lang="scss">
  .user {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    gap: 1rem;
  }

  a {
    color: inherit;
  }
</style>
