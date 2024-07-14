export type GithubUser = {
  id: string;
  name: string;
  user: string;
  url: string;
  avatar: string;
};

export const users: GithubUser[] = [];

export async function getUser(name: string, authorization?: string): Promise<GithubUser> {
  const cached = users.find(({ user }) => user === name);
  if (cached) return cached;

  const headers = {} as any;
  if (authorization) headers["Authorization"] = `Bearer ${authorization}`;

  const author = await fetch(`https://api.github.com/users/${name}`, { headers })
    .then(async res => await res.json())
    .then(user => ({
      id: user.id,
      name: user.name,
      user: user.login,
      url: user.html_url,
      avatar: user.avatar_url,
    } as GithubUser));

  users.push(author);
  return author;
};
