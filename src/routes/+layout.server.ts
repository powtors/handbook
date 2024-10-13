import { MAINTAINER_TOKEN } from "$env/static/private";

import type { LayoutServerLoad } from "./$types";
import type { User } from "$lib";

let maintainer: User;

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
  const session = await locals.auth();

  if (!maintainer) {
    const res = await fetch("https://api.github.com/user", {
      headers: { authorization: `token ${MAINTAINER_TOKEN}` },
    });

    maintainer = await res.json().then(({ id, login: name }) => ({ id, name }));
  }

  return { session, maintainer };
};
