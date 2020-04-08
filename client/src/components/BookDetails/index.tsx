import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_BOOK_QUERY } from "../../queries";

import { Props, BookQuery, QueryVars } from "./types";

export function BookDetails({ bookId }: Props) {
  const { loading, error, data } = useQuery<BookQuery, QueryVars>(
    GET_BOOK_QUERY,
    { variables: { id: bookId } },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const displayBookDetails = () => {
    if (data) {
      const { book } = data;
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };

  return <>{displayBookDetails()}</>;
}
