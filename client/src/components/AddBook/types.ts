export type Author = {
  id: string;
  name: string;
};

export type AuthorsList = {
  authors: Author[];
};

export type Book = {
  id: string;
  name: string;
};

export type MutationVars = {
  name: string;
  genre: string;
  authorId: string;
};
