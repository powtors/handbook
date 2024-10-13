export type { Post } from "$lib/post";
export type { Account } from "$lib/github";

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
