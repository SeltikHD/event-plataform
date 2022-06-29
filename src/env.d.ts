/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly GRAPHQL_API_URL: string;
    readonly GRAPHQL_AUTH_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
