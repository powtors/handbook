<script lang="ts">
  import { page } from "$app/stores";
  import type { Route } from "$lib";

  const routes: Record<string, Route[]> = {};

  const user = $page.data.session?.user;
</script>

<footer>
  <div class="links">
    {#each Object.entries(routes) as [title, _routes]}
      <aside>
        <h2>{title}</h2>
        <nav>
          <ul>
            {#each _routes as { label, href }}
              <li>
                <a {href}>{label}</a>
              </li>
            {/each}
          </ul>
        </nav>
      </aside>
    {/each}
  </div>
  {#if Object.entries(routes).length}
    <hr />
  {/if}
  <div class="bottom">
    {#if user}
      <span class="user">Logged in as <a href={user.github.url!}>{user.github.user!}</a></span>
    {/if}
    <span class="copy">&copy; 2024 <a href="https://github.com/potors">potors</a> &middot; All rights reserved.</span>
  </div>
</footer>

<style lang="scss">
  footer {
    padding:
      calc(var(--pico-block-spacing-vertical) * 1.625)
      calc(var(--pico-block-spacing-horizontal) * 1.375);

    border-top: 1px solid var(--pico-muted-border-color);
    margin-top: var(--pico-block-spacing-vertical);
  }

  hr {
    margin: calc(var(--pico-block-spacing-vertical)* 1.625) 0;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    
    gap: 1rem;

    aside {
      h2 {
        text-transform: capitalize;
      }

      nav {
        --pico-nav-element-spacing-vertical: 0.375rem;

        display: flex;
      }
    }

    > * {
      flex: 1;

      padding: 1rem;
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;

    gap: calc(var(--pico-block-spacing-vertical) * 0.625);

    > span {
      display: block;
      text-align: center;
    }
  }
</style>
