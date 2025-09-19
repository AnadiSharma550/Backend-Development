const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

// Create todo
router.post('/', async (req, res) => {
  try {
    const { task, priority, dueDate } = req.body;
    if (!task) return res.status(400).json({ error: 'task required' });

    const todo = new Todo({
      task,
      priority: priority || 'low',
      dueDate: dueDate ? new Date(dueDate) : null,
      owner: req.user.id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all todos (for logged-in user)
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
