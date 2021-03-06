var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var host     = (url[4] || null);
var port     = (url[5] || null);
var DB_name  = (url[6] || null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(DB_name, user, pwd,
                      { 
                        dialect: dialect,
                        protocol: protocol,
                        port: port,
                        host: host,
                        storage: storage, // sólo SQLitte (.env)
                        omitNull: true    // sólo Postgres
                      }
                );

// Importar la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);
// Importar la definición de la tabla Comment en comment.js
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

// Relación 1-a-N entre Quiz y Comment
// La relación añade la columna QuizId en la tabla Comment, con la clave 
// externa, que indica que quiz está asociado al comentario
Comment.belongsTo(Quiz); // Indica que un comment pertenece a un quiz
Quiz.hasMany(Comment); // Indica que un quiz puede tener muchos comments

exports.Quiz = Quiz; // Exportar la definición de la tabla Quiz
exports.Comment = Comment ; // Exportar la definición de la tabla Comment

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count) {
    if (count === 0) { // la tabla se inicializa sólo si está vacía
      Quiz.create({
                    pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa',
                    tema: 'Humanidades'
      });
      Quiz.create({
                    pregunta: 'Capital de Inglaterra',
                    respuesta: 'Londres',
                    tema: 'Humanidades'
      });
      Quiz.create({
                    pregunta: 'Capital de Italia',
                    respuesta: 'Roma',
                    tema: 'Humanidades'
      }).then(function(){ console.log('Base de datos inicializada')});
    }
  });
});
