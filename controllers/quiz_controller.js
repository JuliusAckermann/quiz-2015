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
}

// Petición GET a /quizzes (index)
exports.index = function (req, res) {
   models.Quiz.findAll().then(
     function (quizzes) {
       res.render('quizzes/index.ejs', { quizzes: quizzes });
     }
   ).catch(function(error) { next(error); } );
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
