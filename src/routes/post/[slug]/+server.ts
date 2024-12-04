import type { RequestHandler } from "./$types";
import { redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  return redirect(301, `/${params.slug}`);
};
