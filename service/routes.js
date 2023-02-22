const router = require('express').Router();
const controllers = require('./controllers/index');

// router.get('/questions', controllers.getQuestions);
router.get('/questions/:question_id/answers', controllers.getAnswers);
// router.post('/questions', controllers.postQuestion);
// router.post('/questions/:question_id/answers', controllers.postAnswer);
router.put('/questions/:question_id/helpful', controllers.markQuestionHelpful);
// router.put('/questions/:question_id/report', controllers.reportQuestion);
// router.put('/answers/:answer_id/helpful', controllers.markAnswerHelpful);
// router.put('/answers/:answer_id/report', controllers.reportAnswer);

module.exports = router;
