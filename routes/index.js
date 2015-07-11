// Importar express y generar enrutador
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

// GET para la página de inicio del proyecto
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz 2015' });
});

// GET para preguntas y respuestas
router.get('/quizzes/question', quizController.question);
router.get('/quizzes/answer', quizController.answer);

module.exports = router;
