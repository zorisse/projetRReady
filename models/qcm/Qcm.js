const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const qcmSchema = new Schema({
  title: String,
  questions: [{ type: ObjectId, ref: 'Question' }],

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Qcm = mongoose.model('Qcm', userSchema);
module.exports = User;
