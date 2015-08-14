// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// GET /login -> Formulario de login
exports.new = function (req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', {errors: errors});
};

// POST /login -> Crear la sesión
exports.create = function (req, res) {

  var login     = req.body.login;
  var password  = req.body.password;

  var userController = require('./user_controller');
  userController.authenticate(login, password, function(error, user) {
    if (error) {  // Si hay un error, retornamos mensaje de error de sesión
      req.session.errors = [{"message": 'Error de inicio de sesión: ' + error}];
      res.redirect('/login');
      return;
    }

    // Crear req.session.user y guardar campos "id" y "username"
    // La sesión se define por la existencia de:  req.session.user
    req.session.user = { id: user.id, username: user.username };

    req.session.timeLogout = Date.now();
    req.session.autoLogout = false;

    // Redirección a PATH anterior a login
    res.redirect(req.session.redir.toString());
  });
};

// DELETE /login
exports.destroy = function (req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString());
};
