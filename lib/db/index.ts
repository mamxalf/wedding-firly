import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { join } from 'path';

let db: Database | null = null;

export async function getDb() {
  if (!db) {
    // Initialize the database
    db = await open({
      filename: join(process.cwd(), 'wedding.db'),
      driver: sqlite3.Database
    });

    // Create tables if they don't exist
    await db.exec(`
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

export async function saveRsvp(data: {
  name: string;
  attending: string;
  guestCount: string;
  message?: string;
}) {
  const db = await getDb();
  
  const result = await db.run(
    `INSERT INTO rsvp (name, attending, guestCount, message) VALUES (?, ?, ?, ?)`,
    [data.name, data.attending, data.guestCount, data.message || '']
  );
  
  return result;
}

export async function getMessages() {
  const db = await getDb();
  
  const messages = await db.all(`
    SELECT name, message, created_at 
    FROM rsvp 
    WHERE message IS NOT NULL AND message != '' 
    ORDER BY created_at DESC
    LIMIT 50
  `);
  
  return messages;
}
