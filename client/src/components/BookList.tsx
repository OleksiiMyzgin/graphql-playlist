import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_BOOKS_QUERY } from "../queries";
import { BookDetails } from "./BookDetails";

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
      <ul className="book-list">
        {data &&
          data.books.map((book) => (
            <li key={book.id} onClick={(e) => setBookId(book.id)}>
              {book.name}
            </li>
          ))}
      </ul>
      {bookId ? (
        <BookDetails bookId={bookId} />
      ) : (
        <div>No Book selected...</div>
      )}
    </div>
  );
}

export default BookList;
