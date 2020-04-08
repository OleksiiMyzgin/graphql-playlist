import { gql } from "apollo-boost";

export const GET_BOOKS_QUERY = gql`
  query getBooks {
    books {
      name
      id
    }
  }
`;

export const GET_AUTHORS_QUERY = gql`
  query getAuthors {
    authors {
      name
      id
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const GET_BOOK_QUERY = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;
