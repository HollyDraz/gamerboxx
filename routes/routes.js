const express = require('express');
const { getUsers, createUser } = require('../models/userModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { username, role } = req.body;
  try {
    const user = await createUser(username, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
