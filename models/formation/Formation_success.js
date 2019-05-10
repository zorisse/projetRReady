const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const formation_success_Schema = new Schema({
  formation: [{
    date_Success: Date,
    formation: { type: ObjectId, ref: 'Formation' },
  }
  ]
  // explicationde la formation
  user: { type: ObjectId, ref: 'User' }
  // array de modules 

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Formation_success = mongoose.model('Formation_success', formation_success_Schema);
module.exports = Formation_success;
