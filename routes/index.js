var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors:[] });
});

// Autoloads de comandos
router.param('quizId', quizController.load); // Autoload :quizId
router.param('commentId', commentController.load); // Autoload :commentId

// Definición de rutas de session
router.get('/login', sessionController.new); // Formulario login
router.post('/login', sessionController.create); // Crear sesión
router.delete('/login', sessionController.destroy); // Destruir sesión

// Definición de rutas de /quizzes
router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)', quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new', sessionController.loginRequired, quizController.new); // Requieren autenticación
router.post('/quizzes/create', sessionController.loginRequired, quizController.create); // Requieren autenticación
router.get('/quizzes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit); // Requieren autenticación
router.put('/quizzes/:quizId(\\d+)', sessionController.loginRequired, quizController.update); // Requieren autenticación
router.delete('/quizzes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy); // Requieren autenticación

// Definición de rutas de comments
router.get('/quizzes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments', commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish); // Requieren autenticación

/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz | Créditos', errors:[] });
});

module.exports = router;
