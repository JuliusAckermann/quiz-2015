// Exportar cuando se realiza una GET a /quizzes/question
exports.question = function(req, res) {
    res.render('quizzes/question', { pregunta: '¿Cuál es la capital de Italia?' });
};

// Exportar cuando se realiza una GET a /quizzes/answer
exports.answer = function(req, res) {
    if (req.query.respuesta === 'Roma' || req.query.respuesta === 'roma') {
        res.render('quizzes/answer', { respuesta: 'Respuesta correcta' });
    } else {
        res.render('quizzes/answer', { respuesta: 'Respuesta incorrecta' });
    }
};
