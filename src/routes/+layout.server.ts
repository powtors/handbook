import type { Account } from "$lib/github";
import type { LayoutServerLoad } from "./$types";
import { PUBLIC_MANTAINER_ID } from "$env/static/public";

let mantainer: Account | null = null;

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
  const session = await locals.auth();

  if (!mantainer) {
    const res = await fetch(`/api/accounts/${PUBLIC_MANTAINER_ID}`);
    mantainer = await res.json();
  }

  return { session, mantainer: mantainer! };
};
