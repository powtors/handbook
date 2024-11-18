import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import type { Metadata } from "$lib";

export const GET: RequestHandler = async () => {
  const files = import.meta.glob("$lib/posts/*.svx");
  const iterator = Object.entries(files);

  const posts = await Promise.all(iterator.map(async ([path, file]) => {
    const { metadata } = await file() as { metadata: Metadata };

    return { ...metadata, href: path.slice(11, -4) };
  }));

  const sorted = posts.sort((a: any, b: any) => a.date - b.date);

  return json(sorted);
};
