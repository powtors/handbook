import type { Post as RawPost } from "$lib/db";
import type { Account } from "$lib/github";

export type Modify<T, R> = Omit<T, keyof R> & R;
export type Post = Modify<RawPost, { author: Account }>;

const formatter = new Intl.DateTimeFormat(navigator.language, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

// we'ren't typing `date` as `Date | string` just to avoid svelte warnings
export function prettyDate(date: Date) {
  // this converts json serialized date strings to the Date object
  if (typeof date === "string") {
    date = new Date(date);
  }

  return formatter.format(date);
}
