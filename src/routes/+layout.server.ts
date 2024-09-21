import type { Account } from "$lib/github";
import type { LayoutServerLoad } from "./$types";
import { PUBLIC_MANTAINER_ID } from "$env/static/public";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
  const session = await locals.auth();

  const res = await fetch(`/api/accounts/${PUBLIC_MANTAINER_ID}`);
  const mantainer: Account = await res.json();

  return { session, mantainer };
};
