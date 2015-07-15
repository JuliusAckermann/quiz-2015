// Importar express y generar enrutador
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

// GET para la página de inicio del proyecto
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz 2015' });
});

// Rutas de /quizzes
// GET para preguntas y respuestas. La solicitud /quizzes nos llevará a una
// página donde se encontrará la lista de preguntas presentes en la base de
// datos; la segunda solicitud nos llevaŕá a la pregunta cuyo identificador
// hemos especificado, y la tercera (/answer) nos llevará a la página que
// indica si la respuesta es correcta o no
router.get('/quizzes',                      quizController.index);
router.get('/quizzes/:quizId(\\d+)',        quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res) {
   res.render('author', { title: 'Julio Hernando | Quiz 2015' });
});

module.exports = router;
