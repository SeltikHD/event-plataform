import { BrowserRouter } from 'react-router-dom';
import client from '@/lib/apollo';
import Router from '@/Router';

// GraphQL Client
import { ApolloProvider } from '@apollo/client';

export default function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ApolloProvider>
    );
}
