<script lang="ts">
  import "$lib/styles.scss";
  import "$lib/global.scss";

  import { Header, User } from "$lib/components";

  let { data, children } = $props();
  const { session } = data;
</script>

<Header>
  {#if session}
    {@const account = session.user.github}
    <User {account} slim />
  {/if}
</Header>
{@render children()}
