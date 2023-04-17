import React, { FC } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const MainProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = new ApolloClient({
    uri: `/api/graphql`,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
