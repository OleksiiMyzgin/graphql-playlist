import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  GET_AUTHORS_QUERY,
  ADD_BOOK_MUTATION,
  GET_BOOKS_QUERY,
} from "../../queries";

type Author = {
  id: string;
  name: string;
};

type AuthorsList = {
  authors: Author[];
};

type Book = {
  id: string;
  name: string;
};

type MutationVars = {
  name: string;
  genre: string;
  authorId: string;
};

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const getAuthorsQuery = useQuery<AuthorsList>(GET_AUTHORS_QUERY);
  const [saveBook, bookData] = useMutation<Book, MutationVars>(
    ADD_BOOK_MUTATION,
  );

  if (getAuthorsQuery.error)
    return <p>Error: {getAuthorsQuery.error.message}</p>;
  if (bookData.error) return <p>Error: {bookData.error.message}</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: GET_BOOKS_QUERY }],
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.currentTarget.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.currentTarget.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.currentTarget.value)}>
          <option>Select author</option>
          {getAuthorsQuery.loading ? (
            <option disabled>Loading authors</option>
          ) : (
            getAuthorsQuery.data &&
            getAuthorsQuery.data.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })
          )}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
