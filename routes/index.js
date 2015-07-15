var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors:[] });
});

// Autoload :quizId
router.param('quizId', quizController.load);

// Definición de rutas de session
router.get('/login', sessionController.new); // Formulario login
router.post('/login', sessionController.create); // Crear sesión
router.delete('/login', sessionController.destroy); // Destruir sesión

// Definición de rutas de /quizzes
router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)', quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new', quizController.new);
router.post('/quizzes/create', quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizzes/:quizId(\\d+)', quizController.update);
router.delete('/quizzes/:quizId(\\d+)', quizController.destroy);

// Definición de rutas de comments
router.get('/quizzes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments', commentController.create);

/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz | Créditos', errors:[] });
});

module.exports = router;
