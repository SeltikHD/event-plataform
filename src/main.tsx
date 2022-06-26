import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import React from 'react';

import App from '@/App';

// Styles
import '@/styles/global.css';

// GraphQL Client
import client from '@/lib/apollo';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ApolloProvider>,
);
