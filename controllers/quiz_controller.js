var models = require('../models/models.js');

// Petición GET a /quizzes (index)
/*
exports.index = function (req, res) {
   models.Quiz.findAll().then(function (quizzes) {
      res.render('quizzes/index.ejs', { quizzes: quizzes });
   });
};
*/

// Petición GET a /quizzes/:id
exports.question = function(req, res) {
   models.Quiz.findAll().then(function(quiz) {
      res.render('quizzes/question', { pregunta: quiz[0].pregunta });
   });
   // res.render('quizzes/question', { pregunta: '¿Cuál es la capital de Italia?' });
};

// Exportar cuando se realiza una GET a /quizzes/answer
exports.answer = function(req, res) {
    models.Quiz.findAll().then(function(quiz) {
      if (req.query.respuesta === quiz[0].respuesta) {
          res.render('quizzes/answer',
            { respuesta: 'Respuesta correcta' });
      } else {
          res.render('quizzes/answer',
            { respuesta: 'Respuesta incorrecta' });
      }
   });
};
