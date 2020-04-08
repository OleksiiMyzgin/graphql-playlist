import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_BOOKS_QUERY } from "../../queries";
import { BookDetails } from "../BookDetails";

import { List, BookListItem } from "./styles";
import { DetailsBlock } from "../BookDetails/styles";

type Book = {
  id: string;
  name: string;
};

type BooksList = {
  books: Book[];
};

function BookList() {
  const [bookId, setBookId] = useState<string | null>(null);
  const { loading, error, data } = useQuery<BooksList>(GET_BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <List>
        {data &&
          data.books.map((book) => (
            <BookListItem key={book.id} onClick={(e) => setBookId(book.id)}>
              {book.name}
            </BookListItem>
          ))}
      </List>
      <DetailsBlock>
        {bookId ? (
          <BookDetails bookId={bookId} />
        ) : (
          <div>No Book selected...</div>
        )}
      </DetailsBlock>
    </div>
  );
}

export default BookList;
