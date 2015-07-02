var models = require('../models/models.js');

// GET /quizzes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizzes) {
    res.render('quizzes/index', { quizzes: quizzes, title: 'Quiz | Preguntas' });
  });
};

// GET /quizzes/:id
exports.show = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    res.render("quizzes/show", { quiz: quiz, title: 'Quiz | Preguntas' });
  });
};

// GET /quizzes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta.trim().toLowerCase() === quiz.respuesta.toLowerCase()){
      res.render("quizzes/answer",{ clase: "bien", 
                                    quiz: quiz, 
                                    retorno: "/quizzes",
                                    respuesta: "Correcto", 
                                    btnTit: "Volver", 
                                    title: 'Quiz | Respuesta'
                                  }
      );
    } else {
      res.render("quizzes/answer",{ clase: "mal", 
                                    quiz: quiz,
                                    retorno: "/quizzes/" + quiz.id,
                                    respuesta: "Incorrecto",
                                    btnTit: "Inténtelo otra vez",
                                    title: 'Quiz | Respuesta'
                                  }
      );
    }
  });
};