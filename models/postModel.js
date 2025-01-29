const db = require('../db');

// Fetch all posts with user details
const getPosts = async () => {
  const result = await db.query(`
    SELECT 
      posts.*,
      users.username AS author,
      users.role AS author_role
    FROM "posts"
    JOIN "users" ON posts.user_id = users.id
  `);
  return result.rows;
};

// Create a new post
const createPost = async (gameTitle, body, userId, status, console, userScore, published) => {
  const result = await db.query(
    `INSERT INTO "posts" 
    (game_title, body, user_id, status, console, user_score, published, created_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
    [gameTitle, body, userId, status, console, userScore, published]
  );
  return result.rows[0];
};

// Delete a post by ID
const deletePost = async (id) => {
  await db.query('DELETE FROM "posts" WHERE "id" = $1', [id]);
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
};
