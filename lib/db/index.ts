import Database from "better-sqlite3";
import { join } from "path";

let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    // Initialize the database
    db = new Database(join(process.cwd(), "wedding.db"));

    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS rsvp (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        attending TEXT NOT NULL,
        guestCount INTEGER,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  return db;
}

export function saveRsvp(data: {
  name: string;
  attending: string;
  guestCount: string;
  message?: string;
}) {
  const db = getDb();

  const stmt = db.prepare(
    `INSERT INTO rsvp (name, attending, guestCount, message) VALUES (?, ?, ?, ?)`
  );

  const result = stmt.run(
    data.name,
    data.attending,
    data.guestCount,
    data.message || ""
  );

  return result;
}

export function getMessages() {
  const db = getDb();

  const stmt = db.prepare(`
    SELECT name, message, created_at 
    FROM rsvp 
    WHERE message IS NOT NULL AND message != '' 
    ORDER BY created_at DESC
    LIMIT 50
  `);

  const messages = stmt.all();

  return messages;
}
