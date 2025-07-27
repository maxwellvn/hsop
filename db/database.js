import Database from 'better-sqlite3';

let db;

export function getDb() {
    if (!db) {
        db = new Database('database.db', /* { verbose: console.log } */);
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);
    }
    return db;
}
