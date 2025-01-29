const express = require('express');
const { getPosts, createPost, deletePost } = require('../models/postModel');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { gameTitle, body, userId, status, console, userScore, published } = req.body;
  try {
    const post = await createPost(gameTitle, body, userId, status, console, userScore, published);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deletePost(id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
