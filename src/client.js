import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

export const client = new ApolloClient({
    cache,
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
});
