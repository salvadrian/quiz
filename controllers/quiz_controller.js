var models = require('../models/models.js');
var temario = require('../models/temario.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz
    .find({
      where: { id: Number(quizId) },
      include: [{ model: models.Comment }] 
    })
    .then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error('No existe quizId = ' + quizId));
      }
    })
    .catch(function(error){ next(error); });
};

// GET /quizzes
exports.index = function(req, res) {
  // Si req.query.search no existe es undefined, por lo 
  // tanto lo cambiamos por "", también utilizamos el 
  // comodín para que pueda buscar una subcadena
  var search = req.query.search || "";
  search = '%' + search.trim().replace(/ +/,'%').toLowerCase() + '%';
  models.Quiz.findAll({
    where: ["lower(pregunta) like ?", search],
    order: 'pregunta ASC'
  }).then(function(quizzes) {
    res.render('quizzes/index', { quizzes: quizzes, title: "Quiz | Lista de preguntas", errors:[] });
  }).catch(function(error) { next(error); });
};

// GET /quizzes/:id
exports.show = function(req, res) {
  res.render("quizzes/show", { quiz: req.quiz, title: "Quiz | Pregunta", errors:[] });
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
                                  title: "Quiz | Respuesta", 
                                  errors:[]
                                }
    );
  } else {
    res.render("quizzes/answer",{ clase: "mal", 
                                  quiz: req.quiz,
                                  retorno: "/quizzes/" + req.quiz.id, // Vuelve a la pregunta fallada
                                  respuesta: "Incorrecto",
                                  btnTit: "Inténtelo otra vez",
                                  title: "Quiz | Respuesta", 
                                  errors:[]
                                }
    );
  }
};

// GET /quizzes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz
    {pregunta: "", respuesta: "", tema: ""}
  );

  res.render('quizzes/new', {quiz: quiz, title: "Quiz | Nueva pregunta", temas: temario.temas, errors:[]});
};

// POST /quizzes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  quiz.validate().then(function(err) {
    if (err) {
      res.render('quizzes/new', {quiz: quiz, title: "Quiz | Nueva pregunta", temas: temario.temas, errors: err.errors});
    } else {
      quiz // guarda en DB los campos pregunta y respuesta de quiz
      .save({ fields: ["pregunta", "respuesta", "tema"] })
      .then(function() { res.redirect('/quizzes'); });
    } // Redirección HTTP a lista de preguntas
  });
};

// GET /quizzes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz; // autoload de instancia de quiz

  res.render('quizzes/edit', { quiz: quiz, title: "Quiz | Editar pregunta", temas: temario.temas, errors: [] });
};

// PUT /quizzes/:id
exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz.validate().then(function(err) {
    if (err) {
      res.render('quizzes/edit', { quiz: req.quiz, title: "Quiz | Editar pregunta", temas: temario.temas, errors: err.errors });
    } else {
      req.quiz
      .save({ fields: ["pregunta", "respuesta", "tema"] })
      .then(function() { res.redirect('/quizzes'); });
    }
  });
};

// DELETE /quizzes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then(function() {
    res.redirect('/quizzes');
  }).catch(function(error) { next(error); });
};
