export type Modify<T, R> = Omit<T, keyof R> & R;

export type Route = {
  label: string;
  href: string;
};

const formatter = new Intl.DateTimeFormat(navigator.language, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function prettyDate(date: Date) {
  // this converts json serialized date strings to the Date object
  if (typeof date === "string") {
    date = new Date(date);
  }

  return formatter.format(date);
}
