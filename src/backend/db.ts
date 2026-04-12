import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { Database } from "bun:sqlite";

const databasePath =
  Bun.env.DATABASE_PATH ??
  (Bun.env.NODE_ENV === "test" ? ":memory:" : "./data/subscribers.sqlite");

if (databasePath !== ":memory:") {
  mkdirSync(dirname(databasePath), { recursive: true });
}

const db = new Database(databasePath);

db.run(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    raw_email TEXT NOT NULL,
    email TEXT GENERATED ALWAYS AS (LOWER(TRIM(raw_email))) STORED UNIQUE
      CHECK (email LIKE '%_@_%.__%' AND email NOT LIKE '% %'),
    subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

export { db };
