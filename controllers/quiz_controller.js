var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(function(quiz) {
    if (quiz) {
      req.quiz = quiz;
      next();
    } else {
      next(new Error('No existe quizId = ' + quizId));
    }
  }).catch(function(error){ next(error);});
};


// GET /quizzes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizzes) {
    res.render('quizzes/index', { quizzes: quizzes, title: "Quiz | Lista de preguntas" });
  }).catch(function(error) { next(error); });
};

// GET /quizzes/:id
exports.show = function(req, res) {
  res.render("quizzes/show", { quiz: req.quiz, title: "Quiz | Pregunta" });
};

// GET /quizzes/:id/answer
exports.answer = function(req, res) {
  if (req.query.respuesta.trim().toLowerCase() === req.quiz.respuesta.toLowerCase()){
    res.render("quizzes/answer",{ clase: "bien", 
                                  quiz: req.quiz, 
                                  retorno: "/quizzes",
                                  respuesta: "Correcto", 
                                  btnTit: "Volver", 
                                  title: "Quiz | Respuesta"
                                }
    );
  } else {
    res.render("quizzes/answer",{ clase: "mal", 
                                  quiz: req.quiz,
                                  retorno: "/quizzes/" + req.quiz.id,
                                  respuesta: "Incorrecto",
                                  btnTit: "Inténtelo otra vez",
                                  title: "Quiz | Respuesta"
                                }
    );
  }
};