const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ModuleSchema = new Schema({
  title: String,
  image: String,
  media_url: String,
  isDone: [
    {
      user: { type: ObjectId, ref: 'User' },
      date: Date,
    }
  ],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;
