/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly GRAPHQL_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
