import { Database } from "bun:sqlite";
const db = new Database(":memory:");

db.run(`
  CREATE TABLE subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    raw_email TEXT NOT NULL,
    email TEXT GENERATED ALWAYS AS (LOWER(TRIM(raw_email))) STORED UNIQUE
      CHECK (email LIKE '%_@_%.__%' AND email NOT LIKE '% %'),
    subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

export { db };
