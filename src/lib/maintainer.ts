import type { User } from "$lib/auth";

import { MAINTAINER_TOKEN } from "$env/static/private";

export default await fetch("https://api.github.com/user", {
  headers: { authorization: `Bearer ${MAINTAINER_TOKEN}` },
}).then(res => res.json()) as User;
