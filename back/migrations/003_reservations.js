/**
 * Migrates the database schema upward, making changes to bring the schema toward the latest version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function up(client) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      association VARCHAR(255) NOT NULL,
      meal INT NOT NULL,
      date DATE NOT NULL,
      comments VARCHAR(255) NULL,
      status VARCHAR(50) NOT NULL
    );
  `);
}

/**
 * Migrates the database schema downward, making changes to roll the schema back to a previous version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function down(client) {
  await client.execute(`DROP TABLE IF EXISTS reservations;`);
}
