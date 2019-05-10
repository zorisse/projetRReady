const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const formationSchema = new Schema({
  title: String,
  // explicationde la formation
  resume: String,
  image: String,
  owner: { type: ObjectId, ref: 'User' },
  // array de modules 
  modules: [{ type: ObjectId, ref: 'Module' }],
  qcm: [{ type: ObjectId, ref: 'Qcm' }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Formation = mongoose.model('Formation', formationSchema);
module.exports = Formation;
