export type Metadata = {
  title: string;
  date: Date;
};

export type Post = Metadata & {
  href: string;
};
