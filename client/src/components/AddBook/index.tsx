import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  GET_AUTHORS_QUERY,
  ADD_BOOK_MUTATION,
  GET_BOOKS_QUERY,
} from "../../queries";

import { Form, Field, Label, Input, Select, Button } from "./styles";

import { AuthorsList, Book, MutationVars } from "./types";

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
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>Book name:</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </Field>
      <Field>
        <Label>Genre:</Label>
        <Input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.currentTarget.value)}
        />
      </Field>
      <Field>
        <Label>Author:</Label>
        <Select
          as="select"
          onChange={(e: React.FormEvent<HTMLSelectElement>) =>
            setAuthorId(e.currentTarget.value)
          }
        >
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
        </Select>
      </Field>
      <Button>Add</Button>
    </Form>
  );
}

export default AddBook;
