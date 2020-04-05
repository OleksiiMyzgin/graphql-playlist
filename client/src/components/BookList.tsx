import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_BOOKS_QUERY } from '../queries'

type Book = {
  id : string;
  name : string;
}

type BooksList = {
  books: Book[]
}

function BookList() {
  const { loading, error, data } = useQuery<BooksList>(GET_BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul className="book-list">
        {data && data.books.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
