var models = require('../models/models.js');

// GET /quizzes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizId: req.params.quizId, title: "Quiz | Nuevo comentario", errors:[]});
};

// POST /quizzes/:quizId/comments
exports.create = function(req, res) {
  var comment = models.Comment.build( 
  	{
  		texto: req.body.comment.texto,
  		QuizId: req.params.quizId // Campo añadido por la relación belongsTo(...)
  	});

  comment.validate().then(function(err) {
    if (err) {
      res.render('comments/new.ejs', 
      	{comment: comment, quizId: req.params.quizId, title: "Quiz | Nuevo comentario", errors: err.errors});
    } else {
      comment // save: guarda en DB el campo texto de comment
      .save()
      .then(function() { res.redirect('/quizzes/' + req.params.quizId); });
    } // Redirección HTTP a la pregunta
  }).catch(function(error){ next(error); });
};
