const Todo = require('../models/Todo');

const todoRepository = {
  async create(data) {
    const t = new Todo(data);
    return await t.save();
  },

  async findAll({ page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const docs = await Todo.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Todo.countDocuments();
    return { page, limit, total, items: docs };
  },

  async findById(id) {
    return await Todo.findById(id).lean();
  },

  async update(id, updates) {
    return await Todo.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
  },

  async delete(id) {
    return await Todo.findByIdAndDelete(id).lean();
  }
};

module.exports = todoRepository;
