<script lang="ts">
  import "$lib/styles.scss";
  import "$lib/global.scss";

  import { IconContext, Plus } from "phosphor-svelte";

  import { Header, User } from "$lib/components";

  let { data, children } = $props();
  const { session } = data;
</script>

<IconContext values={{ size: "1.5rem" }}>
  <Header>
    <div class="user">
      {#if session}
        <User user={session.user} slim />
        <a href="/new">
          <Plus />
        </a>
      {/if}
    </div>
  </Header>
  {@render children()}
</IconContext>

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
