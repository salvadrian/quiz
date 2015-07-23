var models = require('../models/models.js');
var temario = require('../models/temario.js');

var st = {
    numQuizzes : 0, 
    numComments : 0,
    avgComments : 0, 
    quizUncommented : 0, 
    quizCommented : 0
};

exports.calcular = function (req, res, next) {
  
  models.Quiz.count().then(function(num){
    st.numQuizzes = num;  // Número de preguntas
  })
  .catch(function (error) { next(error) });

  models.Comment.count().then(function(num){
    st.numComments = num;// Número de comentarios totales

    // Número medio de comentarios por pregunta
    st.avgComments = (st.numQuizzes > 0) ? (st.numComments / st.numQuizzes) : 0;
  })
  .catch(function (error) { next(error) });

  models.Comment.aggregate('QuizId', 'count', {distinct: true}).then(function (num) {
    // Número de preguntas con comentarios
    st.quizCommented = num;
    
    // Número de preguntas sin comentarios
    st.quizUncommented = st.numQuizzes - num;
  })
  .catch(function (error) { next(error) })
  .finally(function(){ next(); });
};

exports.show = function(req, res) {
  res.render('quizzes/statistics', { statistics: st, title: "Quiz | Estadísticas", errors: [] });
}
