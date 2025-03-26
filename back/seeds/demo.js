/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/

export async function seed(client) {
    await client.execute(
        `INSERT INTO users (email, password, firstname, lastname, role, created_at, updated_at) 
            VALUES ('test@gmail.com', 'password', 'Prenom', 'NomFamille', 'ADMIN', CURRENT_TIMESTAMP, null)`
    );
}
