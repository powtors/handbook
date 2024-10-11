import postgres from "postgres";

import { DB_NAME, DB_USER, DB_PASS } from "$env/static/private";

export default postgres({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
});

export type Post = {
  id: number;
  author: number;
  title: string;
  created_at: Date;
  updated_at?: Date;
};
