<script lang="ts">
  import "$lib/styles.scss";
  import "$lib/global.scss";

  import { Plus } from "phosphor-svelte";

  import { Header, User } from "$lib/components";

  let { data, children } = $props();
  const { session } = data;
</script>

<Header>
  <div class="coisos">
    <a href="/new"><Plus weight="bold" size="1.2rem"/></a>
    {#if session}
      {@const account = session.user.github}
      <User {account} slim />
    {/if}
  </div>
</Header>
{@render children()}

<style lang="scss">
  .coisos {
    display: flex;
    align-items: center;

    gap: 1rem;
  }
</style>
