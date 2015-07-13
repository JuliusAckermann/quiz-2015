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
// var dialect= (url[6] || null);
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
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz

// sequelize.sync() inicializa la tabla de preguntas en la DB
sequelize.sync().then(function() {
   // then(...) ejecuta el manejador una vez creada la tabla
   Quiz.count().then(function (count) {   // Cuenta de tabla vacía
      if (count === 0) {   // La tabla se inicializa solo si está vacía
         Quiz.create({ pregunta: '¿Cuál es la capital de Italia?',
            respuesta: 'Roma'
         }).then(function() { console.log('Base de datos inicializada'); });
      };
   });
});