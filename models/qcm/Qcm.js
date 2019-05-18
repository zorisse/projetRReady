const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const qcmSchema = new Schema({
  title: String,
  question: [{ type: ObjectId, ref: 'Question' }],

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Qcm = mongoose.model('Qcm', qcmSchema);
module.exports = Qcm;
