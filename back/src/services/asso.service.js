import db from '../config/database.js';

async function deleteAsso(assoId) {
    const query = 'DELETE FROM corporations WHERE id = ?';
    db.prepare(query).run(assoId);
}

async function findAssoById(id) {
    const query = 'SELECT * FROM corporations WHERE id = ?';
    return await db.prepare(query).get(id);
}

async function findAllAsso() {
    const query = 'SELECT * FROM corporations WHERE type = ?';
    const result = await db.prepare(query).all('association');
    return result;
}

async function createAsso(data) {
    const query = `
    INSERT INTO corporations (name,  siret, phone_number, type)
    VALUES (?, ?, ?, ?)`;
    const values = [data.name, data.siret, data.phone_number, "association"];
    const result = await db.prepare(query).run(values);

    return await db.prepare('SELECT * FROM corporations WHERE id = ?').get(result.lastInsertRowid);
}

async function updateAsso(assoId, data) {
    if (!Object.keys(data).length) {
        return null; // Évite une mise à jour vide
    }

    const setClauses = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
        setClauses.push(`${key} = ?`);
        values.push(value);
    });
    values.push(assoId);

    const query = `
    UPDATE corporations
    SET ${setClauses.join(', ')}
    WHERE id = ?
  `;

    await db.prepare(query).run(...values);
    return await db.prepare('SELECT * FROM corporations WHERE id = ?').get(assoId);
}

export default {
    deleteAsso,
    findAssoById,
    createAsso,
    updateAsso,
    findAllAsso
};
