import { MAINTAINER_ID } from "$env/static/private";
import type { LayoutServerLoad } from "./$types";
import type { Account } from "$lib/github";

let maintainer: Account | null = null;

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
  const session = await locals.auth();

  // cache maintainer
  if (!maintainer) {
    const res = await fetch(`/api/accounts/${MAINTAINER_ID}`);
    maintainer = await res.json();
  }

  return { session, maintainer: maintainer! };
};
