// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const todoRepo = require('./repositories/todoRepository');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/labday3db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });

// Routes (simple, uses repository)
app.post('/todos', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ error: 'title required' });

    const todo = await todoRepo.create({
      title, description, priority, dueDate: dueDate ? new Date(dueDate) : null
    });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1'), 1);
    const limit = Math.max(parseInt(req.query.limit || '20'), 1);
    const skip = (page - 1) * limit;
    const items = await todoRepo.findAll({ skip, limit });
    res.json({ page, limit, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' });
    const t = await todoRepo.findById(id);
    if (!t) return res.status(404).json({ error: 'not found' });
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' });
    const updates = {};
    ['title','description','completed','priority','dueDate'].forEach(k => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });
    if (updates.dueDate !== undefined) updates.dueDate = updates.dueDate ? new Date(updates.dueDate) : null;
    const updated = await todoRepo.update(id, updates);
    if (!updated) return res.status(404).json({ error: 'not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' });
    const removed = await todoRepo.delete(id);
    if (!removed) return res.status(404).json({ error: 'not found' });
    res.json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('Lab Day 3 - Todo API'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
