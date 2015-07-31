// Importar express y generar enrutador
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

// GET para la página de inicio del proyecto
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz 2015', errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

// Rutas de sesión (/session)
router.get('/login',    sessionController.new);
router.post('/login',   sessionController.create);
router.get('/logout',   sessionController.destroy);

// Rutas de /quizzes
router.get('/quizzes',                      quizController.index);
router.get('/quizzes/:quizId(\\d+)',        quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new',                  sessionController.loginRequired,  quizController.new);
router.post('/quizzes/create',              sessionController.loginRequired,  quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',   sessionController.loginRequired,  quizController.edit);
router.put('/quizzes/:quizId(\\d+)',        sessionController.loginRequired,  quizController.update);
router.delete('/quizzes/:quizId(\\d+)',     sessionController.loginRequired,  quizController.destroy);

// Rutas para comentarios (/comments)
router.get('/quizzes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',    commentController.create);

// GET /author
router.get('/author', function(req, res) {
   res.render('author', { title: 'Julio Hernando | Quiz 2015', errors: [] });
});

module.exports = router;
