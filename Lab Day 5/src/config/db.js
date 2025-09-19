const mongoose = require('mongoose');

async function connectDb(uri) {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected');
}

module.exports = { connectDb };
