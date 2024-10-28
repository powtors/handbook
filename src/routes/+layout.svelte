<script lang="ts">
  import "$lib/styles.scss";
  import "$lib/global.scss";

  import { IconContext, Plus } from "phosphor-svelte";

  import { Header, User } from "$lib/components";
  import IconList from "$lib/components/IconList.svelte";

  let { data, children } = $props();
  const { session } = data;
</script>

<IconContext values={{ size: "1.5rem" }}>
  <Header>
    <span class="user" dir="rtl">
      {#if session}
        <User user={session.user} slim />
        <IconList>
          <a href="/new"><Plus /></a>
        </IconList>
      {/if}
    </span>
  </Header>
  {@render children()}
</IconContext>

<style lang="scss">
  .user {
    display: flex;
    align-items: center;

    gap: 1rem;
  }

  a {
    color: inherit;
  }
</style>
