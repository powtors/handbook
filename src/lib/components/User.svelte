<script lang="ts">
  import type { Account } from "$lib/github";

  interface Props {
    account: Account;
    named: boolean;
  };

  const { account: user, named }: Props = $props();
</script>

<a class="user" href={user.url}>
  {#if named}
    <b>{user.name}</b>
  {/if}
  <div class="avatar" style:background-image="url('{user.avatar}')"></div>
</a>

<style lang="scss">
  .user {
    display: flex;
    align-items: center;

    gap: 0.75rem;

    color: inherit;
    text-decoration: none;

    .avatar {
      height: 2rem;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      aspect-ratio: 1/1;
      border-radius: 30%;
    }

    transition: filter var(--pico-transition);

    &:hover {
      filter: brightness(1.375);
    }
  }
</style>
