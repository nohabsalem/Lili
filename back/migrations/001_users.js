/**
* Migrates the database schema upward, making changes to bring the schema toward the latest version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        role VARCHAR(255),
        verified BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATE,
        reset_token VARCHAR(255))`)
}


/**
* Migrates the database schema downward, making changes to roll the schema back to a previous version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function down(client) {
    await client.execute(`DROP TABLE users`);
}
