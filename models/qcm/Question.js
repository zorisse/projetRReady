const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const QuestionSchema = new Schema({
  title: String,
  image: String,
  comment: String,
  reponse1: String,
  reponse2: String,
  reponse3: String,
  reponse4: String,
  reponse_correct: String,

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
