-- Migration number: 0002 	 2026-02-14T11:02:31.388Z
-- 0002_posts_table.sql
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    comment TEXT,
    image_key TEXT, --R2key
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
