var temario = require('./temario.js');

// Definición del modelo de Quiz
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "· Falta pregunta ·"} }
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "· Falta respuesta ·"} }
      },
      tema: {
        type: DataTypes.ENUM,
        values: temario.temas,
        validate: { notEmpty: {msg: "· Falta tema ·"},
                    isIn: {
                          args: [temario.temas],
                          msg: "· Tema incorrecto ·"
                          }
                  }
      }
    }
  );
};
