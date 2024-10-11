export type Account = {
  id: number;
  name: string;
  url: string;
  avatar: string;
};

export let accounts: Record<number, Account> = {};
