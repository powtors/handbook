import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";
import type { Account } from "$lib/github";

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      github: Account,
      authorization: string;
    } & DefaultSession["user"];
  }
}

export const { handle } = SvelteKitAuth({
  providers: [Github],
  trustHost: true,
  callbacks: {
    jwt({ token, profile, account }) {
      if (!account) return token;
      token.authorization = account.access_token!;

      if (!profile) return token;
      token.github = {
        id: profile.id,
        name: profile.login,
        url: profile.html_url,
        avatar: profile.avatar_url,
      };

      return token;
    },
    session({ session, token }) {
      session.user.github = token.github as Account;
      session.user.authorization = token.authorization as any;

      return session;
    },
  },
});
