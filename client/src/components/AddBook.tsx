import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORS_QUERY } from '../queries'

type Author = {
  id : string;
  name : string;
}

type AuthorsList = {
  authors: Author[]
}

function AddBook() {
  const { loading, error, data } = useQuery<AuthorsList>(GET_AUTHORS_QUERY);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {loading ? (
            <option disabled>Loading authors</option>
          ) : (
            data &&
            data.authors.map((author) => {
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
