var models = require('../models/models.js');

// GET /quizzes/question
exports.question = function(req, res) {
  models.Quiz.findAll().then(function(quiz) {
    res.render("quizzes/question", {pregunta: quiz[0].pregunta, title: 'Quiz | Preguntas'});
  });
};

// GET /quizzes/answer
exports.answer = function(req, res) {
  models.Quiz.findAll().then(function(quiz) {
    if (req.query.respuesta.trim().toLowerCase() === quiz[0].respuesta.toLowerCase()){
      res.render("quizzes/answer", { clase: "bien", respuesta: "Correcto", btnTit: "Volver", title: 'Quiz | Respuesta' });
    } else {
      res.render("quizzes/answer", { clase: "mal", respuesta: "Incorrecto", btnTit: "Inténtelo otra vez", title: 'Quiz | Respuesta'});
    }
  });
};