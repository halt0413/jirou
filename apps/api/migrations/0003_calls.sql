-- 0003_calls.sql
CREATE TABLE calls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    title TEXT,

    ninniku INTEGER NOT NULL CHECK(ninniku BETWEEN 0 AND 3),
    yasai   INTEGER NOT NULL CHECK(yasai BETWEEN 0 AND 3),
    abura   INTEGER NOT NULL CHECK(abura BETWEEN 0 AND 3),
    karame  INTEGER NOT NULL CHECK(karame BETWEEN 1 AND 3),

    FOREIGN KEY(user_id) REFERENCES users(id)
);