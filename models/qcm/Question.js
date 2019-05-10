const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const QuestionSchema = new Schema({
  title: String,
  image: String,
  comment: String,
  reponse: [{ type: ObjectId, ref: 'Reponse' }]


}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Question = mongoose.model('Module', QuestionSchema);
module.exports = Question;
