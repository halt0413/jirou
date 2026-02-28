--0001_users_table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    store TEXT,
    review INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
