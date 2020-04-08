export type Book = {
  id: string;
  name: string;
};

export type Author = {
  id: string;
  name: string;
  age: number;
  books: Book[];
};

export type BookQuery = {
  book: {
    id: string;
    name: string;
    genre: string;
    author: Author;
  };
};

export type QueryVars = {
  id: string;
};

export type Props = {
  bookId: string;
};
