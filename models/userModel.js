const db = require('../db');

// Fetch all users
const getUsers = async () => {
  const result = await db.query('SELECT * FROM "users"');
  return result.rows;
};

// Create a new user
const createUser = async (username, role) => {
  const result = await db.query(
    'INSERT INTO "users" (username, role, created_at) VALUES ($1, $2, NOW()) RETURNING *',
    [username, role]
  );
  return result.rows[0];
};

// Delete a user by ID
const deleteUser = async (id) => {
  await db.query('DELETE FROM "users" WHERE "id" = $1', [id]);
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
