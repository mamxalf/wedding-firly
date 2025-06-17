const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Path to the database file
const dbPath = path.join(__dirname, '..', 'wedding.db');

// Check if the database file exists
if (fs.existsSync(dbPath)) {
  // Delete the existing database file
  fs.unlinkSync(dbPath);
  console.log('Existing database deleted.');
}

// Create a new database connection
const db = new Database(dbPath);

// Create the tables
// Create RSVP table
db.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    attending TEXT NOT NULL,
    guestCount TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('RSVP table created.');

// Close the database connection
db.close();
console.log('Database reset completed successfully.');
