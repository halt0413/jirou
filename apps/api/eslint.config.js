import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    {
        ignores: [
        "node_modules",
        "dist",
        ".wrangler",   // ← これ超重要
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        languageOptions: {
        globals: {
            // Cloudflare Workers globals
            fetch: "readonly",
            Request: "readonly",
            Response: "readonly",
            Headers: "readonly",
            URL: "readonly",
            crypto: "readonly",
            TextEncoder: "readonly",
            TextDecoder: "readonly",
            btoa: "readonly",
            atob: "readonly",
            WebSocket: "readonly",
            WebSocketPair: "readonly",
            console: "readonly",
        },
        },
    },
];