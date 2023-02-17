const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let productSchema = mongoose.Schema({
  product_id: { type: Number, unique: true, dropDubs: true },
  questions: { type: questionSchema },
});

let questionSchema = mongoose.Schema({
  question_id: { type: Number, unique: true, dropDubs: true },
  question_body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: { type: answerSchema },
});

let answerSchema = mongoose.Schema({
  answer_id: { type: Number, unique: true, dropDubs: true },
  answer_body: String,
  answer_date: String,
  answerer_name: String,
  answer_helpfulness: Number,
  photos: { type: photoSchema },
});

let photoSchema = mongoose.Schema({
  photo_id: { type: Number, unique: true, dropDubs: true },
  photo_url: String,
});

let Table = mongoose.model('Table', productSchema);
