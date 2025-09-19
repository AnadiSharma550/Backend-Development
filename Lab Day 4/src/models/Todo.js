const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true }, // indexed field
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low','medium','high'], default: 'low' },
  dueDate: { type: Date, default: null, index: true }, // index on dueDate
  createdAt: { type: Date, default: Date.now }
});

// Virtual field (not stored in DB)
todoSchema.virtual('isOverdue').get(function () {
  return this.dueDate ? (new Date() > this.dueDate && !this.completed) : false;
});

// Trigger (middleware hook): update `updatedAt` before saving
todoSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Trigger after save (logging)
todoSchema.post('save', function (doc) {
  console.log('Todo saved:', doc.title);
});

// Add updatedAt field
todoSchema.add({ updatedAt: { type: Date } });

module.exports = mongoose.model('Todo', todoSchema);
