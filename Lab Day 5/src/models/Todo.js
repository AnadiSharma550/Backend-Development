const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low','medium','high'], default: 'low' },
  dueDate: { type: Date, default: null },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

todoSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Todo', todoSchema);
