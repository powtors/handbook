import { json, type RequestHandler } from "@sveltejs/kit";
import { Cache, type User } from "$lib";

const users = new Cache<number, User>(3 * 60 * 60);

async function getUser(id: number): Promise<User> {
  if (users.has(id))
    return users.get(id)!;

  const res = await fetch(`https://api.github.com/user/${id}`);
  if (res.status != 200) throw new Error("User Not Found");

  const { login: name } = await res.json();
  const user: User = { id, name };

  return users.set(id, user);
}

export const GET: RequestHandler = async ({ params }) => {
  const id = Number(params.id!);
  if (Number.isNaN(id)) return new Response("Invalid User ID", { status: 400 });
  
  const user = await getUser(id);
  if (!user) return new Response("User Not Found", { status: 400 });

  return json(user);
}
