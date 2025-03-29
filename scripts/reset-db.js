const sqlite3 = require('sqlite3').verbose();
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
const db = new sqlite3.Database(dbPath);

// Create the tables
db.serialize(() => {
  // Create RSVP table
  db.run(`
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
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database reset completed successfully.');
  }
});
