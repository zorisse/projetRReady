const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Qcm_success_Schema = new Schema({
  Qcm: [{
    date_Success: Date,
    Qcm: { type: ObjectId, ref: 'Qcm' },
  }
  ],
  note: Number,
  user: { type: ObjectId, ref: 'User' },


}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Qcm_success = mongoose.model('Qcm_success', Qcm_success_Schema);
module.exports = Qcm_success;
