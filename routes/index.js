// Importar express y generar enrutador
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

// GET para la página de inicio del proyecto
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz 2015' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

// Rutas de /quizzes
router.get('/quizzes',                      quizController.index);
router.get('/quizzes/:quizId(\\d+)',        quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new',                  quizController.new);
router.post('/quizzes/create',              quizController.create);

router.get('/author', function(req, res) {
   res.render('author', { title: 'Julio Hernando | Quiz 2015' });
});

module.exports = router;
