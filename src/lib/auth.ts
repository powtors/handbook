import { SvelteKitAuth } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";

export type User = {
  id: number;
  name: string;
};

declare module "@auth/sveltekit" {
  interface Session {
    user: User;
  }
}

export const { handle } = SvelteKitAuth({
  trustHost: true,
  providers: [Github],
  callbacks: {
    jwt({ token, profile }) {
      // User is already logged in
      if (!profile) return token;

      // Save User Info
      token.user = {
        id: profile.id as any as number,
        name: profile.login as string,
      } as User as any;

      return token;
    },
    session({ session, token }) {
      // Retrieve User Info
      session.user = token.user as User as any;

      return session;
    },
  },
});
