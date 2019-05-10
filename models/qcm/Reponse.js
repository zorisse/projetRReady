const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ReponseSchema = new Schema({
  title: String,
  reponse: Boolean,

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Reponse = mongoose.model('Module', ReponseSchema);
module.exports = Reponse;
