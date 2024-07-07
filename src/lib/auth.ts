import { SvelteKitAuth } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";

export const { handle } = SvelteKitAuth({
  providers: [Github],
});
