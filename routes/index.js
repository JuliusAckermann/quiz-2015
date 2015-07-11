var express = require('express');
var router = express.Router();

// GET para la página de inicio del proyecto
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz 2015' });
});

module.exports = router;
