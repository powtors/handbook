export type Modify<T, R> = Omit<T, keyof R> & R;

export type Route = {
  label: string;
  href: string;
};
