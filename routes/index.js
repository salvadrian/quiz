var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Autoload :quizId
router.param('quizId', quizController.load);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors:[] });
});

// Definición de rutas de /quizzes
router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)', quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new', quizController.new);
router.post('/quizzes/create', quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizzes/:quizId(\\d+)', quizController.update);

/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz | Créditos', errors:[] });
});

module.exports = router;
