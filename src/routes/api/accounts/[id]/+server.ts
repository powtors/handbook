import { json, type RequestHandler } from "@sveltejs/kit";
import type { User } from "$lib";

let accounts: Record<number, User> = {};

async function getUser(id: number): Promise<User> {
  if (accounts[id]) {
    return accounts[id];
  }

  const res = await fetch(`https://api.github.com/user/${id}`);
  if (res.status != 200) throw new Error("User Not Found");

  const user = await res.json().then(({ id, login: name }) => ({ id, name }));

  accounts[id] = user;
  return user;
}

export const GET: RequestHandler = async ({ params }) => {
  const id = Number(params.id!);
  if (Number.isNaN(id)) return new Response("Invalid User ID", { status: 400 });
  
  const user = await getUser(id);
  if (!user) return new Response("User Not Found", { status: 400 });

  return json(user);
}
