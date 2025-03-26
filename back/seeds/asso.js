/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute(
        `INSERT INTO corporations (name, siret, type, phone_number) 
            VALUES ('resto', '123555558', 'Resto', '0123056789')`
    );
}
