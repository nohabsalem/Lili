import db from '../config/database.js';


async function deleteResto(restoId) {
  const query = 'DELETE FROM corporations WHERE id = ?';
  const result = db.prepare(query).run(restoId);
  // return result.changes > 0; // returns true if an corporations was deleted, false if no corporations was found
}

async function findRestoById(id) {
  const query = 'SELECT * FROM corporations WHERE id = ?';
  const result = await db.prepare(query).get(id);
  return result;
}

async function findAllResto() {
  const query = 'SELECT * FROM corporations WHERE type = ?';
  const result = await db.prepare(query).all('restaurant');
  return result;
}

async function createResto(data) {
  const query = `
    INSERT INTO corporations (name, siret, phone_number, type)
    VALUES (?, ?, ?, ?)`;
  const values = [data.name, data.siret, data.phone_number,"restaurant"];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM corporations WHERE id = ?').get(result.lastInsertRowid);
}

async function updateResto(restoId, data) {
  if (!Object.keys(data).length) {
    return null; // Évite une mise à jour vide
  }
  const setClauses = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    setClauses.push(`${key} = ?`);
    values.push(value);
  });
  values.push(restoId);

  const query = `
    UPDATE corporations 
    SET ${setClauses.join(', ')}
    WHERE id = ?
  `;

  await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM corporations WHERE id = ?').get(restoId);
} 



export default {
  deleteResto,
  findRestoById,  
  findAllResto,
  createResto,
  updateResto,
};