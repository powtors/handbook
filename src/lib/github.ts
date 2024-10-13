export type Account = {
  id: number;
  name: string;
  url: string;
  avatar: string;
};

export function account_from(json: any): Account {
  return {
    id: json.id,
    name: json.login,
    url: json.html_url,
    avatar: json.avatar_url,
  };
}
