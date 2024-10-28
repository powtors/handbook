<script lang="ts">
  import type { User } from "$lib";

  interface Props {
    user: User;
    slim?: boolean;
  };

  const { user, slim }: Props = $props();
</script>

<a class="user" href="https://github.com/{user.name}">
  <b style:display={slim ? "none" : "unset"}>{user.name}</b>
  <div class="avatar" style:background-image="url('https://github.com/{user.name}.png')"></div>
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
