// Carga del modelo ORM y del módulo para rutas
var path = require('path');
var Sequelize = require('sequelize');  // Factoría de objetos

// Postgres DATABASE_URL = postgres://user:passwd@host:port/DATABASE_URL
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name    = (url[6] || null);
var user       = (url[2] || null);
var pwd        = (url[3] || null);
var protocol   = (url[1] || null);
var port       = (url[5] || null);
var host       = (url[4] || null);
var storage    = process.env.DATABASE_STORAGE;

// El sequelize permite cambiar de BBDD SQLite a BBDD Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
   {  dialect:    protocol,
      protocol:   protocol,
      port:       port,
      host:       host,
      storage:    storage, // solo SQLite (.env)
      omitNull:   true
   }
);

// Importar definición de la tabla Quiz. Utiliza la ruta /models/quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definición de la tabla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

// Relación 1:M entre la tabla Quiz y la tabla Comment (1 Quiz, M Comment)
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment; // exportar definición de tabla Comment

// Inicializar DB con tabla vacía
sequelize.sync().then(function () {
  console.log('Base de datos inicializada');
});
