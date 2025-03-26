/**
 * Seeds the database with preset data.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function seed(client) {
  const reservations = [
      {
          client: "Paul Doumergue",
          phone: "06585954750",
          association: "LaPetiteLili",
          meal: 1,
          date: "2025-02-26",
          comments: "vegan",
          status: 0
      }
  ];

 // Boucle sur chaque réservation dans le tableau "reservations"
for (const reservation of reservations) {
  await client.execute(`
      INSERT INTO reservations (client, phone, association, meal, date, comments, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
      reservation.client,      // Nom du client
      reservation.phone,       // Numéro de téléphone du client
      reservation.association, // Association du client (si applicable)
      reservation.meal,        // Repas choisi par le client
      reservation.date,        // Date de la réservation
      reservation.comments,    // Commentaires supplémentaires
      reservation.status       // Statut de la réservation (ex: confirmé, en attente, annulé)
  ]);
}

}
