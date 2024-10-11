import { json, type RequestHandler } from "@sveltejs/kit";
import { accounts, type Account } from "$lib/github";

export const GET: RequestHandler = async ({ params }) => {
  const id = Number(params.id!);

  if (accounts[id]) {
    return json(accounts[id]);
  }

  const res = await fetch(`https://api.github.com/user/${id}`);
  const data = await res.json();

  const user = {
    id: id,
    name: data.login,
    url: data.html_url,
    avatar: data.avatar_url,
  } as Account;

  accounts[id] = user;

  return json(user);
}
