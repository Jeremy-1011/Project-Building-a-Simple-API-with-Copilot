const express = require('express');
const validateUser = require('../validators/userValidator');

const router = express.Router();

let users = []; // In-memory store
let idCounter = 1;

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// POST create user
router.post('/', validateUser, (req, res) => {
  const newUser = { id: idCounter++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', validateUser, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { id, ...req.body };
  res.json(users[index]);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;