import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      github: {
        id: number;
        login: string;
        url: string;
      }
    } & DefaultSession["user"];
  }
}

export const { handle } = SvelteKitAuth({
  providers: [Github],
  callbacks: {
    jwt({ token, profile }) {
      if (!profile) return token;

      const { id, login, html_url: url } = profile;
      token.github = { id, login, url };

      return token;
    },
    session({ session, token }) {
      session.user.github = token.github as any;

      return session;
    }
  }
});
