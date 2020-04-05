import React, {useState } from 'react';
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
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, data } = useQuery<AuthorsList>(GET_AUTHORS_QUERY);

  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, genre, authorId);
  }

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
