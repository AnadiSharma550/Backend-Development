require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./config/db');

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDb(process.env.MONGO_URL).catch(err => { console.error(err); process.exit(1); });

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
