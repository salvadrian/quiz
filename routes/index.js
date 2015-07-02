var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Autoload :quizId
router.param('quizId', quizController.load);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Definición de rutas de /quizzes
router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)', quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);

/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz | Créditos'});
});


module.exports = router;
