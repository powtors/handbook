import type { LayoutServerLoad } from "./$types";
import { Account } from "$lib";

import { MAINTAINER_ID } from "$env/static/private";

let maintainer: Account;

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
  const session = await locals.auth();

  if (!maintainer) {
    const res = await fetch(`/api/accounts/${MAINTAINER_ID}`);
    maintainer = await res.json();
  }

  return { session, maintainer };
};
