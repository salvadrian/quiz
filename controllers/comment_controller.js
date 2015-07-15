var models = require('../models/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment
    .find( { where: { id: Number(commentId) } })
    .then( function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else {
        next(new Error('No existe commentId = ' + commentId))
      }
    })
    .catch(function(error){ next(error)});
};

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

// PUT /quizzes/:quizId/comments/:commentId/publish
exports.publish = function(req, res) {
  req.comment.publicado = true;

  req.comment
    .save({fields: ["publicado"]})
    .then(function(){ res.redirect('/quizzes/' + req.params.quizId); })
    .catch(function(error){ next(error); });
};