import db from "$lib/db";

export { handle } from "$lib/auth";

const end = () => {
  db.end();
  process.exit(0);
};

process.on("SIGINT", end);
process.on("SIGTERM", end);
