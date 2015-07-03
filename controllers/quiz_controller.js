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
  // Si req.query.search no existe es undefined, por lo 
  // tanto lo cambiamos por "", también utilizamos el 
  // comodín para que pueda buscar una subcadena
  var search = req.query.search || "";
  search = '%' + search.trim().replace(/ +/,'%') + '%';
  models.Quiz.findAll({
    where: ["lower(pregunta) like ?", search],
    order: 'pregunta ASC'
  }).then(function(quizzes) {
    res.render('quizzes/index', { quizzes: quizzes, title: "Quiz | Lista de preguntas" });
  }).catch(function(error) { next(error); });
};

// GET /quizzes/:id
exports.show = function(req, res) {
  res.render("quizzes/show", { quiz: req.quiz, title: "Quiz | Pregunta" });
};

// GET /quizzes/:id/answer
exports.answer = function(req, res) {
  // Si no hay parámetro resp será undefined
  var resp = (req.query.respuesta) ? req.query.respuesta.trim().toLowerCase() : undefined;
  if (resp === req.quiz.respuesta.toLowerCase()){
    res.render("quizzes/answer",{ clase: "bien", 
                                  quiz: req.quiz, 
                                  retorno: "/quizzes", // Vuelve a la lista de preguntas
                                  respuesta: "Correcto", 
                                  btnTit: "Volver", 
                                  title: "Quiz | Respuesta"
                                }
    );
  } else {
    res.render("quizzes/answer",{ clase: "mal", 
                                  quiz: req.quiz,
                                  retorno: "/quizzes/" + req.quiz.id, // Vuelve a la pregunta fallada
                                  respuesta: "Incorrecto",
                                  btnTit: "Inténtelo otra vez",
                                  title: "Quiz | Respuesta"
                                }
    );
  }
};