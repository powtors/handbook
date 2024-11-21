import { error, text, type RequestHandler } from "@sveltejs/kit";
import fs from "fs/promises";

export const GET: RequestHandler = async ({ params }) => {
  const content = await fs.readFile(`src/lib/posts/${params.slug!}.svx`)
    .then((buffer) => buffer.toString())
    .catch(() => null);

  if (!content) throw error(404, "Not Found!");

  return text(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Length": content.length.toString(),
    },
  });
};
