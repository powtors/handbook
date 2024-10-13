import { json, type RequestHandler } from "@sveltejs/kit";
import { type Account, account_from } from "$lib/github";

let accounts: Record<number, Account> = {};

export const GET: RequestHandler = async ({ params }) => {
  const id = Number(params.id!);
  if (Number.isNaN(id)) return new Response("Invalid GitHub ID", { status: 400 });

  let user = accounts[id];
  if (!user) {
    const res = await fetch(`https://api.github.com/user/${id}`);
    if (res.status != 200) return new Response("GitHub API Error", { status: res.status });

    user = await res.json().then(account_from);
    accounts[id] = user;
  }

  return json(user);
}
