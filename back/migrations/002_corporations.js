/**
* Migrates the database schema upward, making changes to bring the schema toward the latest version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS corporations (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name VARCHAR(255) NOT NULL,
              siret VARCHAR(14) NOT NULL UNIQUE, 
              phone_number VARCHAR (25),
              type TEXT CHECK (type IN ('association', 'restaurant')),
              adress VARCHAR(255),
              postalcode VARCHAR(5),
              open BOOLEAN DEFAULT FALSE, 
              updated_at DATE
              )`
    );
}


/**
* Migrates the database schema downward, making changes to roll the schema back to a previous version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function down(client) {
    await client.execute(`DROP TABLE corporations`);
}
