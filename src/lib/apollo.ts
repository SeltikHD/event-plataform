import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_API_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GRAPHQL_AUTH_TOKEN}`,
    },
    cache: new InMemoryCache(),
});

export default client;
