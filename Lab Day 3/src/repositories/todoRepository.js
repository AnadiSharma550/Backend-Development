
const Todo = require('../models/Todo');

const mongoTodoRepository = {
  async create(data) {
    const t = new Todo(data);
    return await t.save();
  },

  async findAll({ skip = 0, limit = 100 } = {}) {
    return await Todo.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
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

module.exports = mongoTodoRepository;
