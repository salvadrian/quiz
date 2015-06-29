var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizzes/question', quizController.question);
router.get('/quizzes/answer', quizController.answer);

/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author');
});


module.exports = router;
