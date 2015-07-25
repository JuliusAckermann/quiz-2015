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
      res.render('quizzes/index.ejs', { quizzes: quizzes, errors: [] }
      );
    }
  ).catch(function (error) { next(error); });
};

// GET /quizzes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build( // crear un objeto quiz
    { pregunta: "", respuesta: "" }
  );
  res.render('quizzes/new', { quiz: quiz, errors: [] });
};

// Petición POST a /quizzes/create
exports.create = function (req, res) {
  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate()
  .then(
    function (err) {
      if (err) {
        res.render('quizzes/new', {quiz: quiz, errors: err.errors});
      } else {
        // save: guarda en la DB los campos pregunta y respuesta de quiz
        quiz.save({fields: ["pregunta", "respuesta"]})
        .then( function () { res.redirect('/quizzes'); });
        // res.redirect: Redireccion HTTP (URL relativo) a la lista de preguntas
      }
    }
  );
};

// Petición GET a /quizzes/:id
exports.show = function(req, res) {
   res.render('quizzes/show', { quiz: req.quiz, errors: [] });
};

// Petición GET a /quizzes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'incorrecta';
    if(req.query.respuesta === req.quiz.respuesta) {
      resultado = 'correcta';
    }
    res.render('quizzes/answer', {  quiz: req.quiz,
                                    respuesta: 'Respuesta ' + resultado,
                                    errors: []
  });
};

// GET /quizzes/:id/edit
exports.edit = function (req, res) {
  var quiz = req.quiz;  // Autoload de instancia de quiz

  res.render('quizzes/edit', {quiz: quiz, errors: []});
};

// PUT /quizzes/:id
exports.update = function (req, res) {
  req.quiz.pregunta= req.body.quiz.pregunta;
  req.quiz.respuesta= req.body.quiz.respuesta;

  req.quiz.validate()
  .then(
    function (err) {
      if (err) {
        res.render('quizzes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        // save: guarda en la DB los campos pregunta y respuesta de quiz
        req.quiz.save({fields: ["pregunta", "respuesta"]})
        .then( function () { res.redirect('/quizzes'); });
        // res.redirect: Redireccion HTTP (URL relativo) a la lista de preguntas
      }
    }
  );
};

// DELETE /quizzes/:id
exports.destroy = function (req, res) {
  req.quiz.destroy().then(
    function () { res.redirect('/quizzes'); })
  .catch( function (error) { next(error); });
};
