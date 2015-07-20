var models = require('../models/models.js');

// Función Autoload - factoriza el código si la ruta incluye una :quizId
exports.load = function (req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function (quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' +  quizId)); }
    }
  ).catch(function(error) { next(error); });
};

// Petición GET a /quizzes (index)
exports.index = function (req, res) {
  // Convierte la cadena de la búsqueda en una que pueda leerse en un url
  var search = ("%"  + (req.query.search || "") + "%").replace(' ', "%");
  models.Quiz.findAll({ where: ["pregunta like ?", search],
                        order: 'pregunta ASC'}).then(
    function (quizzes) {
      res.render('quizzes/index.ejs', {
        // Si se ha realizado una búsqueda, devuelve una lista ordenada
        quizzes: (req.query.search) ? quizzes.sort(function(a, b) {
          return a.pregunta > b.pregunta;
        }) : quizzes, errors: []
      });
    }
  ).catch(function (error) { next(error); });
};

// GET /quizzes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build( // crear un objeto quiz
    { pregunta: "Pregunta", respuesta: "Respuesta" }
  );
  res.render('quizzes/new', { quiz: quiz });
};

// Petición POST a /quizzes/create
exports.create = function (req, res) {
  var quiz = models.Quiz.build(req.body.quiz);

  // Se guarda en la DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function () {
    res.redirect('/quizzes');
  }); // Redireccion HTTP (URL relativo) a la lista de preguntas
};

// Petición GET a /quizzes/:id
exports.show = function(req, res) {
   res.render('quizzes/show', { quiz: req.quiz });
};

// Petición GET a /quizzes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'incorrecta';
    if(req.query.respuesta === req.quiz.respuesta) {
      resultado = 'correcta';
    }
    res.render('quizzes/answer', { quiz: req.quiz, respuesta: 'Respuesta ' + resultado });
};
