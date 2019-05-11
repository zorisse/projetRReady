const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const module_success_Schema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  module: [
    { type: ObjectId, ref: 'Module' },
  ],


}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Module_success = mongoose.model('Module_success', module_success_Schema);
module.exports = Module_success;
