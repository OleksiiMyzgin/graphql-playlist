import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import BookList from "../BookList";
import AddBook from "../AddBook";

import { Main } from "./styles";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main>
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </Main>
    </ApolloProvider>
  );
}

export default App;
