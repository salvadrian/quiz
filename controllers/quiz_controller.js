// GET /quizzes/question
exports.question = function(req, res) {
  res.render("quizzes/question", {pregunta: "Capital de Italia", title: 'Quiz | Preguntas'});
};

// GET /quizzes/answer
exports.answer = function(req, res) {
  if (req.query.respuesta.trim().toLowerCase() === "roma"){
    res.render("quizzes/answer", { clase: "bien", respuesta: "Correcto", btnTit: "Volver", title: 'Quiz | Respuesta' });
  } else {
    res.render("quizzes/answer", { clase: "mal", respuesta: "Incorrecto", btnTit: "Inténtelo otra vez", title: 'Quiz | Respuesta'});
  }
};