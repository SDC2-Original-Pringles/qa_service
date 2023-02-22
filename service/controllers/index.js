const models = require('../models');

module.exports = {
  getQuestions(req, res) {
    console.log('this is the query: ', req.query);
    const { page, count, productid } = req.query;

    models.readQuestions(productid, page, count)
      .then((results) => {
        console.log('success!', results);
        res.status(200);
        res.send({
          product_id: productid,
          results: results.rows,
        });
      })
      .catch((error) => {
        res.status(400).send(error.stack);
      });
  },

  getAnswers(req, res) {
    console.log('this is the query: ', req.params);
    const { page, count, question_id } = req.params;

    models.readAnswers(question_id, page, count)
      .then((results) => {
        console.log('success!', results);
        res.status(200);
        res.send(results.rows[0].json_build_object);
      })
      .catch((error) => {
        res.status(400).send(error.stack);
      });
  },

  postQuestion() {

  },

  postAnswer() {

  },

  markQuestionHelpful(req, res) {
    const { questionid } = req.query.question_id;

    models.updateHelpful(questionid)
      .then((results) => {
        console.log('success!', results);
        res.status(204).send('done');
      })
      .catch((error) => {
        res.status(400).send(error.stack);
      });
  },

  reportQuestion() {

  },

  markAnswerHelpful() {

  },

  reportAnswer() {

  },
};
