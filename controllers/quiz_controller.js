var models = require('../models/models.js');

// Petición GET a /quizzes (index)
exports.index = function (req, res) {
   models.Quiz.findAll().then(function (quizzes) {
      res.render('quizzes/index.ejs', { quizzes: quizzes });
   });
};

// Petición GET a /quizzes/:id
exports.show = function(req, res) {
   models.Quiz.findById(req.params.quizId).then(function(quiz) {
      res.render('quizzes/show', { quiz: quiz });
   });
   // res.render('quizzes/question', { pregunta: '¿Cuál es la capital de Italia?' });
};

// Petición GET a /quizzes/:id/answer
exports.answer = function(req, res) {
    models.Quiz.findById(req.params.quizId).then(function(quiz) {
      if (req.query.respuesta === quiz.respuesta) {
          res.render('quizzes/answer',
                      { quiz: quiz, respuesta: 'Respuesta correcta' });
      } else {
          res.render('quizzes/answer',
                      { quiz: quiz, respuesta: 'Respuesta incorrecta' });
      }
   });
};
