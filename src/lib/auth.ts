import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      github: {
        id: number;
        user: string;
        url: string;
      };
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
        user: profile.login,
        url: profile.html_url,
      };

      return token;
    },
    session({ session, token }) {
      session.user.github = token.github as any;
      session.user.authorization = token.authorization as any;

      return session;
    },
  },
});
